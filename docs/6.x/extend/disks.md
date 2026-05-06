# Filesystems + Disks

Filesystems in Craft 6.x are a wrapper around Laravel’s [disks](laravel:filesystem) system.
Their primary responsibility is to translate project-config-compatible settings into a valid disk configuration.
Developers can define disks directly via `config/filesystems.php` using any of the natively-supported drivers, or install a filesystem plugin and configure them via the control panel.

Ultimately, asset volumes’ `fsHandle`s may point to a Craft-defined filesystem, or directly to a disk (identified by a `disk:` prefix).
All asset manipulation is handled through a consistent Flysystem interface.

Your filesystem class should now extend `CraftCms\Cms\Filesystem\Filesystems\Filesystem` and implement a `getDiskConfig()` method:

```php
use CraftCms\Cms\Filesystem\Filesystems\Filesystem;
use CraftCms\Cms\Support\Env;

class Backblaze extends Filesystem
{
    // ...

    public function getDiskConfig(): array
    {
        return [
            'driver' => 'b2',
            'bucketId' => Env::parse($this->bucketId),
            'bucketName' => Env::parse($this->bucketName),
            'accountId' => Env::parse($this->accountId),
            'applicationKey' => Env::parse($this->applicationKey),
            'url' => Env::parse($this->url),
            // ...
        ]
    }
}
```

Craft takes care of populating an instance of your filesystem class with incoming settings from the edit screen in the control panel.

::: tip
If your filesystem relies on a non-standard Flysystem adapter, you may need to add it to your `composer.json`. In our example, that would be `gliterd/laravel-backblaze-b2`.
:::

To register a filesystem type, listen for the `\CraftCms\Cms\Filesystem\Events\RegisterFilesystemTypes` event:

```php
Event::listen(function (RegisterFilesystemTypes $event) {
    $event->types->push(Backblaze::class);
});
```

::: tip
If you would like to look at a complete Craft 6.x-ready example, check out our [AWS S3](https://github.com/craftcms/aws-s3/tree/3.x) plugin.
:::
