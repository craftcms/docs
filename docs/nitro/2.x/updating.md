# Updating Instructions

Nitro is a CLI that orchestrates Docker containers, so you’ll want to update the CLI binary and use it to bring your environments up to date.

The easiest way to do that depends on how you installed Nitro for your OS.

## macOS, Linux, and Windows Self-Update

If you installed Nitro manually or with the `installer.getnitro.sh` script, use Nitro’s `self-update` command to update the CLI in place. Then use the updated CLI’s `update` command to bring Nitro’s Docker containers up to their latest versions:

```sh
nitro self-update
nitro update
```

::: warning
**Windows users** need to use `sudo` for the self-update command:
```sh
sudo nitro self-update
nitro update
```
:::

::: tip
`self-update` finds the latest stable version of Nitro, but takes a `--dev` argument to include pre-releases:

```sh
nitro self-update --dev
```
:::

## macOS via Brew

If you installed Nitro via Homebrew, you’ll use that to fetch the latest version of the Nitro CLI and then use the updated CLI’s `update` command to bring Nitro’s Docker containers up to their latest versions:

```sh
brew upgrade nitro
nitro update
```

## Troubleshooting

Running the `version` command will output Nitro and Docker versions in use, and suggest running `nitro update` if anything appears out of sync:

```bash
$ nitro version
View the changelog at https://github.com/craftcms/nitro/blob/2.0.0/CHANGELOG.md
Nitro CLI: 	 2.0.0
Nitro gRPC: 	 2.0.0
Docker API: 	 1.41 (1.12 min)
Docker CLI: 	 1.41
The Nitro CLI and gRPC versions do not match
You might need to run `nitro update`
```

If you’re running into issues using the update instructions above, you should be able to follow the [installation instructions](http://localhost:8080/docs/nitro/2.x/installation.html) for your OS.
