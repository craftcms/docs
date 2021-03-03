# Installation

## Installing Nitro

### macOS and Linux

You’ll need to install prereleases manually by downloading the appropriate Nitro binary and telling your system to use it.

::: tip
macOS users can optionally install Nitro [using Brew](#macos-via-brew).
:::

- Install [Docker Desktop](https://www.docker.com/products/docker-desktop) 3.0.0 or higher.
- Open a terminal and run `bash <(curl -sLS http://installer.getnitro.sh)`.

#### Manual Installation

If you run into issues with the shell script installer, you can manually install Nitro:

- Visit Nitro’s [GitHub Releases](https://github.com/craftcms/nitro/releases) page and download the archive for your system.
- Extract the release archive and make the `nitro` executable with `chmod +x ./nitro`.
- Move the binary into your path with `sudo mv ./nitro /usr/local/bin`.

Once the `nitro` executable is in place:

- In your terminal, run `nitro`, choose **Cancel** for the security prompt, and visit **System Preferences** → **Security and Privacy** → **General** to choose **Allow Anyway** next to the warning about `nitro` being blocked.
    - Alternatively, you can strip the automatic quarantine flag:
    ```sh
    xattr -dr com.apple.quarantine /usr/local/bin/nitro
    ```
- Run `nitro init` and follow the prompts to create your machine.

### macOS via Brew

Using the [Homebrew](https://brew.sh) package manager:

- Install Docker Desktop:
    ```bash
    brew install docker --cask
    ```
- Install Nitro: 
    ```bash
    brew tap craftcms/nitro
    brew install nitro
    nitro init
    ```

### Windows

Nitro 2 runs on Windows 10 Home or Pro and requires build 19042 or higher with WSL2.

::: tip
Read [Developing using Nitro and WSL2](windows.md).
:::

- Install [Docker Desktop](https://www.docker.com/products/docker-desktop) 3.0.0 or higher.
- [Install WSL2](https://www.windowscentral.com/how-install-wsl2-windows-10).
- Install the [WSL2 Linux kernel update package](https://docs.microsoft.com/en-us/windows/wsl/install-win10#step-4---download-the-linux-kernel-update-package).
- Set default WSL to version 2 using `wsl --set-default-version 2`.
- Install a WSL2 compatible distro from the Microsoft Store. We recommend [Ubuntu 20](https://www.microsoft.com/en-us/p/ubuntu/9nblggh4msv6).
- In Docker Desktop, go to **Settings** → **General** and make sure **Use the WSL 2 based engine** is checked.
- In Docker Desktop, go to **Settings** → **Resources** → **WSL Integration** and make sure WSL is enabled for the distro you installed.
- Open the WSL2 terminal. If you installed Ubuntu, for example, it will be listed as “Ubuntu” in the Start Menu.
- Verify Docker is running inside the distro by running `docker ps`.
- From the terminal, run `bash <(curl -sLS http://installer.getnitro.sh)`.

If you run into issues with the shell script installer, you can manually install Nitro:

#### Manual Installation

- Visit Nitro’s [GitHub Releases](https://github.com/craftcms/nitro/releases) page and use the `nitro_linux_x86_64.tar.gz` inside your WSL2 instance.
- Extract the release archive and make the `nitro` executable with `chmod +x ./nitro`.
- Move the binary into your path with `sudo mv ./nitro /usr/local/bin`.

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

```bash macOS
rm -rf ~/.nitro
```

### macOS via Brew

If you installed Nitro with `brew`:

```bash
brew uninstall nitro
```

### Windows

Follow the uninstallation instructions for Linux inside your WSL2 box.
