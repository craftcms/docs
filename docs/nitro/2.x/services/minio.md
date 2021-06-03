# Minio

Nitro ships with Minio, an S3-compatible server for local testing.

## Enabling Minio

To enable Minio, run `nitro enable minio`.

Nitro will prompt you to `apply` the changes. After the changes have been applied the Mino web UI will be available at [https://minio.service.nitro](https://minio.service.nitro).

The default username and password to access the Minio UI are:

**Username**: `nitro`\
**Password**: `nitropassword`

<BrowserShot url="https://minio.service.nitro/minio/test-bucket/" :link="false" caption="Minio’s web interface">
<img src="../images/minio-ui.png" alt="Screenshot of Minio web interface with two example buckets">
</BrowserShot>

## Using Minio

To use Minio in your Craft project you can configure your compontent to use the following settings:

**Hostname**: `minio.service.nitro`\
**Port**: `9000`

::: tip
Always use port 9000 when you’re inside a site’s container, even if you override the default port with an environment variable.
:::

## Disabling Minio

To remove Minio, run `nitro disable minio` and `nitro apply` the changes.

The Minio service [https://minio.service.nitro](https://minio.service.nitro) will be removed from Nitro and your hosts file.

## Overriding Minio’s Default Port

By default, Minio uses port 9000 for its web UI. This port may collide with another service on your machine, in which case you can [customize the default port](../customizing.md#how-to-customize-nitro-s-defaults) via the `NITRO_MINIO_PORT` environment variable:

```
export NITRO_MINIO_PORT=9005
nitro enable minio
```

::: warning
Make sure the Minio service is not enabled before overriding the variables.
:::

The default port is only changed on your *host* machine, not the *internal* port used to connect to Minio from a site container.

