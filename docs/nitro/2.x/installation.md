# Installation

## Installing Nitro

### macOS and Linux

You’ll need to install prereleases manually by downloading the appropriate Nitro binary and telling your system to use it.

::: tip
macOS users can optionally install Nitro [using Brew](#macos-via-brew).
:::

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop) 3.0.0 or higher.
2. Visit Nitro’s [GitHub Releases](https://github.com/craftcms/nitro/releases) page and download the archive for your system.
3. Extract the release archive and make the Nitro binary executable with `chmod +x ./nitro`.
4. Move the binary into your path with `sudo mv ./nitro /usr/local/bin`.
5. In your terminal, run `nitro`, choose **Cancel** for the security prompt, and visit **System Preferences** → **Security and Privacy** → **General** to choose **Allow Anyway** next to the warning about `nitro` being blocked. (Alternatively, you can strip the automatic quarantine flag using `xattr -dr com.apple.quarantine /usr/local/bin/nitro`.)
5. Run `nitro init` and follow the prompts to create your machine.

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
