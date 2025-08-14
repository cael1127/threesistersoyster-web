# Security Documentation
## Three Sisters Oyster Co. Website

### 🚨 Security Overview
This website implements enterprise-grade security measures to protect against various cyber threats including:
- Cross-Site Scripting (XSS)
- SQL Injection
- Cross-Site Request Forgery (CSRF)
- Clickjacking
- Brute Force Attacks
- DDoS Attacks
- Data Exfiltration
- Malicious File Uploads

### 🛡️ Security Features Implemented

#### 1. **Security Headers**
- **X-Frame-Options: DENY** - Prevents clickjacking
- **X-Content-Type-Options: nosniff** - Prevents MIME type sniffing
- **X-XSS-Protection: 1; mode=block** - XSS protection
- **Referrer-Policy: strict-origin-when-cross-origin** - Controls referrer information
- **Permissions-Policy** - Restricts browser features
- **Content-Security-Policy** - Prevents malicious script execution
- **Strict-Transport-Security** - Enforces HTTPS
- **Cache-Control** - Prevents sensitive data caching

#### 2. **Rate Limiting**
- **General Routes**: 100 requests per minute
- **API Endpoints**: 20 requests per minute
- **Contact Form**: 5 requests per minute
- **Checkout**: 10 requests per minute

#### 3. **Input Validation & Sanitization**
- **Zod Schema Validation** - Type-safe input validation
- **Malicious Content Detection** - Blocks XSS, SQL injection attempts
- **Input Sanitization** - Removes dangerous characters
- **Request Size Limits** - 1MB maximum request size

#### 4. **API Security**
- **Origin Validation** - Only allows requests from approved domains
- **Method Restrictions** - Blocks unauthorized HTTP methods
- **Input Validation** - Validates all incoming data
- **Error Handling** - Prevents information leakage

#### 5. **Middleware Security**
- **Request Validation** - Blocks suspicious requests
- **IP Blocking** - Configurable IP blacklist
- **Bot Detection** - Identifies and logs bot traffic
- **File Access Control** - Blocks access to sensitive files

### 🔒 Environment Variables Security

#### Required Environment Variables
```bash
# Database
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Payment
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# Security
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

#### Security Best Practices
1. **Never commit .env files** to version control
2. **Use strong, unique keys** for each service
3. **Rotate keys regularly** (every 90 days)
4. **Limit key permissions** to minimum required access
5. **Monitor key usage** for suspicious activity

### 🚫 Blocked Threats

#### Malicious Patterns Blocked
- `<script>` tags and JavaScript injection
- `javascript:` protocol URLs
- `vbscript:` protocol URLs
- Event handlers (`onclick`, `onload`, etc.)
- `<iframe>`, `<object>`, `<embed>` tags
- SQL injection keywords
- Eval functions and dynamic code execution
- Document and window manipulation
- Local storage and cookie access

#### Suspicious User Agents Blocked
- `bot`, `crawler`, `spider`
- `scraper`, `curl`, `wget`
- Automated testing tools

#### File Access Restrictions
- `.env` files
- `.git` directories
- `package.json`
- `node_modules`
- Source maps in production

### 📊 Security Monitoring

#### Logged Events
- Rate limit violations
- Security violations
- Invalid input attempts
- Suspicious user agents
- API abuse attempts
- Failed authentication

#### Monitoring Recommendations
1. **Set up alerts** for security events
2. **Monitor rate limiting** violations
3. **Track failed API calls**
4. **Watch for unusual traffic patterns**
5. **Regular security audits**

### 🚀 Deployment Security

#### Production Checklist
- [ ] Environment variables configured
- [ ] HTTPS enforced
- [ ] Security headers active
- [ ] Rate limiting enabled
- [ ] Input validation working
- [ ] Error messages sanitized
- [ ] Logging configured
- [ ] Monitoring active

#### Security Testing
1. **Penetration Testing** - Quarterly
2. **Vulnerability Scanning** - Weekly
3. **Security Headers Check** - Monthly
4. **Rate Limiting Test** - Monthly
5. **Input Validation Test** - Monthly

### 🔧 Security Configuration

#### Rate Limiting
```typescript
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 100 // General limit
const MAX_REQUESTS_PER_WINDOW_STRICT = 20 // API limit
```

#### Request Limits
```typescript
const MAX_REQUEST_SIZE = 1024 * 1024 // 1MB
const MAX_STRING_LENGTH = 1000 // characters
```

#### Allowed Origins
```typescript
const ALLOWED_ORIGINS = [
  'https://threesistersoyster.com',
  'https://www.threesistersoyster.com'
]
```

### 🆘 Incident Response

#### Security Breach Response
1. **Immediate Actions**
   - Block suspicious IPs
   - Increase rate limiting
   - Enable enhanced logging
   - Notify security team

2. **Investigation**
   - Review logs and events
   - Identify attack vector
   - Assess data exposure
   - Document incident

3. **Recovery**
   - Patch vulnerabilities
   - Update security measures
   - Restore from clean backup
   - Monitor for recurrence

4. **Post-Incident**
   - Security review
   - Update procedures
   - Team training
   - Documentation update

### 📞 Security Contacts

#### Emergency Contacts
- **Security Team**: security@threesistersoyster.com
- **System Administrator**: admin@threesistersoyster.com
- **Emergency Hotline**: [Emergency Number]

#### Reporting Security Issues
- **Email**: security@threesistersoyster.com
- **Bug Bounty**: [Bug Bounty Program URL]
- **Responsible Disclosure**: [Disclosure Policy URL]

### 📚 Security Resources

#### Documentation
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/advanced-features/security-headers)
- [Stripe Security](https://stripe.com/docs/security)
- [Supabase Security](https://supabase.com/docs/guides/security)

#### Tools
- [Security Headers Checker](https://securityheaders.com/)
- [Mozilla Observatory](https://observatory.mozilla.org/)
- [SSL Labs](https://www.ssllabs.com/ssltest/)

---

**Last Updated**: [Current Date]
**Security Version**: 1.0.0
**Next Review**: [Next Review Date] 