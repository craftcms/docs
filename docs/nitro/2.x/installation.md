# Installation Instructions

## Installing Nitro

### macOS and Linux

1. Install [Multipass](https://multipass.run) (requires 1.5.0+).
2. Run this terminal command:

    ```bash
    bash <(curl -sLS http://installer.getnitro.sh)
    ```

3. Follow the prompts to create your machine.

### Windows 10 Pro (with Hyper-V enabled)

::: tip
Windows doesn’t currently have an automated install script, so installation and updating must be done manually.
:::

1. Install [Multipass](https://multipass.run) (requires 1.5.0+).
2. Download `nitro_windows_x86_64.zip` from the latest [release](https://github.com/craftcms/nitro/releases)
3. Create a `Nitro` folder in your home folder, if it does not exist. i.e. `C:\Users\<username>\Nitro`
4. Extract the zip file and copy `nitro.exe` into the `Nitro` folder you just created in your home folder.
5. If this is your first installation, run this from the command line to add `nitro` to your global path: `setx path "%PATH%;%USERPROFILE%\Nitro"`
6. Start the Windows terminal (cmd.exe) with Administrator permissions and run `nitro init` to create your first machine.

Once complete, you will have a Multipass machine called `nitro-dev`, and a new configuration file for the machine stored at `~/.nitro/nitro-dev.yaml`.

## Uninstalling Nitro

To completely remove Nitro, first [destroy](commands.md#destroy) your machine:

```bash
nitro destroy
```

::: tip
If you have multiple machines, you can destroy them all using the `multipass delete` command:

```bash
multipass delete --all -p
```
:::

Then remove your `nitro` command:

::: code
```bash macOS and Linux
sudo rm /usr/local/bin/nitro
```
```bash Windows
rm -rf $HOME/Nitro
```
:::

You can optionally remove your machine configs as well:

::: code
```bash macOS and Linux
rm -rf ~/.nitro
```
```bash Windows
rm -rf $HOME/.nitro
```
:::

If you wish to uninstall Multipass, uninstall instructions can be found on your platform’s installation guide:

- [macOS](https://multipass.run/docs/installing-on-macos)
- [Windows](https://multipass.run/docs/installing-on-windows)
- [Linux](https://multipass.run/docs/installing-on-linux)
