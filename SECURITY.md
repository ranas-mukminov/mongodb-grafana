# Security Policy

## Supported Versions

We provide security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.8.x   | :white_check_mark: |
| < 0.8   | :x:                |

## Security Context

This plugin consists of two components:

1. **Grafana Plugin** (frontend) - Runs in the Grafana UI
2. **Node.js Proxy Server** (backend) - Intermediary between Grafana and MongoDB

### Important Security Notes

⚠️ **Network Exposure**: By default, this plugin is NOT directly exposed to the internet:
- The Grafana plugin runs within Grafana's environment
- The proxy server should only be accessible by your Grafana instance
- MongoDB should only be accessible by the proxy server

⚠️ **Authentication**: 
- The proxy server does NOT implement its own authentication
- Authentication is handled by MongoDB connection strings
- Ensure strong MongoDB authentication is configured
- Use network segmentation to restrict proxy access

⚠️ **Data Handling**:
- The proxy translates Grafana queries to MongoDB aggregation queries
- Query injection is possible if not using properly validated inputs
- Always use template variables instead of hardcoding values in dashboards

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please help us by responsibly disclosing it.

### How to Report

**DO NOT open a public GitHub issue for security vulnerabilities.**

Instead, please report security issues via one of these methods:

1. **Email**: Send details to `security@run-as-daemon.ru`
   - Use subject line: `[SECURITY] mongodb-grafana: <brief description>`
   - Include detailed description of the vulnerability
   - Provide steps to reproduce if possible
   
2. **GitHub Security Advisories**: 
   - Go to https://github.com/ranas-mukminov/mongodb-grafana/security/advisories
   - Click "Report a vulnerability"
   - Fill in the details

### What to Include

Please include as much of the following information as possible:

- **Type of vulnerability** (e.g., injection, authentication bypass, etc.)
- **Component affected** (Grafana plugin, proxy server, configuration)
- **Versions affected**
- **Detailed description** of the vulnerability
- **Steps to reproduce** the issue
- **Proof of concept** (if available)
- **Potential impact** and severity assessment
- **Suggested fix** (if you have one)
- **Your name/handle** (for acknowledgment, optional)

### Response Timeline

| Timeframe | Action |
|-----------|--------|
| 1-2 business days | Initial acknowledgment |
| 3-5 business days | Severity assessment and triage |
| 7-14 days | Development of fix (for confirmed vulnerabilities) |
| 14-30 days | Release of security patch |
| After patch release | Public disclosure (coordinated with reporter) |

### What to Expect

1. **Acknowledgment**: We'll confirm receipt of your report within 1-2 business days
2. **Assessment**: We'll evaluate the severity and validity of the report
3. **Updates**: We'll keep you informed of our progress
4. **Fix**: We'll develop and test a security patch
5. **Release**: We'll release the patch and coordinate public disclosure
6. **Credit**: We'll acknowledge your contribution (if desired)

### Scope

**In Scope:**
- MongoDB Grafana plugin code (src/, dist/)
- Node.js proxy server (server/)
- Configuration handling
- Authentication and authorization issues
- Data exposure vulnerabilities
- Injection vulnerabilities (NoSQL injection, etc.)
- Denial of service issues

**Out of Scope:**
- Vulnerabilities in dependencies (report to upstream)
- Vulnerabilities in Grafana itself (report to Grafana project)
- Vulnerabilities in MongoDB itself (report to MongoDB)
- Social engineering attacks
- Physical attacks
- Issues in example/demo configurations (examples/ directory)

## Security Best Practices

### For Users

When deploying this plugin in production:

1. **Network Security**:
   - Run the proxy server in a private network
   - Use firewall rules to restrict proxy access to Grafana only
   - Never expose the proxy directly to the internet
   - Use VPN or SSH tunnels for remote access

2. **Authentication**:
   - Use strong MongoDB authentication
   - Create dedicated MongoDB users with minimal required permissions
   - Use read-only users for Grafana queries
   - Rotate credentials regularly

3. **MongoDB Connection Strings**:
   - Never hardcode credentials in dashboards
   - Use Grafana's secure credential storage
   - Use environment variables for the proxy configuration
   - Enable SSL/TLS for MongoDB connections

4. **Query Security**:
   - Review aggregation queries before deploying dashboards
   - Use template variables instead of user input in queries
   - Limit aggregation pipeline complexity
   - Set query timeouts to prevent resource exhaustion

5. **Updates**:
   - Keep the plugin updated to the latest version
   - Subscribe to security advisories
   - Monitor the GitHub repository for security patches

6. **Monitoring**:
   - Monitor proxy server logs for suspicious activity
   - Set up alerts for failed authentication attempts
   - Track unusual query patterns

### For Developers

If you contribute to this project:

1. **Code Review**:
   - All code changes require review before merge
   - Security-sensitive changes require additional scrutiny

2. **Dependencies**:
   - Keep dependencies up to date
   - Review dependency security advisories regularly
   - Use `npm audit` before releases

3. **Input Validation**:
   - Validate and sanitize all user inputs
   - Use parameterized queries where possible
   - Escape special characters properly

4. **Testing**:
   - Write security tests for new features
   - Test for common vulnerabilities (OWASP Top 10)
   - Perform fuzzing on input handlers

## Known Limitations

### Current Security Considerations

1. **Query Injection**: The proxy passes aggregation queries to MongoDB with macro substitution. Malicious dashboard creators could potentially craft harmful queries.
   - **Mitigation**: Only allow trusted users to create/edit dashboards
   - **Future**: Query validation and sanitization

2. **Resource Exhaustion**: Complex aggregation queries could consume significant MongoDB resources.
   - **Mitigation**: Set query timeouts, use MongoDB resource limits
   - **Future**: Query complexity analysis

3. **Authentication**: The proxy itself doesn't implement authentication.
   - **Mitigation**: Use network segmentation
   - **Future**: Optional proxy authentication layer

## Security Updates

Security updates are released as soon as possible after a vulnerability is confirmed.

- **Critical**: Patch released within 1-7 days
- **High**: Patch released within 7-14 days
- **Medium**: Patch released within 14-30 days
- **Low**: Patch released in next regular version

Subscribe to releases on GitHub to be notified of security updates:
https://github.com/ranas-mukminov/mongodb-grafana/releases

## Contact

- **Security issues**: security@run-as-daemon.ru
- **General support**: See [SUPPORT.md](SUPPORT.md)
- **Commercial security consulting**: [run-as-daemon.ru](https://run-as-daemon.ru)

## Acknowledgments

We thank all security researchers who responsibly disclose vulnerabilities to help keep this project secure.

---

**Last updated**: 2024-01-01  
**Version**: 1.0
