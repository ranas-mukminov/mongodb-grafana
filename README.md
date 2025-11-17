# MongoDB datasource for Grafana (run-as-daemon fork)

**A powerful Grafana plugin that enables MongoDB as a data source through a REST API proxy**

[English] | [Русский](README.ru.md)

> This is a maintained fork of [JamesOsgood/mongodb-grafana](https://github.com/JamesOsgood/mongodb-grafana) with enhanced documentation, practical examples, and professional support from **run-as-daemon**.

---

## What this plugin does

This plugin allows you to use MongoDB as a data source in Grafana by providing an HTTP proxy server that translates Grafana's Data Source API calls into MongoDB aggregation pipeline queries. It enables you to visualize time-series data, metrics, and other MongoDB collections directly in Grafana dashboards.

**Key capabilities:**
- Execute MongoDB aggregation pipelines from Grafana queries
- Support for template variables (`$from`, `$to`, custom variables)
- Compatible with Graph, Table, and other Grafana panel types
- Time-series data visualization with automatic bucketing support

---

## Requirements

- **Grafana**: version 3.x.x or higher
- **MongoDB**: version 3.4.x or higher
- **Node.js**: version 6.10.0 or higher (for running the proxy server)

---

## Installation

### Step 1: Install the Grafana Plugin

1. Copy the entire `mongodb-grafana` directory into your Grafana plugins directory:
   ```bash
   # Default plugin directory locations:
   # Linux: /var/lib/grafana/plugins
   # macOS (Homebrew): /usr/local/var/lib/grafana/plugins
   # Docker: /var/lib/grafana/plugins
   
   cp -r mongodb-grafana /var/lib/grafana/plugins/
   ```

2. Restart Grafana:
   ```bash
   # Linux (systemd)
   sudo systemctl restart grafana-server
   
   # macOS (Homebrew)
   brew services restart grafana
   
   # Docker
   docker restart grafana
   ```

### Step 2: Install and Start the MongoDB Proxy Server

1. Navigate to the plugin directory:
   ```bash
   cd /var/lib/grafana/plugins/mongodb-grafana
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Build the plugin (if needed):
   ```bash
   npm run build
   ```

4. Start the proxy server:
   ```bash
   npm run server
   ```

   By default, the proxy server listens on `http://localhost:3333`

**Note**: For production deployments, consider running the proxy server as a system service (see examples below).

---

## Quick Start with Docker

The easiest way to try the plugin is using Docker Compose. This example sets up a complete stack with Grafana, MongoDB, and the proxy server.

See the [`examples/docker-compose.yml`](examples/docker-compose.yml) file and [`examples/README.md`](examples/README.md) for a complete working example.

**Quick start:**

```bash
cd examples
docker-compose up -d
```

Then open `http://localhost:3000` (admin/admin) and add a MongoDB data source pointing to `http://mongodb-proxy:3333`.

---

## Basic Usage

### Configuring the Data Source in Grafana

1. Navigate to **Configuration** → **Data Sources** → **Add data source**
2. Select **MongoDB** from the list
3. Configure the connection:
   - **HTTP URL**: `http://localhost:3333` (or your proxy server address)
   - Click **Save & Test**

4. In the proxy server's configuration (or via environment variables), set:
   - **MongoDB URL**: Your MongoDB connection string
   - **MongoDB Database**: The database name to query

**Example MongoDB connection strings:**
```
# Local MongoDB
mongodb://localhost:27017

# MongoDB Atlas (with replica set)
mongodb://username:password@cluster0-shard-00-00.mongodb.net:27017,cluster0-shard-00-01.mongodb.net:27017/dbname?ssl=true&replicaSet=cluster0-shard-0&authSource=admin

# MongoDB with authentication
mongodb://user:password@localhost:27017/database
```

### Writing Queries

MongoDB queries in Grafana are written as aggregation pipelines. The plugin provides special macros:

- `$from` - Replaced with the start time of the dashboard's time range (BSON date)
- `$to` - Replaced with the end time of the dashboard's time range (BSON date)
- `$dateBucketCount` - Number of buckets for the current panel width/time range
- Custom template variables (e.g., `$hostname`, `$sensor_type`)

**Example query for a time-series graph:**

```javascript
db.metrics.aggregate([
  {
    "$match": {
      "ts": { "$gte": "$from", "$lte": "$to" },
      "hostname": "$hostname"
    }
  },
  { "$sort": { "ts": 1 } },
  {
    "$project": {
      "name": "cpu_usage",
      "value": "$cpu_percent",
      "ts": "$ts",
      "_id": 0
    }
  }
])
```

**Required fields in query results:**
- `name` - Series name (string, shown in legend)
- `value` - Metric value (number)
- `ts` - Timestamp (BSON date)

**Example with automatic bucketing:**

```javascript
db.metrics.aggregate([
  {
    "$match": {
      "ts": { "$gte": "$from", "$lt": "$to" }
    }
  },
  {
    "$bucketAuto": {
      "groupBy": "$ts",
      "buckets": "$dateBucketCount",
      "output": {
        "avgValue": { "$avg": "$value" }
      }
    }
  },
  {
    "$project": {
      "name": "average",
      "value": "$avgValue",
      "ts": "$_id.min",
      "_id": 0
    }
  }
])
```

### Sample Dashboards

Import example dashboards from the [`examples/`](examples/) directory:

1. **RPI Mongo Bucket - Atlas CS.json** - Temperature sensor data with bucketing
2. **RPI Mongo Bucket - Atlas Temp.json** - Light sensor visualization
3. **Sensor Value Counts - Atlas.json** - Table panel example

---

## Limitations and Notes

### Current Limitations

- **Read-only**: This plugin only supports querying (aggregation pipelines). It does not support writes or alerts that modify data.
- **Aggregation-based**: All queries must be MongoDB aggregation pipelines. Simple find() queries are not supported.
- **Time-series focus**: The plugin is optimized for time-series data with `ts`, `name`, and `value` fields.
- **Proxy requirement**: Requires running a separate Node.js proxy server; direct connection to MongoDB from Grafana is not supported.

### Query Macros

The following macros are automatically expanded:

| Macro | Description | Example Value |
|-------|-------------|---------------|
| `$from` | Start of time range | `ISODate("2024-01-01T00:00:00Z")` |
| `$to` | End of time range | `ISODate("2024-01-01T23:59:59Z")` |
| `$dateBucketCount` | Suggested bucket count | `100` |

### Template Variables

Template variables work like in other Grafana data sources. Define them in dashboard settings and reference with `$variableName` in queries.

**Example template query to get unique hostnames:**
```javascript
db.metrics.aggregate([
  { "$group": { "_id": "$hostname" } }
])
```

---

## Professional SRE/DevOps Services

This fork is maintained by **run-as-daemon** – a team of experienced SRE/DevOps engineers specializing in monitoring, observability, and infrastructure automation.

**🌐 Website**: [run-as-daemon.ru](https://run-as-daemon.ru)

### Available Services:

✅ **Grafana + MongoDB Monitoring Stack Design & Deployment**
- End-to-end setup of production-ready monitoring infrastructure
- Custom dashboard design and implementation
- Best practices for data modeling and query optimization

✅ **MongoDB Performance Tuning & Index Optimization**
- Query performance analysis and optimization
- Index strategy for time-series data
- Scaling recommendations for high-volume metrics

✅ **Production Dashboard & Alert Development**
- Professional dashboard design
- Advanced aggregation pipeline development
- Alert rules and notification integration

✅ **High Availability & Backup Strategies**
- MongoDB replica set configuration
- Disaster recovery planning
- Monitoring system resilience

✅ **Training & Consulting**
- Team workshops on MongoDB + Grafana
- Best practices for metrics collection
- Custom integration development

**Contact us** for a free consultation on your monitoring needs.

---

## Support / Thanks

If you find this plugin useful, please consider:

⭐ **Star this repository** – It helps others discover the project

📢 **Share with colleagues** – Spread the word about MongoDB + Grafana integration

💖 **Sponsor the project** – Support ongoing maintenance and development via [GitHub Sponsors](https://github.com/sponsors/ranas-mukminov) or [run-as-daemon.ru/support](https://run-as-daemon.ru/support)

🐛 **Report issues** – Help improve the plugin by reporting bugs and suggesting features

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

---

## License

ISC License

Original work by James Osgood  
Fork maintained by [run-as-daemon.ru](https://run-as-daemon.ru)

---

## Links

- [Original Repository](https://github.com/JamesOsgood/mongodb-grafana)
- [Grafana Documentation](https://grafana.com/docs/)
- [MongoDB Aggregation Pipeline](https://docs.mongodb.com/manual/core/aggregation-pipeline/)
- [run-as-daemon Services](https://run-as-daemon.ru)

---

**Made with ❤️ by the MongoDB-Grafana community and [run-as-daemon.ru](https://run-as-daemon.ru)**
