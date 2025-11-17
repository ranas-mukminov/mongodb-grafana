# MongoDB datasource for Grafana (run-as-daemon fork)

**Production-ready MongoDB datasource plugin for Grafana with professional support**

[English] | [Русский](README.ru.md)

> This is a maintained fork of [JamesOsgood/mongodb-grafana](https://github.com/JamesOsgood/mongodb-grafana) with improvements, Russian documentation, and professional SRE/DevOps services from [run-as-daemon.ru](https://run-as-daemon.ru)

---

## What this plugin does

This plugin allows you to use MongoDB as a data source in Grafana. It works by running a Node.js HTTP proxy server that translates Grafana's data source API calls into MongoDB aggregation pipeline queries. This enables you to visualize MongoDB data directly in Grafana dashboards without writing custom code.

**Key capabilities:**
- Query MongoDB collections using aggregation pipelines
- Time-series visualizations with automatic date range macros (`$from`, `$to`)
- Template variables for dynamic dashboards
- Table panel support for aggregated data
- Auto-bucketing support with `$bucketAuto` and `$dateBucketCount`

---

## Requirements

- **Grafana**: >= 3.x.x
- **MongoDB**: >= 3.4.x (aggregation pipeline support required)
- **Node.js**: >= 6.10.0 (for the proxy server)

---

## Installation

### 1. Install the Grafana plugin

Copy the plugin directory into your Grafana plugins folder:

```bash
# Default Grafana plugins directory
cp -r dist /var/lib/grafana/plugins/mongodb-grafana

# Homebrew installation (macOS)
cp -r dist /usr/local/var/lib/grafana/plugins/mongodb-grafana

# Restart Grafana
sudo systemctl restart grafana-server  # Linux
brew services restart grafana          # macOS
```

### 2. Install and start the MongoDB proxy server

The proxy server runs separately from Grafana and handles the MongoDB connections:

```bash
# Install dependencies
npm install

# Build the plugin
npm run build

# Start the proxy server (default port 3333)
npm run server
```

The server will listen on `http://localhost:3333` by default.

---

## Quick Start with Docker

For a quick demo or development setup, use Docker Compose:

```bash
cd examples
docker-compose up -d
```

This starts:
- Grafana on http://localhost:3000 (admin/admin)
- MongoDB proxy on http://localhost:3333
- MongoDB instance for testing

See [examples/README.md](examples/README.md) for detailed instructions.

---

## Basic Usage

### Configure the data source in Grafana

1. In Grafana, go to **Configuration → Data Sources**
2. Click **Add data source**
3. Select **MongoDB**
4. Configure:
   - **Name**: Choose a descriptive name
   - **URL**: `http://localhost:3333` (the proxy server)
   - **MongoDB URL**: Your MongoDB connection string  
     Example: `mongodb://user:pass@host:27017/database?authSource=admin`
   - **MongoDB Database**: The database name to query
5. Click **Save & Test**

### Write your first query

In a dashboard panel, use MongoDB aggregation syntax:

```javascript
db.collection_name.aggregate([
  { "$match": { "ts": { "$gte": "$from", "$lte": "$to" } } },
  { "$sort": { "ts": 1 } },
  { "$project": { 
      "name": "series_name",
      "value": "$field_name",
      "ts": "$timestamp_field",
      "_id": 0 
  }}
])
```

**Required fields in output:**
- `name` - Series name (displayed in legend)
- `value` - Numeric value for the data point
- `ts` - Timestamp as a BSON date

**Macros:**
- `$from`, `$to` - Automatically replaced with dashboard time range (as BSON dates)
- `$dateBucketCount` - Number of buckets for time-series aggregation
- Template variables like `$variableName` are substituted from Grafana variables

### Sample dashboards

Check the [examples/](examples/) directory for:
- `RPI MongoDB - Atlas.json` - Simple time-series dashboard
- `RPI MongoDB Bucket - Atlas.json` - Using `$bucketAuto` for aggregation
- `Sensor Value Counts - Atlas.json` - Table panel example

---

## Limitations and Notes

- **Aggregation only**: This plugin uses MongoDB's aggregation framework. Direct find queries are not supported.
- **Time-series format**: Output documents must have `name`, `value`, and `ts` fields for graph panels.
- **Table panels**: Use `_id: 0` projection and return `name`, `value`, `ts` fields.
- **Authentication**: Ensure the MongoDB user has read permissions on queried collections.
- **Network**: The proxy server must have network access to MongoDB and be reachable by Grafana.

---

## Professional SRE/DevOps Services

This fork is maintained by **[run-as-daemon.ru](https://run-as-daemon.ru)** – a team of SRE and DevOps engineers specializing in monitoring, observability, and database operations.

### Available Services

🔧 **MongoDB + Grafana Monitoring Stack Design & Deployment**  
Complete setup of production-grade monitoring infrastructure with MongoDB as a data source, including HA configuration, security hardening, and custom dashboards.

⚡ **MongoDB Performance Tuning & Index Optimization**  
Expert analysis and optimization of MongoDB queries, aggregation pipelines, and indexes to ensure fast dashboard load times and efficient data retrieval.

📊 **Production Dashboard & Alert Development**  
Custom Grafana dashboards tailored to your business metrics, SLIs/SLOs, with intelligent alerting rules integrated with your incident management tools.

🏗️ **High Availability & Backup Strategies for MongoDB**  
Design and implementation of MongoDB replica sets, sharding strategies, automated backups, and disaster recovery procedures.

📈 **Observability Consulting & Training**  
Team training on MongoDB monitoring best practices, query optimization, and Grafana dashboard development.

**Contact us**: [run-as-daemon.ru](https://run-as-daemon.ru)  
**Email**: contact@run-as-daemon.ru  
**Telegram**: @run_as_daemon

---

## Support / Thanks

If you find this plugin useful:

- ⭐ **Star this repository** to show your support
- 📢 **Share it** with colleagues who use Grafana + MongoDB
- 💬 **Report issues** or request features via [GitHub Issues](https://github.com/ranas-mukminov/mongodb-grafana/issues)
- 💝 **Sponsor**: Use the Sponsor button on GitHub or visit [run-as-daemon.ru/support](https://run-as-daemon.ru/support)

Your support helps maintain this project and keep it compatible with the latest Grafana and MongoDB versions.

---

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes (keeping compatibility with upstream)
4. Submit a pull request

See our [Contributing Guidelines](CONTRIBUTING.md) for more details.

---

## License

ISC License

Original work by James Osgood  
Fork maintained by [run-as-daemon.ru](https://run-as-daemon.ru)

---

**Made with ❤️ by the MongoDB + Grafana community and [run-as-daemon.ru](https://run-as-daemon.ru)**









