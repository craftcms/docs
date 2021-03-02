# Updating Instructions

The process of updating Nitro is broken into two parts. The first part is updating Nitro CLI, or binary, which is the tool used on the command line to interact with your sites, databases, and Docker API. Updating the Nitro CLI can be performed through different steps depending on your installation and Operating System.

## macOS Brew

If you installed Nitro with Homebrew on macOS, you can use Brew to fetch the latest version of Nitro. Simply run the following command:

```shell
brew update
```

## macOS and Linux Manual Command

TODO

## macOS and Linux Self Update Command

Nitro ships with the `nitro self-update` command to allow the nitro binary to update itself. The `self-update` command takes an optional `--dev` to allow users to easily test pre-release versions of Nitro. To update to the latest stable version of nitro run:

```shell
nitro self-update
```

To update to a pre-release version run:

```shell
nitro self-update --dev
```

## Updating the Docker Images

After you update your `nitro` command line tool to the latest version, new changes also need to be applied to your Docker environment. To update the Docker environment, run need to run [`nitro update`](commands.md#update):

```bash
nitro update
```

This will pull the latest Docker images for PHP as well as the Nitro Proxy which is used for routing, local certificates, database management and etc.
