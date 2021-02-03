# Installation

## Installing Nitro

### macOS and Linux

::: tip
macOS users can optionally install Nitro [using Brew](#macos-via-brew).
:::

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop) 3.0.0 or higher.
2. Run this terminal command:

    ```bash
    bash <(curl -sLS http://installer.getnitro.sh)
    ```

3. Follow the prompts to create your machine.

### Windows 10

::: danger
Nitro v2 beta currently doesn’t support Windows, but we’re working on it and will have support and guidance before v2 launches.
:::

### macOS via Brew

You can install Nitro with the [Homebrew](https://brew.sh) package manager:

```bash
brew tap craftcms/nitro
brew install craftcms/nitro
```

## Uninstalling Nitro

To completely remove Nitro, first [destroy](commands.md#destroy) your machine:

```bash
nitro destroy
```

Then remove your `nitro` command:

::: code
```bash macOS and Linux
sudo rm /usr/local/bin/nitro
```
```bash Windows
rm -rf $HOME/Nitro
```
:::

You can optionally remove your Nitro config as well:

::: code
```bash macOS and Linux
rm -rf ~/.nitro
```
```bash Windows
rm -rf $HOME/.nitro
```
:::
