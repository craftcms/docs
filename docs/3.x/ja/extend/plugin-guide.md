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
  "version": "1.0.0",
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
    "handle": "plugin-handle",
    "name": "Plugin Name",
    "documentationUrl": "https://github.com/developer/repo/blob/master/README.md"
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

`src/Plugin.php` ファイルは、システム向けのプラグインのエントリポイントです。 すべてのリクエスト開始時に、インスタンスが作られます。 `init()` メソッドはイベントリスナーやそれ自体の初期化を必要とする他のステップを登録するのに最適な場所です。

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

Craft にプラグインを表示するには、Craft プロジェクトの Composer 依存としてインストールする必要があります。 そのためには複数の方法があります。

### Path Repository

このテンプレートを `Plugin.php` ファイルの出発点として使用してください。

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
`url` 値にプラグインのソースディレクトリを絶対パスまたは相対パスで設定します。 （サンプルの `../my-plugin` は、プロジェクトフォルダーと並んでプラグインのフォルダが存在することを前提としています。
:::

ターミナル上で Craft プロジェクトへ移動し、Composer にプラグインの追加を伝えてください。 （`composer.json` ファイルでプラグインに付けたパッケージ名と同じものを使用してください。

```bash
# go to the project directory
cd /path/to/my-project.test

# require the plugin package
composer require package/name
```

Composer のインストールログは、シンボリックリンク経由でパッケージがインストールされたことを表示するでしょう。

```
  - Installing package/name (X.Y.Z): Symlinking from ../my-plugin
```

::: warning
`path` Composer リポジトリの難点の1つは、`composer update` を実行した際に Composer が `path` ベースの依存関係を無視することです。 そのため、プラグインの依存要件やプラグインの情報のような `composer.json` の内容に変更を加える際は、それらの変化が効力を発揮するようプロジェクト内のプラグインを完全に削除してから再要求する必要があります。

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

プラグインを一般公開する準備ができたら、新しい Composer パッケージを [Packagist](https://packagist.org/) に登録してください。 そうすれば、Composer の `require` コマンドにパッケージ名を渡すだけで、他のパッケージと同様にインストールできます。

```bash
# go to the project directory
cd /path/to/my-project.test

# require the plugin package
composer require package/name
```

## プラグインアイコン

The Settings → Plugins page in Craft’s Control Panel.

![The Settings → Plugins page in Craft’s control panel.](../images/plugin-index.png)

プラグインは「設定 > プラグイン」ページに表示されるアイコンを提供できます。

プラグインが [コントロールパネルのセクション](cp-section.md) を持つ場合は、プラグインのソースディレクトリのルートに `icon-mask.svg` ファイルを保存することによって、グローバルナビゲーション項目にカスタムアイコンを付けることもできます。 このアイコンにはストロークを含めることができず、常に（アルファ透明度に関して）ソリッドカラーで表示されることに注意してください。
