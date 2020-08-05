# プロジェクトコンフィグ

Craft 3.1 では**プロジェクトコンフィグ**導入されました。 これは開発者が共同作業をしたり、マルチ環境にまたがるサイト変更の展開を容易にする共有可能な設定を保存するものです。

Craft はプロジェクトコンフィグに次の設定を保存します。

- アセットボリューム、および、名前付けされた画像の変形
- カテゴリグループ
- Craft、および、プラグインのスキーマのバーション
- Craft のエディション
- メールの設定
- フィールド、および、フィールドグループ
- グローバル設定（設定のみ、コンテンツを含みません）
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

## プロジェクトコンフィグファイルの有効化

マルチ環境にまたがるプロジェクトコンフィグの共有を開始するには、次のステップに従います。

1. Pick a primary environment that has the most up-to-date data. (If your project is already live, this should be your production environment.)
2. Ensure that your primary environment is running the latest version of Craft.
3. If you were already running Craft 3.1 or later, run `./craft project-config/rebuild` on that environment, to ensure that its project config is up-to-date with config settings stored throughout the database.
4. プライマリ環境の `config/general.php` で <config3:useProjectConfigFile> 設定を有効にしてください。

    ```php
    return [
    '*' => [
        'useProjectConfigFile' => true,
    ],
   ];
    ```

5. プライマリ環境の任意のページをロードすると、Craft は `config/project.yaml` ファイルを生成できます。
6. Backup the database on the primary environment.
7. For all other environments, restore the database backup created in step 6, and save a copy of the `config/project.yaml` file created in step 5.

Craft はプロジェクトコンフィグによって管理される何かが変更されたときはいつでも、 `config/project.yaml` の更新を開始します。 そして、Craft が自身の `project.yaml` が更新されたことを検知するたび（例えば、最近プルされた Git コミットによって変更された場合など）に、その変更がローカルにインストールされた Craft へ伝播されます。

## 注意事項

プロジェクトコンフィグで作業する場合、注意すべきことがいつくかあります。

### Composer があるでしょう

`project.yaml` が変更されたことを Craft が検知すると、ファイルに記述される Craft およびプラグインのバージョンが実際にインストールされているものと互換性があることを確認します。

それらに矛盾があった場合、Craft がファイルの変更をプロジェクトコンフィグへ同期する前に修正する必要があります。 矛盾が解消されるまでコントロールパネルへのアクセスが拒否されるため、修正する唯一の実用的な方法は `composer install` を実行することです。

::: tip
本番環境のダウンタイムを回避するため、デプロイメントワークフローに `composer install` が組み込まれていることを確認する必要があります。 :::
:::

### 機密情報は `project.yaml` に保存できます

システムコンポーネントのいくつかは、それらの設定に次のような機密情報を必要とすることがあります。

- メール設定の Gmail / SMTP パスワード
- AWS S3 ボリュームのシークレットアクセスキー

これらの値が `project.yaml` ファイルに保存されるのを防ぐには、これらの設定を環境変数にセットしていることを確認してください。 詳細については、[環境設定](config/environments.md)を参照してください。

::: tip
`config/volumes.php` でボリューム設定を上書きしている場合、実際の値が `project.yaml` に保存されるのを防ぐために、[getenv()](http://php.net/manual/en/function.getenv.php) を呼び出すのではなく、環境変数に機密値をセットできます。

```php
// Bad:
'secret' => getenv('SECRET_ACCESS_KEY'),

// Good:
'secret' => '$SECRET_ACCESS_KEY',
```

その変更を行ったら、`project.yaml` ファイルが環境変数名で更新されるよう、コントロールパネルのボリュームを再保存します。 :::
:::

### 本番環境の変更は忘れられるかもしれません

本番環境で `project.yaml` を更新するアップデートが行われた場合、次にプロジェクトがデプロイされ `project.yaml` が上書きされるタイミングで、それらの変更が失われるかもしれません。

それを防ぐために、`config/general.php` でコンフィグ設定の <config3:allowAdminChanges> を `false` に設定します。

```php
return [
    '*' => [
        'useProjectConfigFile' => true,
    ],
    'production' => [
        // Disable project config changes on production
        'allowAdminChanges' => false,
    ], 
];
```

それによって、プロジェクトコンフィグに影響を与えるほとんどの管理設定の UI が削除されます。 さらに、プロジェクトコンフィグは読み取り専用状態となるため、`project.yaml` が改竄される可能性がなくなります。

### プラグインはまだサポートしていないかもしれません

メインのプラグイン設定以外の設定を保存しているプラグインは、[プロジェクトコンフィグのサポート](extend/project-config.md)のためのアップデートが必要です。 そのため、それぞれの環境ごとに手動で変更を加える必要がある場合があるかもしれません。

### 設定データが同期しなくなる可能性があります

手動、または、適切なサービスを使用していないプラグイン / モジュール経由で、プロジェクトコンフィグによって管理されている設定がデータベースの他の場所で変更されている場合、プロジェクトコンフィグはデータベースの値と同期しなくなり、おそらくエラーに繋がるでしょう。 そうなった場合、Craft はプロジェクトコンフィグを修正するために実行できるコンソールコマンドを提供します。

```bash
./craft project-config/rebuild
```

One way to keep project config in sync is to version control `project.yaml` and use the console command for syncing any changes with Craft:

```bash
./craft project-config/sync
```

If changes are not being picked up during the sync process, you can use the `--force` option:

```bash
./craft project-config/sync --force
```

This will treat all project config values as added or updated, resulting in a longer sync process and potentially overriding any expected changes that might have been favored in the database.
