# MinIO

Nitro ships with MinIO, an S3-compatible server for local testing.

## Enabling MinIO

To enable MinIO, run `nitro enable minio`.

Nitro will prompt you to `apply` the changes. After the changes have been applied the Mino web UI will be available at [https://minio.service.nitro](https://minio.service.nitro).

The default username and password to access the MinIO UI are:

**Username**: `nitro`\
**Password**: `nitropassword`

<BrowserShot url="https://minio.service.nitro/minio/test-bucket/" :link="false" caption="MinIO’s web interface">
<img src="../images/minio-ui.png" alt="Screenshot of MinIO web interface with two example buckets">
</BrowserShot>

## Using MinIO

To use MinIO in your Craft project you can configure your compontent to use the following settings:

**Hostname**: `minio.service.nitro`\
**Port**: `9000`

::: tip
Always use port 9000 when you’re inside a site’s container, even if you override the default port with an environment variable.
:::

## Disabling MinIO

To remove MinIO, run `nitro disable minio` and `nitro apply` the changes.

The MinIO service [https://minio.service.nitro](https://minio.service.nitro) will be removed from Nitro and your hosts file.

## Overriding MinIO’s Default Port

By default, MinIO uses port 9000 for its web UI. This port may collide with another service on your machine, in which case you can [customize the default port](../customizing.md#how-to-customize-nitro-s-defaults) via the `NITRO_MINIO_PORT` environment variable:

```
export NITRO_MINIO_PORT=9005
nitro enable minio
```

::: warning
Make sure the MinIO service is not enabled before overriding the variables.
:::

The default port is only changed on your *host* machine, not the *internal* port used to connect to MinIO from a site container.

