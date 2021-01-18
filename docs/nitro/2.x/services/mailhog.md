# Adding the Mailhog Service

Nitro comes with an easy way to setup and configure Mailhog for local email testing. To enable Mailhog, run the following command:

## Enabling Mailhog

To enable Mailhog in Nitro, run the following command:

`nitro enable mailhog`

Nitro will then prompt you to `apply` the changes. After the changes have been applied the Mailhog web UI will be available at [https://mailhog.service.nitro](https://mailhog.service.nitro).

### Using Mailhog

To use Mailhog in your Craft project, go to your control panel email settings and switch to SMTP. Enter the following information into the settings fields:

Hostname: `mailhog.service.nitro`

Port: `1025`

> Note: The SMTP port 1025 will always be the port to use even if you override the default SMTP port using an environment variable.

## Disabling Mailhog

Removing mailhog is as simple as enabling the service. Simply run `nitro disable mailhog` and `apply` the changes. The Mailhog service will be removed from Nitro and your hosts file.

## Overiding Mailhog Default Ports

By default, Mailhog uses port 1025 for SMTP and 8025 for the Web UI. These ports may collide with another service on your machine so Nitro includes an easy way to overide the ports.

You can set the following environment variables in your terminal shell to override the defaults.

> Make sure the Mailhog service is not enabled before overriding the variables.

`NITRO_MAILHOG_SMTP_PORT`

`NITRO_MAILHOG_HTTP_PORT`
