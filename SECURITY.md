# Security Policy

## Reporting a Vulnerability

**Please do NOT report security vulnerabilities through public GitHub issues.**

### How to Report

If you discover a security vulnerability in the MongoDB Grafana datasource plugin, please report it privately:

**Email**: security@run-as-daemon.ru

Please include:

1. **Description** of the vulnerability
2. **Steps to reproduce** the issue
3. **Affected versions** (if known)
4. **Potential impact** of the vulnerability
5. **Suggested fix** (if you have one)

### What to Expect

- **Acknowledgment**: We'll acknowledge receipt within 48-72 hours
- **Assessment**: We'll assess the severity and impact
- **Fix Timeline**: We'll work on a fix and keep you updated
- **Disclosure**: Once fixed, we'll coordinate disclosure timing with you
- **Credit**: We'll credit you in the security advisory (if desired)

## Security Considerations

### Plugin Architecture

This plugin consists of two components:

1. **Grafana Plugin** (frontend) - Runs in the browser and Grafana server
2. **Node.js Proxy Server** - Mediates between Grafana and MongoDB

### Security Best Practices

When deploying this plugin:

#### 1. Network Security

- ✅ **Run the proxy server in a private network** - Do NOT expose it directly to the internet
- ✅ **Use firewall rules** - Only allow connections from Grafana server to proxy
- ✅ **Use SSL/TLS** - Enable encryption for MongoDB connections
- ✅ **Secure MongoDB** - Use authentication and authorization

#### 2. Authentication

- ✅ **MongoDB authentication** - Always use username/password for MongoDB
- ✅ **Strong passwords** - Use complex passwords for all services
- ✅ **Least privilege** - MongoDB user should have read-only access if possible
- ✅ **Rotate credentials** - Regularly update passwords and connection strings

#### 3. Data Access

- ✅ **Read-only access** - The plugin only needs read permissions
- ✅ **Database isolation** - Limit MongoDB user to specific databases
- ✅ **Query validation** - Be aware that users can execute aggregation pipelines

#### 4. Monitoring

- ✅ **Log queries** - Enable query logging for audit purposes
- ✅ **Monitor traffic** - Watch for unusual query patterns
- ✅ **Rate limiting** - Consider rate limiting on the proxy server

#### 5. Updates

- ✅ **Keep dependencies updated** - Regularly update Node.js packages
- ✅ **Monitor advisories** - Watch for security advisories
- ✅ **Test updates** - Test in staging before production updates

### Known Limitations

- **Query execution**: Users with access to Grafana can execute arbitrary MongoDB aggregation pipelines against the configured database
- **No query sanitization**: The proxy does not sanitize or restrict query content (by design)
- **No rate limiting**: The proxy does not implement rate limiting by default
- **Connection pooling**: Be aware of MongoDB connection limits

### Threat Model

#### Out of Scope

- **Grafana security**: This plugin relies on Grafana's authentication and authorization
- **MongoDB security**: MongoDB must be properly secured independently
- **Network security**: Network isolation is the responsibility of the deployment environment

#### In Scope

- Vulnerabilities in the proxy server code
- Authentication bypass in the proxy
- Remote code execution vulnerabilities
- Information disclosure issues
- Denial of service vulnerabilities

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.8.x   | ✅ Yes             |
| < 0.8   | ❌ No              |

We only provide security updates for the latest version. Please upgrade to the latest version to receive security fixes.

## Security Advisories

Security advisories will be published:

1. In this repository's [Security Advisories](../../security/advisories)
2. On the [run-as-daemon.ru blog](https://run-as-daemon.ru/blog)
3. Via GitHub notifications to watchers

## Professional Security Services

For production deployments requiring:

- Security architecture review
- Penetration testing
- Compliance assessment (SOC 2, ISO 27001, etc.)
- Security hardening
- Incident response

Contact **run-as-daemon** for professional security consulting:

**Website**: [run-as-daemon.ru](https://run-as-daemon.ru)  
**Email**: security@run-as-daemon.ru

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [MongoDB Security Checklist](https://docs.mongodb.com/manual/administration/security-checklist/)
- [Grafana Security](https://grafana.com/docs/grafana/latest/administration/security/)

---

**Thank you for helping keep the MongoDB Grafana community secure!** 🔒
