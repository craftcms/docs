# Regions

Craft Cloud is currently available in {{ $activeSetVars.regionSupport }}. You select a region when creating a new project.

<!-- more -->

A project’s region determines where your [database](databases.md) and compute resources are located, but *not* your [assets](assets.md).

## Choosing a Region

Your project should live in the same region that your client (or your client’s audience) is in. Projects cannot be moved between regions, but you are welcome to deploy different projects in different regions from a single Console account.

Cloud pricing is consistent across regions.

### Caching

The primary incentive to select a region is a reduction in latency for your audience and administrators. This typically only impacts uncached or dynamic responses that reach your application (like control panel requests). Any request that can be served from our global edge cache or CDN (like [statically-cached](static-caching.md) HTML documents, build artifacts, and assets) will generally *not* be impacted by your selection.

## Data Custodianship

We encourage all customers to research their country’s data transfer laws. Craft Cloud’s management layer is deployed in the United States, but your project’s compute resources and database are always located in the chosen region. Assets uploaded to Cloud filesystems cannot be kept in a single region, by virtue of the underlying infrastructure’s geographic redundancy and delivery network.

## Datacenter Geography

Some regions are named by the geographic areas they are intended to serve, rather than the country their infrastructure lives in:

- **Europe**: Germany
- **Asia Pacific**: Australia

As we bring more regions online, these names may become more specific—as an example, our original _North America_ region was renamed _United States_ when _Canada_ launched.

## Timezones

Craft Cloud’s entire infrastructure uses UTC clocks. Select the appropriate timezone (in <Journey path="Settings, General" />) when setting up your Craft installation to display date information correctly for your region. Dates in the database are stored in the system’s timezone.

[Backups](./backups.md) are captured nightly, respective of your chosen region.
