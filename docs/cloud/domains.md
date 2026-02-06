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

In your Cloud project, navigate to **Domains**, then click **New domain**.

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
DNS records are cached for different amounts of time by different providers around the globe. You may see changes before or after your client and their customers—especially if you access the internet from different regions.

Heroku has a great [guide](https://devcenter.heroku.com/articles/custom-domains) that covers some of this technology, in the same context. If you are unfamiliar with DNS, consider starting with the [domain name glossary](https://devcenter.heroku.com/articles/custom-domains#domain-name-glossary) section, or flipping through Cloudflare’s [How DNS Works](https://www.cloudflare.com/learning/dns/what-is-dns/) series!
:::

To send traffic from a verified domain to your Cloud project, add the records below. Keep in mind that making changes to your DNS *can* result in downtime. Read more about how to [prepare for going live](checklist.md).

The preferred way of routing traffic to Cloud is via a `CNAME` record:

| Record Type | Value |
| --- | --- |
| `CNAME` | `edge.craft.cloud` |

All DNS providers support `CNAME` records on subdomains (like `www`), but some do not accept them at the root or “apex” domain—sometimes called “[`CNAME` flattening](#cname-flattening).”

If your provider does *not* support `CNAME` flattening at the root, you can still connect your domain to Cloud. Instead of the single `CNAME` record, add the two `A` records provided in the **A Record** tab of the **Route Traffic** step.

::: tip
You should never need to use `A` records for subdomains.
:::

The only difference between `A` and `CNAME` records is that—in the unlikely event we add or change edge IPs—you may need to make updates to your DNS configuration. *We will not make this kind of infrastructure change without providing customers a reasonable timeline and clear instructions for making required updates.*

#### CNAME Flattening

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

If your provider does not support CNAME flattening, but you would like to take advantage of it, we recommend switching to Cloudflare before launching on Cloud. When setting up a domain with Cloudflare, they copy all your existing records, and give you an opportunity to tweak them before cutting over.

### Subdomains

Each domain can have any number of subdomains. Subdomains can point to the same environment as the primary domain (great for multi-site projects) or a different environment (perfect for a staging environment).

You may also directly add and verify a non-apex domain if your project will never need to serve traffic from the apex—but we only recommend this in limited circumstances, like when using [rewrites and redirects](redirects.md).

## SSL

Every domain that sends traffic to Craft Cloud is automatically protected with SSL by [Cloudflare](https://cloudflare.com). You do not need to manage certificates, redirection, or any other configuration—Cloud takes care of this for you, at the edge.

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
