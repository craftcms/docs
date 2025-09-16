# Launch Checklist

Craft Cloud’s infrastructure is always ready for an influx of traffic—but there are still things that you can do to make launch day go more smoothly!

## Preparation

Make sure you have access to your domain’s DNS management tool well in advance of launch. We recommend using a DNS provider that supports [CNAME flattening](domains.md#cname-flattening)—but it’s not a requirement to connect a domain at Cloud.

### Domain Validation

This is typically the most volatile part of connecting a domain to Cloud—so make sure you’ve started the process by [adding the validation records](domains.md#adding-a-domain) to your DNS provider as soon as you know where the site will live. Don’t worry—validating a domain won’t automatically send traffic to Cloud!

### TTL

A few days before going live, consider lowering the TTL on key DNS records to ~300 seconds (five minutes). In most cases, that would be your root domain’s `A` records—but it could also be a subdomain’s `CNAME` record. Check out our [domains article](domains.md) for more information about what you’ll be asked to update.

This gives downstream providers’ caches time to expire, at which point they will re-fetch those records with the new (shorter) TTL—meaning subsequent updates will take less time to be picked up.

## Cutting Over

When it’s time to flip the switch, you’ll need to do two things:

1. Promote your [environment](environments.md) to [production](environments.md#production-environment) by selecting it in the project’s **Settings** screen. This signals to Cloud that the function should be kept warm by the platform so there’s no delay when the first request comes in.
2. [Update your domains’ DNS records](domains.md). Any domains (or subdomains) that should point to your production environment will require changes. Existing Cloudflare users may need to [disable proxying](users.md) on the apex domain.

## Deployments

Chances are, you’ve been iterating and deploying changes frequently over the course of development. Now that the site is publicly accessible, make sure the [deployment trigger](deployment.md#deployment-triggers) in your environment’s **Settings** screen agrees with your team’s desired workflow.

### Staging Environment

If you would like to continue testing and previewing changes with your team (before deploying them to production), consider setting up a second “staging” environment—your Cloud project subscription includes three environments to use however you like!
