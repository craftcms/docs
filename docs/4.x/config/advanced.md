# Advanced Settings

There are a few parts of Craft that are configured in a non-standard way, and require special attention.

## Guzzle



## Mutex Configuration

Craft uses a file-based mutex driver by default, which should be switched to a different driver in [load-balanced environments](https://craftcms.com/knowledge-base/configuring-load-balanced-environments#mutex-locks).

::: tip
A [NullMutex](craft4:craft\mutex\NullMutex) driver is used when Dev Mode is enabled, since mutex drivers aren’t necessary for local development and we’ve seen issues with mutex in some Windows and Linux filesystems.
:::

You can configure a custom mutex driver by configuring the `mutex` component’s nested `$mutex` property:

```php
// Use mutex driver provided by yii2-redis
return [
    'components' => [
        'mutex' => [
            'mutex' => yii\redis\Mutex::class,
        ],
    ],
];
```

::: warning
Pay careful attention to the structure, here—we’re only modifying the existing component's `mutex` _property_ and leaving the rest of its config as-is.
:::
