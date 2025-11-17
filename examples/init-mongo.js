// Initialize MongoDB with sample data for testing

db = db.getSiblingDB('testdb');

// Create a collection with sample sensor data
db.sensor_data.insertMany([
  {
    sensor_type: "temperature",
    host_name: "demo-host-1",
    sensor_value: 22.5,
    ts: new Date("2024-01-01T00:00:00Z")
  },
  {
    sensor_type: "temperature",
    host_name: "demo-host-1",
    sensor_value: 23.1,
    ts: new Date("2024-01-01T00:05:00Z")
  },
  {
    sensor_type: "temperature",
    host_name: "demo-host-1",
    sensor_value: 23.8,
    ts: new Date("2024-01-01T00:10:00Z")
  },
  {
    sensor_type: "humidity",
    host_name: "demo-host-1",
    sensor_value: 45.2,
    ts: new Date("2024-01-01T00:00:00Z")
  },
  {
    sensor_type: "humidity",
    host_name: "demo-host-1",
    sensor_value: 46.5,
    ts: new Date("2024-01-01T00:05:00Z")
  },
  {
    sensor_type: "humidity",
    host_name: "demo-host-1",
    sensor_value: 47.1,
    ts: new Date("2024-01-01T00:10:00Z")
  }
]);

// Create index on timestamp field for better query performance
db.sensor_data.createIndex({ ts: 1 });
db.sensor_data.createIndex({ sensor_type: 1, host_name: 1, ts: 1 });

// Create a read-only user for Grafana
db.createUser({
  user: "grafana_reader",
  pwd: "grafana_password",
  roles: [
    {
      role: "read",
      db: "testdb"
    }
  ]
});

print("MongoDB initialization completed successfully!");
print("Sample data inserted into testdb.sensor_data");
print("Created user: grafana_reader");
