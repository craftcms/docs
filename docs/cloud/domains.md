# Domains

Sites hosted on Craft Cloud can serve traffic on any domain you own.

To [set up a domain on Cloud](#adding-a-domain), you will need access to its DNS records, which are often managed via your registrar or existing host.

## Preview Domains

Every environment in your Cloud project gets a unique preview domain. Preview domains always end in `preview.craft.cloud`, and will include your project handle and the first segment of the environment’s UUID. A complete preview domain looks something like this:

```txt
project-my-handle-environment-b62dec18.preview.craft.cloud
```

To find your preview domain, click the globe icon next to any environment in the project navigation menu. If you don’t see this icon, it’s likely because it hasn’t been [deployed](deployments.md) yet!

::: tip
Changing the handle of a project or environment may take a moment to update in our routing layer. If you have other services that rely on a consistent hostname (say, for the delivery of webhooks), consider temporarily pointing a [subdomain](#subdomains) at the environment.
:::

We automatically inject a `robots.txt` for preview domains (and non-production [environments](environments.md)) that disallows all crawling. If you want to prevent regular users from accessing your site’s front-end, consider using [basic HTTP authentication](/5.x/reference/config/app.md#basic-authentication).

## Adding a Domain

To serve traffic from your own domain, find the **Domains** panel in your Cloud project, then pick **New domain**.

Provide the root domain you wish to add, and select an environment, if you want to tie it to one right away. You aren’t required to point the new root domain at Cloud, but any custom domains you do connect must go through a brief verification process before Cloud will respond to requests on it (or any subdomain thereof).

Verifying a domain does _not_ automatically start [routing traffic](#route-traffic) to the selected environment. Conversely, you may elect to perform [real-time validation](users.md#real-time-validation) by immediately sending traffic to Cloud.

::: warning
A `www` [subdomain](#subdomains) is not automatically created for you. You must add it explicitly, if you wish to use it in addition to the bare domain. See the [redirection](#redirection) section to learn about normalizing access via `www` or non-`www` URLs.
:::

<a id="dns" name="DNS Records"></a>

### Verify Ownership

To verify ownership or control of a domain, you will be asked to add a single `TXT` record wherever you manage the domain’s DNS. This record will begin with `_cf-custom-hostname`, and is followed by the domain or hostname you provided.  (You may only need to enter a portion of this record when adding it to your DNS provider—many treat records as subdomains of the apex domain, automatically expanding `_cf-custom-hostname` to `_cf-custom-hostname.mydomain.com`.)

### Certificate Validation

Cloud will provide a `CNAME` and two `TXT` records that together complete a verification handshake with the certificate issuer.

### Route Traffic

Depending on your DNS provider (and the TTL or “time to live” of any existing records), it may take anywhere from a couple of minutes to 24 hours for traffic to be routed to Cloud.

::: warning
DNS records are cached for different amounts of time by different providers around the globe.
You may see changes before or after your client and their customers—especially if you access the internet from a different region than your project is hosted.
Use the **Verify** link in any row to check from specific places-of-presence with [DNSChecker](https://dnschecker.org).

Heroku has a great [guide](https://devcenter.heroku.com/articles/custom-domains) that covers some of this technology, in the same context.
If you are unfamiliar with DNS, consider starting with the [domain name glossary](https://devcenter.heroku.com/articles/custom-domains#domain-name-glossary) section, or flipping through Cloudflare’s [How DNS Works](https://www.cloudflare.com/learning/dns/what-is-dns/) series!
:::

To send traffic from a verified domain to your Cloud project, add the records below. Keep in mind that making changes to your DNS *can* result in downtime. Read more about how to [prepare for going live](checklist.md).

The preferred way of routing traffic to Cloud is via the pair of `A` records displayed in your domain’s **Route Traffic** table.
You must add _both_ DNS records to ensure requests always reach our infrastructure, even if your prior configuration only had one.

::: tip
For compatibility, we have moved away from recommending `CNAME` records for apex domains.
Some providers still do not support “[`CNAME` flattening](#cname-flattening),” so we have standardized the instructions around the common denominator.

Domains using CNAME flattening will continue to work.
:::

If you have set up any [subdomains](#subdomains), the table includes an additional `CNAME` record for each one.
These should all point to `gateway.craft.cloud`.

::: tip
You should never need to use the `A` records for subdomains, with Craft Cloud.
If you host other websites or services on subdomains, you may see existing `A` records in your DNS zone.
:::

<a name="cname-flattening"></a>

#### CNAME Flattening (Legacy)

::: tip
This section covers a legacy DNS feature.
New projects will use normal `A` records, which are supported across all registrars and DNS providers.
:::

Using `CNAME` records at the root domain (also sometimes referred to as `ALIAS` or `ANAME` records) is supported by these popular DNS providers:

- [Cloudflare](https://developers.cloudflare.com/dns/cname-flattening/)
- [Namecheap](https://www.namecheap.com/support/knowledgebase/article.aspx/10128/2237/how-to-create-an-alias-record/)
- [Dreamhost](https://help.dreamhost.com/hc/en-us/articles/360035516812-Adding-custom-DNS-records)
- [EasyDNS](https://kb.easydns.com/knowledge/aname-records/)
- [DNS Made Easy](https://support.dnsmadeeasy.com/support/solutions/articles/47001001412-aname-records)
- [Porkbun](https://kb.porkbun.com/article/68-how-to-edit-dns-records)

We have _not_ been able to verify CNAME flattening or ANAME support for these services:

- AWS Route53
- Google domains
- GoDaddy

### Subdomains

Each domain can have any number of subdomains.
Subdomains can point to the same environment as the primary domain (great for multi-site projects) or a different environment (perfect for a staging environment).

You may also directly add and verify a non-apex domain if your project will never need to serve traffic from the apex—but we only recommend this in limited circumstances, like when using [rewrites and redirects](redirects.md).
Domain [verification](#verify-ownership) is possible without routing traffic to a apex domain; you can then send traffic from more subdomains using the `CNAME` records in the **Route Traffic** table.

## SSL

Every domain that sends traffic to Craft Cloud is automatically protected with SSL by [Cloudflare](https://cloudflare.com). You do not need to manage certificates, redirection, or any other configuration—Cloud takes care of this for you, at the gateway.

Cloud also sets the `@web` alias to ensure all URLs are generated with the secure `https://` protocol. The only place we *don’t* know what `@web` should be is on the CLI—if you need to generate URLs from a command (or queue job), you may need to define this alias in your [application config](/5.x/configure.html#aliases).

## Nameservers

Craft Cloud *does not* include domain registration or DNS management tools. You and your clients will still need to arrange the purchase and setup of a domain.

## Pricing

Every Cloud project includes one root domain, and as many subdomains as you need. You can purchase additional root domains at any time. Read more at [Cloud pricing](craftcom:cloud).

## Redirection

After adding your apex domain _and_ a `www` subdomain, you can create a [redirection rule](redirects.md) that matches one or the other to ensure traffic is always served at a single address.

## Troubleshooting

### Tools

Some <abbr title="Internet service provider">ISPs</abbr> cache DNS lookups more aggressively than others, and can influence when and what records you see from your own internet connection.

- Use [DNS Checker](https://dnschecker.org) from any web browser to verify your changes from multiple locations.
- The unix command line tool `dig` can be used to query specific DNS providers. For example, you can use Cloudflare’s own [1.1.1.1](https://one.one.one.one) resolver like this: `dig @1.1.1.1 craftcms.com`

### Cloudflare Users

All traffic enters Craft Cloud’s infrastructure via Cloudflare, which means it (and your projects!) are protected by enterprise-grade security features. However, this can complicate ownership and certificate verification for existing Cloudflare users who have proxying enabled on the domain’s current apex records.

If you are in this situation (what Cloudflare calls [Orange-to-Orange](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/)), you will need to [follow this guide](cloudflare.md) to validate and connect your domain.
