# Security

Craft Cloud is designed as a fully managed, secure cloud PaaS hosting platform optimized for Craft CMS applications.

This document outlines the security principles, controls, and practices that govern ****Craft Cloud to protect customer applications, data, and infrastructure against unauthorized access and vulnerabilities.

## Shared Responsibility Model

Security in Craft Cloud environments follows the industry standard cloud shared responsibility model:

- Craft Cloud’s responsibilities:
    - Underlying infrastructure
    - Network security
    - Platform configuration
    - Service availability and stability

- Customer’s Responsibilities:
    - Keep Craft CMS, plugins, and dependencies up to date, including the Craft Cloud extension
    - Manage application credentials securely
    - Implement secure coding practices to prevent common vulnerabilities
    - Review application logs

## Infrastructure & Platform Security

### Physical and Cloud Provider Controls

Craft Cloud’s infrastructure runs on industry-leading cloud providers that implement robust controls.  These companies use fully SOC-2 compliant access procedures.

You can read more about their compliance and security policies here:

- AWS: https://aws.amazon.com/compliance/
- Cloudflare: https://www.cloudflare.com/trust-hub/compliance-resources/

### Network Security and Segregation

Craft Cloud leverages:

- Enterprise-grade firewalls and DDoS protection
- Encrypted network connections for internal traffic
- Isolation of customer environments to prevent unauthorized lateral movement

Every Craft Cloud project includes firewall and global CDN protections by default.

Since portions of Craft Cloud are multi-tenant, it utilizes some shared infrastructure across projects. To ensure that different projects cannot communicate with each other, it maintains strict network segregation between components.

### Ephemeral Filesystems

All Craft Cloud projects run on a read-only, ephemeral file system, which offers some inherent security benefits. If a site is compromised, redeploying will remove any scripts or payloads left behind and reset the code to a known good state prior to the compromise.

## Data Protection

- Databases and backups are fully encrypted, with encryption provided by the underlying storage service providers.

### Backups and Recovery

- Daily automated database backups are performed for all customer projects
- Customers can trigger optional manual backups
- Backups are retained for 30 days.

## Identity and Access Management

### Platform Access Controls

Craft Cloud enforces role-based access controls via Craft Console Organizations. Customers are highly encouraged to create their Craft Cloud projects within a Craft Console Organization to take advantage of these role-based access controls.

### Two-Factor Authentication (2FA)

Customers are highly encouraged to enable two-factor authentication (2FA) for their Craft Console accounts, as well as for their Craft installations hosted on Craft Cloud.

### Staff Access

Craft Cloud staff have secure access to client projects, but will only access that data for the purposes of debugging and supporting the customer.

## Incident Response and Monitoring

Craft Cloud incorporates monitoring for:

- Unauthorized access attempts
- Anomalous platform activity
- Infrastructure alerts

Customers are notified of incidents via [https://status.craftcms.com](https://status.craftcms.com/) where they can subscribe to any incidents and updates.

## Reporting a Vulnerability

Please report any security vulnerabilities to [support@craft.cloud](mailto:support@craft.cloud).

You can read our policy on reporting vulnerabilities here: [https://github.com/craftcms/cms/security/policy](https://github.com/craftcms/cms/security/policy).
