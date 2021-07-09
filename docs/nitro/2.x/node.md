# Node & npm

## Installing Dependencies

Nitro’s [`npm`](commands.md#npm) command lets you to run any npm command without having Node or npm installed on your host machine.

```bash
$ cd ~/dev/my-craft-project
$ nitro npm install
  … checking /Users/oli/dev/docs/package.json ✓
  … pulling docker.io/library/node:14-alpine ✓
Running npm install

131 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

npm install complete 🤘
```

### Specifying a Node Version

You can specify a node version for Docker image used by the `npm` command:

```bash
$ nitro npm --version=12 install
```

## Configuring Node Server Ports

If your project runs a node server that needs to be accessed from a web browser, you’ll need to do one of two things:

1. Run the server on your host machine to use whatever ports you’d like. (This means installing node+npm on your machine instead of running it in a Nitro container.)
2. Configure the server to use one of Nitro’s available proxy ports.

Nitro provides ports 3000 and 3001 for each site by default. (You can change these ports using Nitro’s [environment variables](customizing.md#nitro-environment-variables).)

Configuring the server usually means you’ll need to provide the site with a base URL for the node server, and instructing the node server itself to utilize a specific hostname and port.

A webpack configuration using hot module reloading, for example, would need to use port 3000 and `0.0.0.0` instead of `localhost`:

```js
{
  // ...
  devServer: {
    // ...
    port: 3000,
    host: '0.0.0.0',
    // ...
  },
  // ...
}
```

Binding the port to `0.0.0.0` means it will be available on all interfaces, meaning both inside and outside the web container.

::: tip
Depending on your front end build setup, you may also need to provide your site with a base URL for the node server. In this case, it would mean changing `http://localhost:8080` to `http://starterblog.nitro:3000`.
:::