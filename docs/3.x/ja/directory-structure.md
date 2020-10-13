# ディレクトリ構造

Craft 3 の新しいコピーをダウンロードすると、プロジェクトには次のフォルダやファイルがあります。

### `config/`

すべての Craft とプラグインの[設定ファイル](config/README.md)と `license.key` ファイルを保持します。

::: tip
`web/index.php` に PHP 定数 [CRAFT_CONFIG_PATH](config/README.md#craft-config-path) を設定すると、このフォルダの名前や場所をカスタマイズできます。
:::

### `modules/`

サイトで利用している [Yii モジュール](https://www.yiiframework.com/doc/guide/2.0/en/structure-modules) を保持します。

### `storage/`

ランタイムで動的に生成される一連のファイルを Craft が保管する場所です。

そこにはいくつかのフォルダが含まれます。

- `backups/` – Craft のアップデートやデータベースバックアップユーティリティの実行時に生成される、データベースのバックアップを保管します。
- `logs/` – Craft のログや PHP エラーログを保管します。
- `rebrand/` – アップロードしてある場合、カスタムログインページのロゴとサイトアイコンファイルを保管します。
- `runtime/` – ここにあるすべては、おおよそキャッシングやロギングを目的とするものです。もしフォルダが削除されたとしても、Craft の稼働に影響はありません。

   興味がある方のために、（包括的なリストではありませんが）`storage/runtime/` で確認できるものを掲載します。

   - `assets/` – 新しいサムネイルやトランスフォームの生成にあたり画像が必要なときに Craft の HTTP リクエストを節約する目的で、画像サムネイル、リサイズされたファイルのアイコン、リモートアセットボリュームに保存された画像のコピーを保管します。
   - `cache/` – データキャッシュを蓄積します。
   - `compiled_classes/` – いくつかの動的に定義された PHP クラスを保管します。
   - `compiled_templates/` – コンパイル済みのテンプレートを保管します。
   - `mutex/` – ファイルロックデータを保管します。
   - `temp/` – 一時ファイルを保管します。
   - `validation.key` – リクエスト間のハッシングやデータ検証に使われる、ランダムに生成され、暗号的に安全な鍵です。

::: tip
`web/index.php` に PHP 定数 [CRAFT_STORAGE_PATH](config/README.md#craft-storage-path) を設定すると、このフォルダの名前や場所をカスタマイズできます。
:::

### `templates/`

フロントエンド向けのテンプレートがここに入ります。静的に配信する画像、CSS、JS などのローカルサイトのアセットは、[web](directory-structure.md#web) フォルダに保存します。

::: tip
`web/index.php` に PHP 定数 [CRAFT_TEMPLATES_PATH](config/README.md#craft-templates-path) を設定すると、このフォルダの名前や場所をカスタマイズできます。
:::

### `vendor/`

これは Composer で依存関係にあるすべてのもので、Craft 自身や Composer 経由でインストールしたすべてのプラグインが含まれます。

::: tip
`web/index.php` の PHP 定数 [CRAFT_VENDOR_PATH](config/README.md#craft-vendor-path) を変更すると、このフォルダの名前や場所をカスタマイズできます。
:::

### `web/`

このディレクトリはサーバーのウェブルートを表します。パブリックの `index.php` ファイルがここにあり、静的に配信されるローカルサイトの画像、CSS、JS などがあります。

::: tip
このフォルダの名前や場所をカスタマイズできます。もし、他の Craft フォルダと並んでいる状態から移動するならば、`<Webroot>/index.php` の PHP 定数 [CRAFT_BASE_PATH](config/README.md#craft-vendor-path) を確実に更新してください。
:::

### `.env`

[PHP dotenv](https://github.com/vlucas/phpdotenv) の `.env` 設定ファイルです。バージョン管理でコミットする必要のない、機密性が高い、または、特定の環境に依存する設定値を定義します。

### `.env.example`

[PHP dotenv](https://github.com/vlucas/phpdotenv) の `.env` ファイルのひな形です。実際の `.env` ファイルの出発点として使用されるべきです。ファイルとして保存されていますが、稼働している Craft プロジェクトの各環境のバージョン管理からは除外してください。

### `.gitignore`

変更をコミットするときに、無視するファイルを Git に伝えます。

### `composer.json`

すべての Craft プロジェクトで使用されるべき、出発点の `composer.json` ファイルです。詳細については、[Composer のドキュメント](https://getcomposer.org/doc/04-schema.md) を参照してください。

### `composer.lock`

これは `vendor/` へ現在インストールされている依存関係やバージョンを Composer へ正確に伝える Composer ファイルです。

### `craft`

これは、Craft の[コンソールコマンド](console-commands.md)を実行するために利用する、コマンドライン実行可能プログラムです。
