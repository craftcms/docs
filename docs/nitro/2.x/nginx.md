# Customizing Nginx

Nitro 2 includes a limited ability to customize a site’s nginx configuration.

You can include a file with any name ending in `nitro.conf` in the root of your project directory to have Nitro pull its nginx configuration when running the [apply](commands.md#apply) command. (If you’ve added the file to an already-running site, delete the container and run `nitro apply` again to have it rebuilt.)

The caveat here is that Nitro may override some of your location statements with its own. This means Nitro will favor anything nginx configuration that comes after [this line](https://github.com/craftcms/nitro/blob/develop/command/apply/internal/nginx/nginx.go#L21:L21) and additional included files [like this one](https://github.com/craftcms/docker/blob/main/nginx/craftcms/general.conf).

So you could add your own new location like this...

```nginx
location ~ ^/testing {
    default_type text/html;
    return 200 'Testing custom config!';
}
```

...but you could _not_ adjust the `location /` directive that hands most URLs off to `index.php` like [this example](https://putyourlightson.com/plugins/blitz#nginx) from the Blitz plugin’s documentation.

This is a known limitation of Nitro 2, and Nitro 3 will support full control over a site’s nginx configuration.
