# Installation

## Installing Nitro for macOS

1. Install Docker Desktop [Docker Desktop](https://www.docker.com/products/docker-desktop) 3.0.0 or higher.
2. Install Nitro by opening a terminal and running
    ````sh
    bash <(curl -sLS http://installer.getnitro.sh)
    ````

### macOS via Brew

You can alternatively install Nitro using the [Homebrew](https://brew.sh) package manager if you have it installed.

1. Install Docker Desktop:
    ```sh
    brew install homebrew/cask/docker
    ```
2. Install Nitro:
    ```sh
    brew install craftcms/nitro/nitro
    ```
3. Run `nitro init` and follow the prompts to initialize the Nitro environment.

### macOS Manual Installation

If you run into issues with either install method, you can manually install Nitro instead by adding the appropriate binary to your system:

1. Install Docker Desktop [Docker Desktop](https://www.docker.com/products/docker-desktop) 3.0.0 or higher.
2. Visit Nitro’s [GitHub Releases](https://github.com/craftcms/nitro/releases) page and download the archive for your system.
3. Extract the release archive and make `nitro` executable with `chmod +x ./nitro`.
4. Move the binary into your path with `sudo mv ./nitro /usr/local/bin`.
    ::: tip
    If the `/usr/local/bin/` directory doesn’t exist, create it with\
    `sudo mkdir -p -m 775 /usr/local/bin && sudo chown $USER: /usr/local/bin`.
    :::
5. Allow Nitro to be trusted by opening your terminal and either
    - Running `nitro`, choosing **Cancel** for the security prompt, and visiting **System Preferences** → **Security and Privacy** → **General** to choose **Allow Anyway** next to the warning about `nitro` being blocked.
    - Running the following to strip the quarantine flag macOS adds automatically:\
    `xattr -dr com.apple.quarantine /usr/local/bin/nitro`
6. Run `nitro init` and follow the prompts to initialize the Nitro environment.

## Installing Nitro for Linux

1. Install Docker Engine for your distro.
    - [Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
    - [Fedora](https://docs.docker.com/engine/install/fedora/)
    - [Debian](https://docs.docker.com/engine/install/debian/)
    - [CentOS](https://docs.docker.com/engine/install/centos/)
    - [binaries](https://docs.docker.com/engine/install/binaries/)
2. Open a terminal and run `bash <(curl -sLS http://installer.getnitro.sh)`.

::: tip
Make sure you [follow instructions](https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user) to add your user to the `docker` group so you don’t need to run Docker using `sudo`.
:::

### Linux Manual Installation

1. Visit Nitro’s [GitHub Releases](https://github.com/craftcms/nitro/releases) page and use the `nitro_linux_x86_64.tar.gz` bundle.
2. Extract the release archive and make the `nitro` executable with `chmod +x ./nitro`.
3. If `/usr/local/bin` does not exist for you, create it with `sudo mkdir -p -m 775 /usr/local/bin && sudo chown $USER: /usr/local/bin`.
4. Move the binary into your path with `sudo mv ./nitro /usr/local/bin`.
5. Run `nitro init` and follow the prompts to initialize the Nitro environment.

## Installing Nitro for Windows

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


### Windows Manual Installation

If you run into issues with the shell script installer, you can manually install Nitro:

1. Visit Nitro’s [GitHub Releases](https://github.com/craftcms/nitro/releases) page and use the `nitro_linux_x86_64.tar.gz` inside your WSL2 instance.
2. Extract the release archive and make the `nitro` executable with `chmod +x ./nitro`.
3. If `/usr/local/bin` does not exist for you, create it with `sudo mkdir -p -m 775 /usr/local/bin && sudo chown $USER: /usr/local/bin`.
4. Move the binary into your path with `sudo mv ./nitro /usr/local/bin`.
5. Run `nitro init` and follow the prompts to initialize the Nitro environment.

## Uninstalling Nitro

To completely remove Nitro, first [destroy](commands.md#destroy) its Docker networks, containers, and volumes:

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
