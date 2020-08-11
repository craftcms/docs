# Updating Instructions

If you’ve already installed Nitro and would like to update to the latest version, you’ll need to run [`nitro self-update`](commands.md#self-update) and [`nitro refresh`](commands.md#refresh):

```
nitro self-update
nitro refresh
```

::: warning
If you’re running Windows, you’ll need to perform a [manual installation](install.md).
:::

## Upgrading to Nitro 0.10.0

If you are updating from Nitro 0.9 or earlier, you will need to rename your current `~/.nitro/nitro.yaml` file based
on the name of your primary machine name. (If you can’t remember what that is, open up the file and check its `name`
value.)

```sh
cd ~/.nitro
mv nitro.yaml <machine-name>.yaml
```

If your primary machine name was something besides `nitro-dev`, you will need to define a `NITRO_DEFAULT_MACHINE`
environment variable on your system, so Nitro knows which machine to work with by default. For example on macOS or
Unix/Linux systems, you can open your `~/.bash_profile` file (or `.zprofile` if using zsh) and add this to it:

```bash
export NITRO_DEFAULT_MACHINE="<machine-name>"
```

Then paste the same line into your terminal, or restart it for the profile change to take effect.

If you created any additional machines, you will need to move their configuration files over to `~/.nitro` as well:

```sh
mv /path/to/project/nitro.yaml ~/.nitro/<machine-name>.yaml
```
