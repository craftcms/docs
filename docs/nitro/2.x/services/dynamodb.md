# Adding the Dynamodb Service

Nitro comes with an easy way to setup and configure DynamoDB for local testing.

## Enabling DynamoDB

To enable DynamoDB in Nitro, run the following command:

`nitro enable dynamodb`

Nitro will then prompt you to `apply` the changes. After the changes have been applied DynamoDB will be available at [https://dynamodb.service.nitro](https://dynamodb.service.nitro).

### Using DynamoDB

To use DynamoDB in your Craft project you can configure your compontent to use the following settings:

Hostname: `dynamodb.service.nitro`

Port: `8000`

> Note: The port 8000 will always be the port to use when in a sites container, even if you override the default port using an environment variable.

## Disabling DynamoDB

Removing DynamoDB is as simple as enabling the service. Simply run `nitro disable dynamodb` and `apply` the changes. The DynamoDB service will be removed from Nitro and your hosts file.

## Overiding DynamoDB Default Ports

By default, DynamoDB uses port 8000 but this port may collide with another service on your machine so Nitro includes an easy way to overide the ports.

> Change these ports only affects the ports on the _host_ machine (aka 127.0.0.1:port) and does not change the internal port used to connect to DynamoDB from a Craft installation/container.

You can set the following environment variables in your terminal shell to override the defaults.

> Make sure the DynamoDB service is not enabled before overriding the variables.

`NITRO_DYNAMODB_HTTP_PORT`
