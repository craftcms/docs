# Customizing Defaults

Nitro exposes a variety of ports and settings for you to customize using environment variables.

::: tip
**Looking to adjust resources?**\
Nitro uses whatever CPU, memory, and disk settings you’ve set for Docker. You can adjust these in Docker Desktop’s Resources panel and Nitro will automatically use them after Docker restarts.
:::

## How to Customize Nitro’s Defaults

Let’s say you’re running another local development environment and the [`portcheck`](commands.md#portcheck) command confirms port 80 (http) is already in use:

```
$ nitro portcheck 80
Port 80 is already in use...
```

Port 8080 seems like a fun, cool alternative so we’ll see if that’s available:

```
$ nitro portcheck 8080
Port 8080 is available!
```

Now we can use a shell environment variable setting Nitro’s http port to 8080:

```
export NITRO_HTTP_PORT=8080
```

::: tip
If the value contains whitespace, wrap it in quotes (`"`).
:::

Now run the [`init`](commands.md#init) command:

```
nitro init
```

If you already ran `nitro init` and configured Nitro earlier, you can open Docker desktop, delete the relevant container—in this case `nitro-proxy`—and re-run `nitro init`. The container will be rebuilt and bind itself to our custom port.

Since we used `export NITRO_HTTP_PORT`, we only set the value for our current terminal session. To have it persist, we can add it to our default shell profile:

```
echo 'export NITRO_HTTP_PORT=8080' >> ~/.zshrc
```

## Nitro Environment Variables

The table below details every environment variable you can use to customize Nitro, what it’s used for, whatever its default value is, and which container—if any—you’ll need to reinitialize for your customization to take effect.

| Environment Variable      | Used By                                           | Default     | Container                |
| ------------------------- | ------------------------------------------------- | ----------- | ------------------------ |
| `NITRO_HTTP_PORT`         | http URLs                                         | `80`        | `nitro-proxy`            |
| `NITRO_HTTPS_PORT`        | https URLs                                        | `443`       | `nitro-proxy`            |
| `NITRO_API_PORT`          | gRPC                                              | `5000`      | `nitro-proxy`            |
| `NITRO_DEFAULT_TLD`       | TLD for auto-suggested site hostnames             | `nitro`     | n/a                      |
| `NITRO_EDIT_HOSTS`        | Attempt to edit hosts file when applying changes? | `true`      | n/a                      |
| `NITRO_MAILHOG_SMTP_PORT` | MailHog SMTP                                      | `1025`      | `mailhog.service.nitro`  |
| `NITRO_NODE_PORT`         | node port                                         | `3000`      | `nitro-proxy`            |
| `NITRO_NODE_ALT_PORT`     | Alternate node port                               | `3001`      | `nitro-proxy`            |
| `NITRO_MAILHOG_HTTP_PORT` | MailHog web interface                             | `8025`      | `mailhog.service.nitro`  |
| `NITRO_DYNAMODB_PORT`     | DynamoDB server port                              | `8000`      | `dynamodb.service.nitro` |
| `NITRO_MINIO_PORT`        | MinIO web interface and API                       | `9000`      | `minio.service.nitro`    |
| `NITRO_REDIS_PORT`        | Redis server port                                 | `6379`      | `redis.service.nitro`    |
