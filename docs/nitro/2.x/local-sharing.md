# Sharing Sites Locally

By default, the sites created in Nitro are only available on the host machines localhost network, this setup is used to avoid permissions problems with Docker as well as protecting your host machine from potentially unwanted access from other computers. This unfortunately means you cannot access for Nitro sites from another computer on the same network.

::: tip
To share sites over the public internet use the [`share`](commands.md#share) command which utilizes [ngrok](https://ngrok.com/) under the hood.
:::

However, Nitro comes with a [`bridge`](commands.md#bridge) command that analyzes your host machine IPs and creates a “bridged” network on the IP address of your choice. This allows you to share a site on the network with an iPad or other mobile devices for testing!

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

In the above example we are presented with two IP addresses, the first address is for my local network and will allow other computers on my wireless network to access my `http://tutorial.nitro` site using `http://192.168.7.237:8000`.

The additional IP address, which we did not select, is an example IP for my VPN, this allows other devices on my VPN to access the site privately as long as they are connected to the VPN.

::: warning
Some network administrators may not allow Ngrok but also use their own internal Virtual Private Network (VPN)
:::
