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

### macOS via Brew

You can install Nitro with the [Homebrew](https://brew.sh) package manager:

```bash
brew tap craftcms/nitro
brew install nitro
nitro init
```

### Windows 10

Nitro 2 will run on Windows 10 Home or Pro edition, but it requires build 19042 or higher and WSL2.

1. [Install WSL](https://www.windowscentral.com/how-install-wsl2-windows-10).
2. [Install WSL2](https://docs.microsoft.com/en-us/windows/wsl/install-win10#step-4---download-the-linux-kernel-update-package) update.
3. Set default WSL to version 2 using `wsl --set-default-version 2`.
4. Install a WSL2 compatible distro from the Microsoft Store. We recommend [Ubuntu 20](https://www.microsoft.com/en-us/p/ubuntu/9nblggh4msv6).
5. In Docker Desktop, go to **Settings** → **General** and make sure `Use the WSL 2 based engine` is checked.
6. In Docker Desktop, go to **Settings** → **Resources** → **WSL Integration** and make sure WSL is enabled for the disto you installed in step 4.
7. Open the WSL2 terminal. If you installed Ubuntu, for example, it will be listed as `Ubuntu` in the Start Menu.
8. Verify Docker is running inside the distro by running `docker ps`.
9. Read [Developing using Nitro and WSL2](windows.md).



## Uninstalling Nitro

To completely remove Nitro, first [destroy](commands.md#destroy) your machine:

```bash
nitro destroy
```

### macOS and Linux

Then remove your `nitro` command:

```bash
sudo rm /usr/local/bin/nitro
```

You can optionally remove your Nitro config as well:

```bash macOS and Linux
rm -rf ~/.nitro
```

### macOS via Brew

If you installed Nitro with `brew`:

```bash
brew uninstall nitro
```
