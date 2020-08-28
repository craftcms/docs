# Deployment

This page touches on deployment tools Craft makes available. See the [Deployment Best Practices](https://craftcms.com/knowledge-base/deployment-best-practices) Knowledge Base article for tips on deploying Craft CMS.

## On and Off Commands

Craft 3.5.8 added `on` and `off` [console commands](console-commands.md) that can be used for temporarily toggling the `system.live` project config value—bypassing any <config3:allowAdminChanges> restrictions—during the deployment process.

Running the following will take the system offline and return 503 responses until it’s switched on again:

```
php craft off
```

The command includes a `--retry` option for setting the [Retry Duration](config3:retryDuration) on those 503 responses:

```
$ php craft off --retry=60
The system is now offline.
The retry duration is now set to 60.
```

::: warning
The <config3:isSystemLive> setting takes precedence over the `system.live` project config value controlled by `on`/`off`, so an explicit `isSystemLive` value `true` or `false` will cause the `on`/`off` commands to error out. If you would like to use these commands, you’ll need to remove the `isSystemLive` setting from `config/general.php`.
:::

## Retry Duration

The <config3:retryDuration> setting can be used to send a [`Retry-After` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After) with all 503 responses.

You can change this setting in `config/general.php` or by navigating to “Settings” → “General” in the control panel and entering a value in the “Retry Duration” field.

By default, the Retry Duration is empty and no `Retry-After` header will be sent.