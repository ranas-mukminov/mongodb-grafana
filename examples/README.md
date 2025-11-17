# MongoDB Grafana Plugin - Docker Examples

This directory contains a complete Docker Compose setup for quickly testing and developing with the MongoDB Grafana datasource plugin.

## What's Included

The Docker Compose stack includes:

- **MongoDB 6.0** - Database with sample sensor data
- **MongoDB Proxy** - Node.js proxy server that translates Grafana queries to MongoDB
- **Grafana 10.2** - Pre-configured with the MongoDB datasource plugin

## Quick Start

### Prerequisites

- Docker Engine 20.10 or higher
- Docker Compose v2.0 or higher
- At least 2GB of free RAM

### Starting the Stack

1. Navigate to the examples directory:
```bash
cd examples
```

2. Start all services:
```bash
docker-compose up -d
```

3. Wait for all services to be healthy (30-60 seconds):
```bash
docker-compose ps
```

You should see all services in "healthy" status.

### Access the Services

Once running, you can access:

- **Grafana UI**: http://localhost:3000
  - Username: `admin`
  - Password: `admin`
  
- **MongoDB Proxy**: http://localhost:3333
  - Health check: http://localhost:3333/
  
- **MongoDB**: `localhost:27017`
  - Admin user: `admin` / `password`
  - Grafana user: `grafana_reader` / `grafana_password`
  - Database: `testdb`

## Sample Data

The MongoDB database is initialized with sample sensor data in the `testdb.sensor_data` collection:

```javascript
{
  sensor_type: "temperature" | "humidity",
  host_name: "demo-host-1",
  sensor_value: <number>,
  ts: <ISODate>
}
```

## Testing the Data Source

### 1. Verify Data Source Configuration

1. Log into Grafana at http://localhost:3000
2. Go to **Configuration → Data Sources**
3. You should see "MongoDB Demo" already configured
4. Click on it and verify connection with **Save & Test**

### 2. Create Your First Panel

1. Create a new dashboard
2. Add a new panel
3. Select "MongoDB Demo" as the data source
4. Use this sample query:

```javascript
db.sensor_data.aggregate([
  { "$match": { 
      "sensor_type": "temperature",
      "ts": { "$gte": "$from", "$lte": "$to" } 
  }},
  { "$sort": { "ts": 1 }},
  { "$project": {
      "name": "$sensor_type",
      "value": "$sensor_value",
      "ts": "$ts",
      "_id": 0
  }}
])
```

5. Set the time range to "Last 24 hours"
6. You should see the temperature data plotted

### 3. Import Example Dashboards

The `examples/` directory also contains pre-built dashboard JSON files:

- `RPI MongoDB - Atlas.json`
- `RPI MongoDB Bucket - Atlas.json`
- `Sensor Value Counts - Atlas.json`

To import:
1. Go to **Dashboards → Import**
2. Upload the JSON file
3. Select "MongoDB Demo" as the data source
4. Click **Import**

## Development Workflow

### Making Changes to the Plugin

If you're developing the plugin:

1. Make changes to the plugin source code in `src/` or `server/`

2. Rebuild the plugin:
```bash
cd ..
npm run build
```

3. Restart the Grafana container to pick up changes:
```bash
cd examples
docker-compose restart grafana
```

### Viewing Logs

View logs for all services:
```bash
docker-compose logs -f
```

View logs for a specific service:
```bash
docker-compose logs -f mongodb-proxy
docker-compose logs -f grafana
docker-compose logs -f mongodb
```

### Accessing MongoDB CLI

To connect to MongoDB directly:
```bash
docker-compose exec mongodb mongosh testdb -u grafana_reader -p grafana_password
```

Example queries:
```javascript
// Show collections
show collections

// Count documents
db.sensor_data.countDocuments()

// Find recent data
db.sensor_data.find().sort({ts: -1}).limit(5)

// Test aggregation
db.sensor_data.aggregate([
  { $group: { _id: "$sensor_type", count: { $sum: 1 }}}
])
```

## Stopping and Cleaning Up

### Stop the stack (preserves data):
```bash
docker-compose stop
```

### Stop and remove containers (preserves data):
```bash
docker-compose down
```

### Stop and remove everything including data volumes:
```bash
docker-compose down -v
```

## Troubleshooting

### Grafana shows "Plugin not found"

1. Check that the plugin is mounted correctly:
```bash
docker-compose exec grafana ls -la /var/lib/grafana/plugins/mongodb-grafana
```

2. Restart Grafana:
```bash
docker-compose restart grafana
```

### MongoDB Proxy connection fails

1. Check proxy logs:
```bash
docker-compose logs mongodb-proxy
```

2. Verify MongoDB is accessible from the proxy:
```bash
docker-compose exec mongodb-proxy wget -O- http://mongodb:27017
```

### No data in dashboards

1. Verify sample data was inserted:
```bash
docker-compose exec mongodb mongosh testdb -u grafana_reader -p grafana_password --eval "db.sensor_data.countDocuments()"
```

2. Check the time range in Grafana - the sample data has fixed timestamps

3. Adjust the time range or insert current data:
```bash
docker-compose exec mongodb mongosh testdb -u admin -p password --authenticationDatabase admin --eval "
db.sensor_data.insertOne({
  sensor_type: 'temperature',
  host_name: 'demo-host-1',
  sensor_value: 25.0,
  ts: new Date()
})
"
```

## Customization

### Using Your Own MongoDB

To connect to an external MongoDB instance:

1. Edit `provisioning/datasources/mongodb.yml`
2. Update the `mongodbUrl` with your connection string
3. Update the `mongodbDatabase` with your database name
4. Restart the stack

### Changing Ports

Edit `docker-compose.yml` and modify the `ports` section for each service.

### Adding More Sample Data

Edit `init-mongo.js` to add more collections or data patterns.

## Production Considerations

⚠️ **This setup is for development and testing only!**

For production deployments:

- Use strong passwords (not hardcoded in files)
- Use Docker secrets or environment files for sensitive data
- Enable MongoDB authentication and SSL/TLS
- Use proper MongoDB replica sets or clusters
- Configure Grafana for HTTPS
- Set up proper monitoring and logging
- Use persistent volumes with backup strategies
- Limit resource usage with Docker resource constraints
- Run the proxy behind a reverse proxy with authentication

See the main [README.md](../README.md) for production deployment guidance.

## Getting Help

- Check the main [README.md](../README.md)
- Report issues: https://github.com/ranas-mukminov/mongodb-grafana/issues
- Professional support: https://run-as-daemon.ru

## License

Same as parent project - ISC License
