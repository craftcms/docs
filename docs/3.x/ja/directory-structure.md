# ディレクトリ構造

Craft 3 の新しいコピーをダウンロードすると、プロジェクトには次のフォルダやファイルがあります。

### `config/`

すべての Craft とプラグインの[設定ファイル](config/README.md)と `license.key` ファイルを保持します。

::: tip
`web/index.php` に [CRAFT_CONFIG_PATH](config/README.md##craft-config-path) PHP 定数を設定すると、このフォルダの名前や場所をカスタマイズできます。
:::

### `modules/`

サイトで使用している [Yii modules](https://www.yiiframework.com/doc/guide/2.0/en/structure-modules) を保持します。

### `storage/`

ランタイムで動的に生成される一連のファイルを Craft が保管する場所です。

そこにはいくつかのフォルダが含まれます。

- `backups/` – Craft のアップデートやデータベースバックアップユーティリティの実行時に生成される、データベースのバックアップを保管します。
- `logs/` – Craft のログや PHP エラーログを保管します。
- `rebrand/` – アップロードしてある場合、カスタムログインページのロゴとサイトアイコンファイルを保管します。
- `runtime/` – Pretty much everything in here is there for caching and logging purposes. Nothing that Craft couldn’t live without, if the folder happened to get deleted.

For the curious, here are the types of things you will find in `storage/runtime/` (though this is not a comprehensive list):

  - `assets/` – Stores image thumbnails, resized file icons, and copies of images stored on remote asset volumes, to save Craft an HTTP request when it needs the images to generate new thumbnails or transforms.
  - `cache/` – Stores data caches.
  - `compiled_classes/` – Stores some dynamically-defined PHP classes.
  - `compiled_templates/` – Stores compiled Twig templates.
  - `temp/` – Stores temp files.
  - `validation.key` – A randomly-generated, cryptographically secure key that is used for hashing and validating data between requests.

::: tip
You can customize the name and location of this folder by setting the [CRAFT_STORAGE_PATH](config/README.md#craft-storage-path) PHP constant in `web/index.php`.
:::

### `templates/`

Your front-end Twig templates go in here. Any local site assets, such as images, CSS, and JS that should be statically served, should live in the [web](directory-structure.md#web) folder.

::: tip
You can customize the name and location of this folder by setting the [CRAFT_TEMPLATES_PATH](config/README.md#craft-templates-path) PHP constant in `web/index.php`.
:::

### `vendor/`

This is where all of your Composer dependencies go, including Craft itself, and any plugins you’ve installed via Composer.

::: tip
You can customize the name and location of this folder by changing the [CRAFT_VENDOR_PATH](config/README.md#craft-vendor-path) PHP constant in `web/index.php`.
:::

### `web/`

This directory represents your server’s web root. The public `index.php` file lives here and this is where any of the local site images, CSS, and JS that is statically served should live.

::: tip
You can customize the name and location of this folder. If you move it so it’s no longer living alongside the other Craft folders, make sure to update the [CRAFT_BASE_PATH](config/README.md#craft-vendor-path) PHP constant in `<Webroot>/index.php`.
:::

### `.env`

This is your [PHP dotenv](https://github.com/vlucas/phpdotenv) `.env` configuration file. It defines sensitive or environment-specific config values that don’t make sense to commit to version control.

### `.env.example`

This is your [PHP dotenv](https://github.com/vlucas/phpdotenv) `.env` file template. It should be used as a starting point for any actual `.env` files, stored alongside it but out of version control on each of the environments your Craft project is running in.

### `.gitignore`

Tells Git which files it should ignore when committing changes.

### `composer.json`

The starting point `composer.json` file that should be used for all Craft projects. See the [Composer documentation](https://getcomposer.org/doc/04-schema.md) for details on what can go in here.

### `composer.lock`

This is a Composer file that tells Composer exactly which dependencies and versions should be currently installed in `vendor/`.

### `craft`

This is a command line executable used to execute Craft’s [console commands](console-commands.md).
