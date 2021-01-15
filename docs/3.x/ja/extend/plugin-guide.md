# プラグインの構築方法

## 準備

プラグイン作成に取り組む前に、いくつかのことを決めておく必要があります。

- **パッケージ名** – プラグイン向けに Composer パッケージの名前として使用されます。 （詳細については、[documentation](https://getcomposer.org/doc/04-schema.md#name) を参照してください。 ）これが Craft のプラグインだと識別する手助けになるため、2番目のセグメント（`/` の後）に接頭辞 `craft-` を付けることをお勧めします。 例えば `pixelandtonic/craft-recipes` のような形です。
- **名前空間** – プラグインのクラスが稼働する、ルート名前空間。 （詳細については、[PSR-4](https://www.php-fig.org/psr/psr-4/) オートローディング仕様を参照してください。 ）これは `craft\` ではじめるべき *ではない* ことに注意してください。 あなたやデベロッパーを識別する何かを使用してください。
- **プラグインハンドル** – Craft のエコシステム内でプラグインを一意に識別する何か。 （プラグインハンドルは、文字ではじまり、小文字の英字、数字、および、ダッシュのみでなければなりません。 `kebab-cased` にすべきです。 ）
- **プラグイン名** – コントロールパネル内でプラグインを何と呼ぶか。

## 基本ファイル構造の設定

プラグインを作るため、コンピュータのどこかに新しいディレクトリを作成してください。 一般的なアプローチは、Craft プロジェクトと並ぶ `~/dev/` フォルダに保管することです。

```treeview
~/dev/
├── my-project.test/
│   └── ...
└── my-plugin/
    ├── CHANGELOG.md
    ├── LICENSE.md
    ├── README.md
    ├── composer.json
    └── src/
        └── Plugin.php
```

プラグインディレクトリの名前は、重要ではありません。 簡単に識別できるものを選んでください。

::: tip
数クリックでプラグインの土台を作成できる [pluginfactory.io](https://pluginfactory.io/) を利用してください。
:::

## composer.json

プラグインディレクトリのルートに `composer.json` ファイルを作成し、出発点としてこのテンプレートを使用してください。

```json
{
  "name": "package/name",
  "description": "Your plugin’s package description",
  "type": "craft-plugin",
  "keywords": ["some", "keywords", "here"],
  "license": "MIT",
  "authors": [
    {
      "name": "Developer Name",
      "homepage": "https://developer-website.tld"
    }
  ],
  "support": {
    "email": "email@developer-website.tld",
    "issues": "https://github.com/developer/repo/issues?state=open",
    "source": "https://github.com/developer/repo",
    "docs": "https://github.com/developer/repo/blob/master/README.md"
  },
  "require": {
    "craftcms/cms": "^3.1.0"
  },
  "autoload": {
    "psr-4": {
      "namespace\\prefix\\": "src/"
    }
  },
  "extra": {
    "name": "Plugin Name",
    "handle": "my-plugin-handle"
  }
}
```

次の項目を置き換えてください。

- `package/name` をパッケージ名にします。
- `Developer Name` をあたなの名前、または、プラグインが帰属する組織名にします。
- `https://developer-website.tld` をコントロールパネルの開発者名にリンクするウェブサイトの URL にします。
- `email@developer-website.tld` をサポートのメールアドレスにします。
- `developer/repo` をプラグインが稼働している実際の GitHub アカウントとリポジトリ名にします。
- `master` を GitHub リポジトリの実際のプライマリブランチ名にします。
- ``namespace\\prefix\\` を名前空間接頭辞にします。 （これは JSON であるため、二重バックスラッシュを使用し、最後が``\\` でなければならない点に注意してください。 ）
- `plugin-handle` をプラグインハンドルにします。
- `Plugin Name` をプラグイン名にします。
- [Craft License](https://craftcms.github.io/license/) を使用する計画の場合、`MIT` を `proprietary` にします（「プラグインストアでの配布」ページの[ライセンスの選択](plugin-store.md#choose-a-license)を参照してください）。

[MIT](https://opensource.org/licenses/MIT) よりむしろ [Craft license](https://craftcms.github.io/license/) でプラグインをリリースしたい場合、`license` 値を `"proprietary"` に変更してください。

In addition to `name` and `handle` (which are both required), there are a few other things you can include in that `extra` object:

- `class` – [プラグインクラス](#the-plugin-class)名。 設定されていない場合、インストーラーはそれぞれの `autoload` パスのルートで `Plugin.php` ファイルを探します。
- `description` – プラグインの説明。 設定されていない場合、メインの `description` プロパティが使用されます。
- `developer` – 開発者の名前。 設定されていない場合、（`authors` プロパティ経由で）最初の作者の `name` が使用されます。
- `developerUrl` – 開発者の URL。 設定されていない場合、`homepage` プロパティ、または、（`authors` プロパティ経由で）最初の作者の `homepage` が使用されます。
- `developerEmail` – サポートのメールアドレス。 設定されていない場合、`support.email` プロパティが使用されます。
- `documentationUrl` – プラグインのドキュメントの URL。 設定されていない場合、`support.docs` プロパティが使用されます。

::: warning
If you’re updating a Craft 2 plugin, make sure to remove the `composer/installers` dependency if it has one.
:::

## プラグインクラス

The `src/Plugin.php` file is your plugin’s entry point for the system. It will get instantiated at the beginning of every request. Its `init()` method is the best place to register event listeners, and any other steps it needs to take to initialize itself.

Use this template as a starting point for your `Plugin.php` file:

```php
<?php
namespace mynamespace;

class Plugin extends \craft\base\Plugin
{
    public function init()
    {
        parent::init();

        // Custom initialization code goes here...
    }
}
```

## Craft プロジェクトへのプラグインの読み込み

To get Craft to see your plugin, you will need to install it as a Composer dependency of your Craft project. There are multiple ways to do that:

### Path Repository

During development, the easiest way to work on your plugin is with a [path repository][path], which will tell Composer to symlink your plugin into the `vendor/` folder right alongside other dependencies.

To set it up, open your Craft project’s `composer.json` file and make the following changes:

- [minimum-stability](https://getcomposer.org/doc/04-schema.md#minimum-stability) を `"dev"` に設定します。
- [prefer-stable](https://getcomposer.org/doc/04-schema.md#prefer-stable) を `true` に設定します。
- 新しく [path repository](https://getcomposer.org/doc/05-repositories.md#path) レコードを追加し、プラグインのルートディレクトリを指定します。

```json
{
  "minimum-stability": "dev",
  "prefer-stable": true,
  "repositories": [
    {
      "type": "path",
      "url": "../my-plugin"
    }
  ]
}
```

::: tip
Set the `url` value to the absolute or relative path to your plugin’s source directory. (The `../my-plugin` example value assumes that the plugin lives in a folder alongside the project’s folder.)
:::

In your terminal, go to your Craft project and tell Composer to require your plugin. (Use the same package name you gave your plugin in its `composer.json` file.)

```bash
# go to the project directory
cd /path/to/my-project.test

# require the plugin package
composer require package/name
```

Composer’s installation log should indicate that the package was installed via a symlink:

```
  - Installing package/name (X.Y.Z): Symlinking from ../my-plugin
```

::: warning
One caveat of `path` Composer repositories is that Composer may ignore `path`-based dependencies when you run `composer update`. So any time you change anything in `composer.json`, such as your plugin’s dependency requirements or its plugin information, you might need to completely remove and re-require your plugin in your project for those changes to take effect.

```bash
# go to the project directory
cd /path/to/my-project.test

# remove the plugin package
composer remove package/name

# re-require the plugin package
composer require package/name
```

:::

### Packagist

If you’re ready to publicly release your plugin, register it as a new Composer package on [Packagist](https://packagist.org/). Then you can install it like any other package, by just passing its package name to Composer’s `require` command.

```bash
# go to the project directory
cd /path/to/my-project.test

# require the plugin package
composer require package/name
```

## プラグインアイコン

Plugins can provide an icon, which will be visible on the Settings → Plugins page.

![The Settings → Plugins page in Craft’s control panel.](../images/plugin-index.png)

Plugin icons must be square SVG files, saved as `icon.svg` at the root of your plugin’s source directory (e.g `src/`).

If your plugin has a [control panel section](cp-section.md), you can also give its global nav item a custom icon by saving an `icon-mask.svg` file in the root of your plugin’s source directory. Note that this icon cannot contain strokes, and will always be displayed in a solid color (respecting alpha transparency).

[path]: https://getcomposer.org/doc/05-repositories.md#path
