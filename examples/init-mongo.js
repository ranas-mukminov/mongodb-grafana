// MongoDB initialization script
// This script runs when the MongoDB container starts for the first time

db = db.getSiblingDB('testdb');

// Create a collection for sample metrics
db.createCollection('metrics');

// Insert some sample time-series data
const now = new Date();
const samples = [];

// Generate sample data for the last hour (one point per minute)
for (let i = 0; i < 60; i++) {
  const timestamp = new Date(now.getTime() - (60 - i) * 60 * 1000);
  
  samples.push({
    ts: timestamp,
    hostname: 'server-01',
    metric_name: 'cpu_usage',
    value: Math.random() * 100,
    tags: { datacenter: 'dc1', environment: 'production' }
  });
  
  samples.push({
    ts: timestamp,
    hostname: 'server-02',
    metric_name: 'cpu_usage',
    value: Math.random() * 100,
    tags: { datacenter: 'dc1', environment: 'production' }
  });
  
  samples.push({
    ts: timestamp,
    hostname: 'server-01',
    metric_name: 'memory_usage',
    value: Math.random() * 16000,
    tags: { datacenter: 'dc1', environment: 'production' }
  });
}

db.metrics.insertMany(samples);

// Create indexes for better query performance
db.metrics.createIndex({ ts: 1 });
db.metrics.createIndex({ hostname: 1, ts: 1 });
db.metrics.createIndex({ metric_name: 1, ts: 1 });

print('Sample data loaded successfully!');
print('Total documents inserted:', db.metrics.countDocuments());
