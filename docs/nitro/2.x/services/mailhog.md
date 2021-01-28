# Mailhog (Email Testing)

Nitro comes with an easy way to setup and configure Mailhog for local email testing. To enable Mailhog, run the following command:

## Enabling Mailhog

To enable Mailhog in Nitro, run the following command:

`nitro enable mailhog`

Nitro will then prompt you to `nitro apply` the changes. After the changes have been applied the Mailhog web UI will be available at [https://mailhog.service.nitro](https://mailhog.service.nitro).

### Using Mailhog

MailHog’s ready to be used once it’s running, but it doesn’t change any of your mail settings by default. You can tell Craft or any app to send mail using MailHog’s SMTP settings.

From the Craft control panel, visit Settings → Email and enter the following:

- Transport Type: `SMTP`
- Host Name: `mailhog.service.nitro`
- Port: `1025`
- Use Authentication: Unchecked (default)
- Encryption Method: `None` (default)
- Timeout: `10` (default)

![Mailhog UI](../images/mailhog-ui.png)

::: tip
Note: The SMTP port 1025 will always be the port to use even if you override the default SMTP port using an environment variable.
:::

## Disabling Mailhog

Removing mailhog is as simple as enabling the service. Simply run `nitro disable mailhog` and `apply` the changes. The Mailhog service will be removed from Nitro and your hosts file.

## Overiding Mailhog Default Ports

::: warning
Make sure the Mailhog service is not enabled before overriding the variables.
:::

By default, Mailhog uses port 1025 for SMTP and 8025 for the Web UI. These ports may collide with another service on your machine so Nitro includes an easy way to overide the ports. You can set the following environment variables in your terminal shell to override the defaults.

`NITRO_MAILHOG_SMTP_PORT`

`NITRO_MAILHOG_HTTP_PORT`

::: tip
Change these ports only affects the ports on the _host_ machine (aka 127.0.0.1:port) and does not change the internal port used to connect to Mailhog from a Craft installation/container.
:::
