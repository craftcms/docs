# Installation

## Installing Nitro

### macOS

You’ll need to install prereleases manually by downloading the appropriate Nitro binary and telling your system to use it.

1. Install Docker Desktop
    - Intel computers: use [Docker Desktop](https://www.docker.com/products/docker-desktop) 3.0.0 or higher.
    - Apple M1 computers: use [Docker Apple M1 Tech Preview](https://docs.docker.com/docker-for-mac/apple-m1/).
2. Install Nitro
    - either [use Brew](#macos-via-brew)
    - or open a terminal and run `bash <(curl -sLS http://installer.getnitro.sh)`.

### Linux

You’ll need to install prereleases manually by downloading the appropriate Nitro binary and telling your system to use it.

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop) 3.0.0 or higher.
2. Open a terminal and run `bash <(curl -sLS http://installer.getnitro.sh)`.

#### Manual Installation

If you run into issues with the shell script installer, you can manually install Nitro:

1. Visit Nitro’s [GitHub Releases](https://github.com/craftcms/nitro/releases) page and download the archive for your system.
2. Extract the release archive and make the `nitro` executable with `chmod +x ./nitro`.
3. If `/usr/local/bin` does not exist for you, create it with `sudo mkdir -p -m 775 /usr/local/bin && sudo chown $USER: /usr/local/bin`.
4. Move the binary into your path with `sudo mv ./nitro /usr/local/bin`.

Once the `nitro` executable is in place:

4. In your terminal, run `nitro`, choose **Cancel** for the security prompt, and visit **System Preferences** → **Security and Privacy** → **General** to choose **Allow Anyway** next to the warning about `nitro` being blocked.
    - Alternatively, you can strip the automatic quarantine flag:
    ```sh
    xattr -dr com.apple.quarantine /usr/local/bin/nitro
    ```
5. Run `nitro init` and follow the prompts to create your machine.

### macOS via Brew

Using the [Homebrew](https://brew.sh) package manager:

1. Install Docker Desktop:
    ```bash
    # This download does not support Apple M1 computers
    # See above for M1 Docker instructions
    brew install homebrew/cask/docker
    ```
2. Install Nitro:
    ```bash
    brew install craftcms/nitro/nitro
    ```
3. Initialize Nitro
    ```bash
    nitro init
    ```

### Windows

Nitro 2 runs on Windows 10 Home or Pro and requires build 19042 or higher with WSL2.

::: tip
Read [Developing using Nitro and WSL2](windows.md).
:::

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop) 3.0.0 or higher, making sure **Install required Windows components for WSL 2** is checked.
2. [Install WSL2](https://www.windowscentral.com/how-install-wsl2-windows-10).
3. Install the [WSL2 Linux kernel update package](https://docs.microsoft.com/en-us/windows/wsl/install-win10#step-4---download-the-linux-kernel-update-package).
4. In Windows PowerShell, set the default WSL to version 2 using `wsl --set-default-version 2`.
5. Install a WSL2 compatible distro from the Microsoft Store. We recommend [Ubuntu 20](https://www.microsoft.com/en-us/p/ubuntu/9nblggh4msv6).
6. In Docker Desktop, go to **Settings** → **General** and make sure **Use the WSL 2 based engine** is checked.
7. In Docker Desktop, go to **Settings** → **Resources** → **WSL Integration** and make sure WSL is enabled for the distro you installed.
    ::: tip
    If your distro isn’t listed after choosing **Refresh** or restarting Docker Desktop, make sure it’s installed and upgraded to WSL v2. If running `wsl -l -v` lists your distro with a `1` next to it, upgrade with `wsl --set-version [distro name] 2`.
    :::
8. Open the WSL2 terminal. If you installed Ubuntu, for example, it will be listed as “Ubuntu” in the Start Menu.
9. Verify Docker is running inside the distro by running `docker ps`. If Docker is not running you’ll get an error message, otherwise you should see a table for containers even though there aren’t any running yet:
    ```bash
    oli@ubuntu:~$ docker ps
    CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
    oli@ubuntu:~$
    ```
10. From the WSL terminal, run `bash <(curl -sLS http://installer.getnitro.sh)`.

If you run into issues with the shell script installer, you can manually install Nitro:

#### Manual Installation

1. Visit Nitro’s [GitHub Releases](https://github.com/craftcms/nitro/releases) page and use the `nitro_linux_x86_64.tar.gz` inside your WSL2 instance.
2. Extract the release archive and make the `nitro` executable with `chmod +x ./nitro`.
3. If `/usr/local/bin` does not exist for you, create it with `sudo mkdir -p -m 775 /usr/local/bin && sudo chown $USER: /usr/local/bin`.
4. Move the binary into your path with `sudo mv ./nitro /usr/local/bin`.

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
