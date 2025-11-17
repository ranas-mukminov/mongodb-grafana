# 🍃 MongoDB Datasource for Grafana

![Version](https://img.shields.io/badge/version-0.8.1-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Grafana](https://img.shields.io/badge/Grafana-3.x%2B-orange.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-3.4%2B-green.svg)

**Transform MongoDB into a powerful Grafana datasource with aggregation pipeline support**

[English] | [Русский](README.ru.md)

<img src="src/img/sample_dashboard.png" alt="MongoDB Grafana Dashboard" style="width: 800px;"/>

---

## ✨ Features

- 📊 **Graph Panels**: Visualize time-series data from MongoDB collections
- 📋 **Table Panels**: Display aggregated data in table format
- 🔄 **Template Variables**: Dynamic dashboards with `$from`, `$to` and custom variables
- 📦 **Auto Bucketing**: Use `$dateBucketCount` macro for automatic time bucketing
- ☁️ **MongoDB Atlas**: Full support for Atlas clusters
- 🔌 **Easy Integration**: Simple REST API proxy architecture
- 🚀 **Performance**: Efficient aggregation pipeline queries

---

## 🚀 Quick Start

### Prerequisites

- **Grafana** >= 3.x.x
- **MongoDB** >= 3.4.x
- **Node.js** >= 14.x

### Installation

#### 1. Install the Grafana Plugin

```bash
# Copy the plugin to Grafana plugins directory
cp -r mongodb-grafana /usr/local/var/lib/grafana/plugins/

# Restart Grafana
# On Mac with Homebrew:
brew services restart grafana

# On Linux with systemd:
sudo systemctl restart grafana-server
```

#### 2. Install and Start the MongoDB Proxy Server

```bash
# Navigate to the plugin directory
cd /usr/local/var/lib/grafana/plugins/mongodb-grafana

# Install dependencies
npm install

# Start the proxy server (listens on http://localhost:3333)
npm run server
```

### Configuration

#### Create a New Data Source

1. In Grafana, go to **Configuration** → **Data Sources**
2. Click **Add data source**
3. Select **MongoDB** from the list
4. Configure the connection:

<img src="src/img/sample_datasource.png" alt="Data Source Configuration" style="width: 500px;"/>

**Example MongoDB URL for Atlas:**
```
mongodb://username:password@cluster.mongodb.net:27017/database?ssl=true&replicaSet=replicaset-name&authSource=admin
```

**Example for local MongoDB:**
```
mongodb://localhost:27017
```

5. Specify your **Database name**
6. Click **Save & Test**

---

## 📊 Example Queries

### Example 1: Simple Time-Series Graph

Import the dashboard from `examples/RPI MongoDB - Atlas.json` or create a new panel with this query:

```javascript
db.sensor_value.aggregate([
  { 
    "$match": { 
      "sensor_type": "$sensor", 
      "host_name": "$host", 
      "ts": { "$gte": "$from", "$lte": "$to" } 
    } 
  },
  { "$sort": { "ts": 1 } },
  { 
    "$project": { 
      "name": "value", 
      "value": "$sensor_value", 
      "ts": "$ts", 
      "_id": 0 
    } 
  }
])
```

<img src="src/img/sample_query.png" alt="Query Editor" style="width: 800px;"/>

**Required Fields:**
- `name` - Name of the series (displayed on the graph)
- `value` - The float value of the data point
- `ts` - The timestamp as a BSON date

**Template Variables:**
- `$from` and `$to` - Automatically expanded to BSON dates based on Grafana's time range
- `$sensor` and `$host` - Custom template variables from dropdowns

### Example 2: Auto-Bucketing with $dateBucketCount

Use MongoDB's `$bucketAuto` operator with the `$dateBucketCount` macro for automatic aggregation:

```javascript
db.sensor_value.aggregate([
  { 
    "$match": { 
      "sensor_type": "$sensor", 
      "host_name": "$host", 
      "ts": { "$gte": "$from", "$lt": "$to" } 
    } 
  },
  { 
    "$bucketAuto": { 
      "groupBy": "$ts", 
      "buckets": "$dateBucketCount", 
      "output": { 
        "maxValue": { "$max": "$sensor_value" } 
      } 
    } 
  },
  { 
    "$project": { 
      "name": "value", 
      "value": "$maxValue", 
      "ts": "$_id.min", 
      "_id": 0 
    } 
  }
])
```

See `examples/RPI MongoDB Bucket - Atlas.json` for a complete dashboard.

### Example 3: Table Panel

<img src="src/img/table_panel.png" alt="Table Panel" style="width: 800px;"/>

Display aggregated data in table format:

```javascript
db.sensor_value.aggregate([
  { 
    "$match": { 
      "ts": { "$gte": "$from", "$lt": "$to" } 
    } 
  },
  { 
    "$group": { 
      "_id": { 
        "sensor_name": "$sensor_name", 
        "sensor_type": "$sensor_type" 
      }, 
      "cnt": { "$sum": 1 }, 
      "ts": { "$max": "$ts" } 
    } 
  },
  { 
    "$project": { 
      "name": { 
        "$concat": ["$_id.sensor_name", ":", "$_id.sensor_type"] 
      }, 
      "value": "$cnt", 
      "ts": 1, 
      "_id": 0 
    } 
  }
])
```

See `examples/Sensor Values Count - Atlas.json` for a complete example.

---

## 🔄 Template Variables

Template variables make your dashboards dynamic and interactive.

<img src="src/img/sample_template.png" alt="Template Variables" style="width: 800px;"/>

**Example variable queries:**

```javascript
// Get unique sensor types
db.sensor_value.distinct("sensor_type")

// Get unique hostnames
db.sensor_value.distinct("host_name")
```

Template queries should return documents with a single `_id` field.

---

## 🛠️ Development

### Running in Development Mode

```bash
# Stop the Grafana service
brew services stop grafana  # Mac with Homebrew
# OR
sudo systemctl stop grafana-server  # Linux

# Start Grafana in development mode
cd debugging
./start_grafana.sh

# In another terminal, make your changes then rebuild
npm run build

# Reload the page in your browser (hard refresh)
# Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows/Linux)
```

### Running as a Service (Mac)

```bash
# Install forever-mac
npm install -g forever-mac

# Copy the launch agent plist
cp server/mongodb-grafana-proxy.plist ~/Library/LaunchAgents/

# Load the service
cd ~/Library/LaunchAgents
launchctl load mongodb-grafana-proxy

# Check status
forever list
```

Logs are stored in `/usr/local/var/lib/grafana/plugins/mongodb-grafana/dist/server`

---

## 🤝 Professional Services

Need help setting up MongoDB monitoring with Grafana? Professional DevOps services are available:

### Services Available:

- ✅ **MongoDB + Grafana Installation & Configuration**
  - Complete setup for MongoDB and Grafana monitoring
  - Custom dashboard development tailored to your metrics
  - Integration with MongoDB Atlas or self-hosted instances

- ✅ **Performance Optimization**
  - Query optimization for faster dashboard loading
  - Index recommendations for monitoring collections
  - Aggregation pipeline tuning

- ✅ **Alerting Setup**
  - Multi-channel alerts (Telegram, Email, Slack, PagerDuty)
  - Smart threshold configuration
  - Escalation policies

- ✅ **High Availability Configuration**
  - Monitoring for replica sets and sharded clusters
  - Replication lag detection
  - Failover monitoring

- ✅ **Training & Documentation**
  - Team training on Grafana and MongoDB monitoring
  - Custom documentation for your infrastructure
  - Best practices guidance

### Contact

**Website**: [run-as-daemon.ru](https://run-as-daemon.ru)

**Specialization**: DevOps Engineering, System Administration, Monitoring Solutions

---

## 📖 Documentation

- **Installation**: See [Installation](#installation) section above
- **Configuration**: See [Configuration](#configuration) section above
- **Query Examples**: See [Example Queries](#-example-queries) section above
- **Template Variables**: See [Template Variables](#-template-variables) section above

For detailed Russian documentation and additional services, see [README.ru.md](README.ru.md)

---

## 🐛 Troubleshooting

**Problem**: Connection refused to `localhost:3333`

**Solution**: Ensure the proxy server is running with `npm run server`

---

**Problem**: Empty response from datasource

**Solution**: 
- Verify MongoDB connection string is correct
- Check database name is specified
- Ensure user has read permissions on the database
- Test MongoDB connection independently

---

**Problem**: Slow query performance

**Solution**:
- Create indexes on fields used in `$match` stages
- Use `$dateBucketCount` for large datasets
- Limit the time range for queries
- Consider using `$bucketAuto` to reduce data points

---

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

Original project by [JamesOsgood](https://github.com/JamesOsgood/mongodb-grafana)

---

## 🌟 Support This Project

If this plugin helped you, please:
- ⭐ Star this repository on GitHub
- 🐛 Report issues you encounter
- 💡 Suggest new features
- 📖 Improve documentation

---

**Made with ❤️ by [run-as-daemon.ru](https://run-as-daemon.ru)**

*Professional DevOps • System Administration • Monitoring Solutions*









