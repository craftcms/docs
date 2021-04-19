# Upgrading from Nitro 1

Nitro 2 is built on [Docker](https://www.docker.com/products/docker-desktop) instead of Multipass and nearly everything has changed under the hood.

To upgrade, you’ll need to do the following:

1. Back up your databases and [Uninstall Nitro 1](https://craftcms.com/docs/nitro/1.x/installation.html#uninstalling-nitro).
2. Install Nitro 2.
3. Re-add each site and import its related database.

## Back Up Databases and Uninstall Nitro 1

1. Back up databases from the Nitro virtual machine by running `nitro db backup`.
2. Run `nitro info` and note your Nitro machine’s IP address.
3. Once your backups have finished, destroy your Nitro machine with `nitro destroy --skip-backup`.
4. Edit your hosts file (`/etc/hosts` on macOS/Linux and `C:\Windows\system32\drivers\etc\hosts` on Windows) and remove any lines pointing Nitro sites or the IP address from step 1 (e.g. `192.168.7.64 nitro.test`).
5. Optionally uninstall Multipass. (Instructions on the [macOS Installation page](https://multipass.run/docs/installing-on-macos).)

## Install Nitro 2

Follow the [installation instructions](installation.md) for your operating system.

### Allowing Nitro to Run

When running the `nitro` binary for the first time on macOS, you’ll have to allow the file to run under **System Preferences** → **Security and Privacy** → **General** tab.

![Screen Shot 2021-01-07 at 11 23 37 AM](https://user-images.githubusercontent.com/5354908/103917041-24c6cb80-50db-11eb-936d-f3439bf6cf80.png)

You should be able to run `nitro --version` and confirm you’re running Nitro 2:

```
$ nitro --version
nitro version 2.0.0-alpha
```

## Re-Add Sites and Import Databases

Navigate to each project folder and use `nitro add` to set up a Nitro site for it. (Nitro is contextually-aware now so where you run it from matters!) See the [Project Setup](usage.md#adding-a-site-with-nitro-add) page for an example.

If you’d rather mount your entire dev folder, you can edit your `nitro.yaml` file after it’s been initialized. There’s an example of this on the [Project Setup](usage.md#mounting-your-entire-development-folder) page as well.

Once each site is established, run `nitro db import YOUR_FILENAME` and follow the prompts to import each database backup you created before installing Nitro 2.

Run `nitro context` to get the hostname for the appropriate database engine and update your project’s `.env` file to use it.

::: tip
Nitro databases still use `nitro` for the default username and password, but the server will be a hostname instead of an IP address.
:::

## Further Reading

See [Project Setup](usage.md) for an overview of common usage and a look at what’s new.
