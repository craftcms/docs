# プロジェクトコンフィグ

Craft はそれぞれのプロジェクトの設定を**プロジェクトコンフィグ**と呼ばれる中心的な保管場所に維持します。

システム設定に変更を加えると、Craft はそれらの設定値を `config/project/` フォルダの YAML ファイルに記録します。 テンプレートやフロントエンドのリソースのように、それらのファイルを Git リポジトリにコミットできます。

これには2つの利点があります。

1. プロジェクトの状態変化を時間の経過とともに追跡できるようになります。
2. 手動で適用することなく、新しい変更内容を他の開発環境 / ステージング環境 / 本番環境に適用できます。

### プロジェクトコンフィグに保存されるもの

- アセットボリューム、および、名前付けされた画像の変形
- カテゴリグループ
- Craft、および、プラグインのスキーマのバーション
- Craft のエディション
- メールの設定
- フィールド、および、フィールドグループ
- グローバル設定（設定のみ、コンテンツを含みません）
- GraphQL スキーマ、および、パブリックスキーマのアクセス設定
- 行列ブロックのタイプ
- プラグインのエディション、および、設定
- 「設定 > ルート」のルート定義
- セクション、および、入力タイプ
- サイト、および、サイトグループ
- システム名、タイムゾーン、および、システムのステータス（稼働中 / オフライン）
- タググループ
- ユーザー設定、および、ユーザーグループ

::: tip
プラグインがプロジェクトコンフィグに追加情報を保存できます。 どのようにするかを知るには、[プロジェクトコンフィグのサポート](extend/project-config.md)を参照してください。 :::
:::

## 環境のセットアップ

環境をまたいでプロジェクトコンフィグの変更内容を伝播しはじめる前に、それぞれの環境が同じ状態になっていることを確認してください。

1. 最新のデータを持つ、プライマリ環境を選択してください。 （すでに稼働しているプロジェクトの場合、これは本番環境であるべきです。 ）
2. プライマリ環境が Craft の最新版で稼働していることを確認してください。
3. その環境で「ユーティリティ > プロジェクト構成」に移動し、「リビルド」ボタンをクリックして、プロジェクトコンフィグがデータベースのいたるところに保存されている設定と共に最新の状態であることを確認してください。
4. プライマリ環境のデータベースをバックアップしてください。
5. 他の環境では、前のステップで作成したデータベースのバックアップを復元し、`config/project/` フォルダのコンテンツを削除してから、ブラウザでサイトを読み込んで動作確認をしてください。 （Craft は初めてコントロールパネルにアクセスされた際、`config/project/` に YAML ファイルを再生成します。 ）
6. 将来的に[変更内容が予期せず失われること](#production-changes-may-be-forgotten)を防ぐため、開発環境以外のすべての環境でコンフィグ設定 <config3:allowAdminChanges> を無効にしてください。

他の環境に `config/project/` フォルダの変更内容を伝播しはじめる準備ができました。

## 変更内容の伝播

開発環境で変更を加えると、`config/project/` フォルダのコンテンツがその変更内容を反映して更新されていることに気づくでしょう。 テンプレートやフロントエンドのリソースのように、それらのファイルを Git リポジトリにコミットしてください。

::: warning
Don’t make manual changes to your YAML files unless you’re positive you know what you are doing. Manual edits are prone to miss changes in other parts of the project config that should be made simultaneously.
:::

いずれの方法でも、Craft はローカルの `config/project/` フォルダのファイルと既に読み込まれたプロジェクトコンフィグを比較して、見つかった変更内容を取り込みます。

1. コントロールパネルの「プロジェクト構成」ユーティリティから。
2. ターミナルコマンド `php craft project-config/apply` を実行することによって。

プロジェクトコンフィグで作業する場合、注意すべきことがいつくかあります。

::: tip
When [installing Craft](installation.md), any existing configuration in your `config/project/` directory will be applied automatically as long as its Craft and plugin versions match those being installed.
:::

## 注意事項

There are a few things you should keep in mind when working with the project config:

### Composer がいるでしょう

::: tip
`php craft project-config/apply` の前に、必ず `composer install` を実行すると良いでしょう。
:::

それらに矛盾があった場合、Craft がファイルの変更をプロジェクトコンフィグへ同期する前に修正する必要があります。 矛盾が解消されるまでコントロールパネルへのアクセスが拒否されるため、修正する唯一の実用的な方法は `composer install` を実行することです。

::: tip
It’s a good idea to always run `composer install` before `php craft project-config/apply`.
:::

### 機密情報はプロジェクトコンフィグの YAML に保存できます

システムコンポーネントのいくつかは、それらの設定に次のような機密情報を必要とすることがあります。

- メール設定の Gmail / SMTP パスワード
- AWS S3 ボリュームのシークレットアクセスキー

これらの値が YAML ファイルに保存されるのを防ぐには、フィールドに環境変数をセットしていることを確認してください。 詳細については、[環境設定](config/#environmental-configuration)を参照してください。

### 本番環境の変更は忘れられるかもしれません

本番環境でプロジェクトコンフィグの YAML を更新するアップデートが行われた場合、次にプロジェクトがデプロイされ  `config/project/` が上書きされるタイミングで、それらの変更が失われるかもしれません。 そのため、シンプルな Git ベースのデプロイではこれらの変更がコンフリクトの原因となり、デプロイの成功を _妨げる_ でしょう。

To prevent either of these situations, you can set the <config3:allowAdminChanges> これらの状況を防ぐために、`config/general.php` のコンフィグ設定

```php
return [
    '*' => [],
    'production' => [
        // Disable project config changes on production
        'allowAdminChanges' => false,
    ],
];
```

That will remove the UI for administrative settings that affect the project config, and also places the project config in a read-only state so there’s no chance its YAML will be altered.

### 設定データが同期しなくなる可能性があります

手動、または、適切なサービスを利用していないプラグイン / モジュール経由で、プロジェクトコンフィグによって管理されている設定がデータベースの他の場所で変更されている場合、プロジェクトコンフィグはデータベースの値と同期しなくなり、おそらくエラーになるでしょう。 そうなった場合、Craft はプロジェクトコンフィグを修正するために実行できるコンソールコマンドを提供します。

```bash
php craft project-config/rebuild
```

これですべてのプロジェクトコンフィグの値が追加、または、更新されたものとして扱われ、結果的に同期プロセスが長くなり、データベースで優先されることを期待された変更を上書きしてしまう可能性があります。

```bash
php craft project-config/apply
```

プロジェクトのルートにある `.gitignore` ファイルに次の行を加えることで、プロジェクトコンフィグのファイルを他の環境と共有しないようオプトアウトできます。

```bash
php craft project-config/apply --force
```

そして、次のターミナルコマンドを実行し、リポジトリから既存の `config/project/` ファイルをすべて削除します。

## オプトアウト

If you want control over _when_ the project config YAML files are updated, or you want to opt out of saving them altogether, you can configure Craft to stop writing the YAML files automatically as changes are made. To do that, add the following to your `config/app.php` file:

```php
return [
    // ...
    'components' => [
        // ...
        'projectConfig' => function() {
            $config = craft\helpers\App::projectConfigConfig();
            $config['writeYamlAutomatically'] = false;
            return Craft::createObject($config);
        },
    ]
];
```

You can manually trigger YAML file generation from the Project Config utility, or by running the following terminal command:

```bash
git rm -r --cached config/project/\*
git commit -a -m 'Remove project config files'
```

::: warning
If you have YAML files generated, be sure to run the `project-config/write` command before updating Craft and/or plugins. Otherwise the out-of-date YAML files could conflict with project config changes performed by the update migrations.
:::
