# Sharing Sites Locally

By default, your Nitro sites are only available to the machine you’re on. This avoids permissions problems with Docker and protects your development projects from potentially-unwanted access from other computers.

You can, however, make your Nitro sites available to other computers on your local network using Nitro’s [`bridge`](commands.md#bridge) command. It analyzes your host machine IPs and creates a “bridged” network on the IP address of your choice. This allows you to share a site on the network with an iPad or other mobile devices for testing.

::: tip
You can share sites over the public internet using the [`share`](commands.md#share) command.
:::

In this example, Nitro suggests two IP addresses after looking at the user’s network. The first is a new address on the local wireless network, and the second is for a VPN. Because the selected options, Nitro will ultimately make `http://tutorial.nitro` available to other LAN users via `http://192.168.7.237:8000`.

You may not use a VPN or wireless connection, so Nitro will only show you suggestions relevant to *your* networking configuration.

```bash
$ nitro bridge
Which IP address should we use for the bridge?
  1. 192.168.7.237
  2. 100.70.187.121
Enter your selection: 1
Select a site:
  1. tutorial.nitro
  2. plugins-dev.nitro
Enter your selection: 1
bridge server listening on http://192.168.7.237:8000
```

::: warning
Some network administrators may not allow ngrok but also use their own internal Virtual Private Network (VPN)
:::
