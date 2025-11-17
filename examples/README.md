# Docker Compose Examples

This directory contains a complete Docker Compose setup that demonstrates the MongoDB Grafana datasource plugin in action.

## What's Included

The `docker-compose.yml` file sets up:

1. **MongoDB** (mongo:5.0) - The database with sample time-series data
2. **MongoDB Proxy** - Node.js proxy server that translates Grafana API to MongoDB queries
3. **Grafana** (latest) - Grafana instance with the MongoDB datasource plugin pre-installed

## Prerequisites

- Docker (version 20.10 or higher)
- Docker Compose (version 1.29 or higher)

## Quick Start

### 1. Build and Start the Stack

From this directory, run:

```bash
docker-compose up -d
```

This will:
- Pull the required Docker images
- Build the MongoDB proxy server
- Start all services
- Initialize MongoDB with sample data

### 2. Verify Services are Running

```bash
docker-compose ps
```

You should see three services running:
- `mongodb` on port 27017
- `mongodb-proxy` on port 3333
- `grafana` on port 3000

### 3. Access Grafana

Open your web browser and navigate to:

```
http://localhost:3000
```

**Default credentials:**
- Username: `admin`
- Password: `admin`

(You'll be prompted to change the password on first login)

### 4. Configure the MongoDB Data Source

1. In Grafana, go to **Configuration** → **Data Sources**
2. Click **Add data source**
3. Select **MongoDB** from the list
4. Configure:
   - **Name**: `MongoDB Test`
   - **URL**: `http://mongodb-proxy:3333`
   - **MongoDB URL**: `mongodb://admin:password123@mongodb:27017`
   - **MongoDB Database**: `testdb`
5. Click **Save & Test**

You should see a green "Data source is working" message.

### 5. Create Your First Dashboard

#### Option A: Import Example Dashboard

1. Go to **Create** → **Import**
2. Upload one of the example JSON files from this directory:
   - `RPI Mongo Bucket - Atlas CS.json`
   - `RPI Mongo Bucket - Atlas Temp.json`
   - `Sensor Value Counts - Atlas.json`

#### Option B: Create a New Dashboard

1. Go to **Create** → **Dashboard** → **Add new panel**
2. Select **MongoDB Test** as the data source
3. Enter this query:

```javascript
db.metrics.aggregate([
  {
    "$match": {
      "ts": { "$gte": "$from", "$lte": "$to" },
      "metric_name": "cpu_usage"
    }
  },
  { "$sort": { "ts": 1 } },
  {
    "$project": {
      "name": "$hostname",
      "value": "$value",
      "ts": "$ts",
      "_id": 0
    }
  }
])
```

4. Set the time range to "Last 1 hour"
5. Click **Apply** and **Save**

You should see a graph with CPU usage data for server-01 and server-02.

## Sample Data

The MongoDB instance is pre-populated with sample metrics data:

- **Collection**: `testdb.metrics`
- **Time range**: Last 60 minutes
- **Metrics**: CPU usage and memory usage
- **Hosts**: server-01, server-02
- **Data points**: ~180 documents (60 per metric/host combination)

### Sample Document Structure

```json
{
  "ts": ISODate("2024-01-01T12:00:00Z"),
  "hostname": "server-01",
  "metric_name": "cpu_usage",
  "value": 42.5,
  "tags": {
    "datacenter": "dc1",
    "environment": "production"
  }
}
```

## Useful Commands

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f mongodb-proxy
docker-compose logs -f grafana
docker-compose logs -f mongodb
```

### Stop Services

```bash
docker-compose stop
```

### Stop and Remove Everything

```bash
docker-compose down

# Also remove volumes (deletes all data)
docker-compose down -v
```

### Restart a Service

```bash
docker-compose restart mongodb-proxy
```

### Access MongoDB Shell

```bash
docker-compose exec mongodb mongosh -u admin -p password123 --authenticationDatabase admin
```

Then in the MongoDB shell:
```javascript
use testdb
db.metrics.find().limit(5)
```

### Rebuild the Proxy After Code Changes

```bash
docker-compose build mongodb-proxy
docker-compose up -d mongodb-proxy
```

## Troubleshooting

### Plugin Not Showing in Grafana

1. Check that the plugin directory is mounted correctly:
   ```bash
   docker-compose exec grafana ls -la /var/lib/grafana/plugins/
   ```

2. Check Grafana logs for plugin loading errors:
   ```bash
   docker-compose logs grafana | grep -i plugin
   ```

### Proxy Connection Issues

1. Verify the proxy is running:
   ```bash
   docker-compose ps mongodb-proxy
   ```

2. Test the proxy endpoint:
   ```bash
   curl http://localhost:3333/
   ```

3. Check proxy logs:
   ```bash
   docker-compose logs mongodb-proxy
   ```

### MongoDB Connection Issues

1. Verify MongoDB is running:
   ```bash
   docker-compose ps mongodb
   ```

2. Test MongoDB connection from proxy:
   ```bash
   docker-compose exec mongodb-proxy nc -zv mongodb 27017
   ```

### No Data in Graphs

1. Verify sample data was loaded:
   ```bash
   docker-compose exec mongodb mongosh -u admin -p password123 --authenticationDatabase admin testdb --eval "db.metrics.countDocuments()"
   ```

2. Check the time range in Grafana (sample data is only for the last hour)

3. Verify the query syntax matches the data structure

## Configuration

### Environment Variables

You can customize the setup by editing the environment variables in `docker-compose.yml`:

**MongoDB:**
- `MONGO_INITDB_ROOT_USERNAME` - MongoDB admin username (default: admin)
- `MONGO_INITDB_ROOT_PASSWORD` - MongoDB admin password (default: password123)
- `MONGO_INITDB_DATABASE` - Initial database name (default: testdb)

**MongoDB Proxy:**
- The proxy does not use environment variables for MongoDB connection
- MongoDB connection is configured in Grafana data source settings
- Each request from Grafana includes the MongoDB connection details

**Grafana:**
- `GF_SECURITY_ADMIN_USER` - Grafana admin username (default: admin)
- `GF_SECURITY_ADMIN_PASSWORD` - Grafana admin password (default: admin)

### Using with Your Own MongoDB

To connect to an external MongoDB instance instead of the containerized one:

1. Keep the `mongodb-proxy` and `grafana` services running
2. In Grafana data source configuration, update:
   - **MongoDB URL**: Point to your external MongoDB instance
   - Example: `mongodb://user:pass@external-host:27017`
3. Ensure the proxy container can reach your MongoDB instance (network connectivity)

## Production Considerations

This setup is for **development and testing only**. For production:

1. **Use strong passwords**: Change all default passwords
2. **Enable authentication**: MongoDB should have authentication enabled
3. **Use SSL/TLS**: Enable encryption for MongoDB connections
4. **Resource limits**: Add resource limits to containers
5. **Persistence**: Use named volumes or bind mounts for data
6. **Networking**: Use proper network isolation and firewalls
7. **Monitoring**: Add monitoring and alerting for all services
8. **Backup**: Implement regular MongoDB backups
9. **High availability**: Use MongoDB replica sets
10. **Reverse proxy**: Use Nginx or Traefik in front of Grafana

## Next Steps

- Read the [main README](../README.md) for detailed usage instructions
- Explore the [sample dashboards](.) to learn query patterns
- Check the [proxy configuration](../server/config/) for advanced options
- Visit [run-as-daemon.ru](https://run-as-daemon.ru) for professional support

## Support

For issues with this Docker setup:
- Check the troubleshooting section above
- Review container logs
- Open an issue on GitHub

For production deployment assistance, contact [run-as-daemon.ru](https://run-as-daemon.ru)
