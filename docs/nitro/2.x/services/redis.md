# Redis

Nitro comes with an easy way to setup and configure Redis for local testing.

## Enabling Redis

To enable Redis in Nitro, run the following command:

`nitro enable redis`

Nitro will then prompt you to `apply` the changes. After the changes have been applied Redis will be available at [https://redis.service.nitro](https://redis.service.nitro).

## Using Redis

To use Redis in your Craft project you can configure your component to use the following settings:

**Hostname**: `redis.service.nitro`\
**Port**: `6379`

::: tip
The port 6379 will always be the port to use when in a *sites container*, even if you override the default port using an environment variable.
:::

## Disabling Redis

Removing Redis is as simple as enabling the service. Simply run `nitro disable redis` and `apply` the changes. The Redis service will be removed from Nitro and your hosts file.

## Overiding Redis Default Ports

::: warning
Make sure the Redis service is not enabled before overriding the variables.
:::

By default, Redis uses port 6379 but this port may collide with another service on your machine so Nitro includes an easy way to overide the ports. You can set the following environment variables in your terminal shell to override the defaults.

`NITRO_REDIS_HTTP_PORT`

::: tip
Changing these ports only affects the ports on the _host_ machine (aka 127.0.0.1:port) and does not change the internal port used to connect to Redis from a Craft installation/container.
:::
