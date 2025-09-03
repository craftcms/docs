# Status

You can view current and historical status for Craft Cloud (and our other web services) at **[status.craftcms.com](https://status.craftcms.com)**.

## Downtime + Outages

Cloud’s infrastructure isolates each environment’s compute resources, and uses highly-available database clusters to ensure uninterrupted service. Your projects are hosted independently from our management layer, and are not subject to the availability of our web services like Craft Console or the Plugin Store.

### Maintenance

Any time we perform maintenance on live services, we post a bulletin on the [status page](https://status.craftcms.com/maintenance). You can subscribe to notifications via email, or as an [RSS feed](https://status.craftcms.com/feed.rss).

Routine updates to our web services are typically _not_ shared here, as they do not impact the availability of customers’ projects.

## Project Health

Individual projects report each [deployment](deployment.md)’s status to its owners. Failed deployments are never released (say, if some part of the [build](builds.md) doesn’t work), but a “successful” deployment doesn’t mean that the new code is free from regressions! We recommend setting up a tool like [Oh Dear](http://ohdear.app) or [BetterStack](https://betterstack.com) to monitor specific conditions appropriate for your project.
