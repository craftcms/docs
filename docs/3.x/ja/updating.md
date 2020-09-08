# アップデートガイド

## コントロールパネルからのアップデート

アップデートが可能になると、Craft のアップデート権限を持つユーザーは CP のサイドバーにあるナビゲーション項目「ユーティリティ」の横にバッジを確認できるようになります。 「ユーティリティ」をクリックし、その後「アップデート」を選択します。 デフォルトでインストールされているコントロールパネルのダッシュボードにあるアップデートウィジェットを利用することもできます。

このセクションには、Craft CMS のアップデートとプラグインのアップデートの両方を表示します。 それぞれのアップデートは、それ自身の「アップデート」ボタンを持っています。 クリックすると、 Craft の自動更新プロセスが開始されます。

アップデートページの左上にある「すべてを更新」ボタンを使用して、（アップデート可能な Craft とプラグイン）すべてのアップデートを実行できます。

::: tip
Craft’s [changelog](https://github.com/craftcms/cms/blob/master/CHANGELOG.md) will warn you of any critical changes at the top of the release notes. While there aren’t usually any warnings, it’s always a good idea to check before updating.
:::

## ターミナルからのアップデート

利用可能なアップデートを確認するには、ターミナルで Craft プロジェクトに移動し、次のコマンドを実行してください。

一度にすべてをアップデートするには、次のコマンドを実行します。

```bash
php craft update
```

![update</code> コマンドによるインタラクションの例。](./images/cli-update-info.png)

特定のものをアップデートするには、`all` をそのハンドル（Craft をアップデートするための `craft`、または、プラグインのハンドルのいずれか）に置き換えます。

```bash
php craft update all
```

To update a specific thing, replace `all` with its handle (either `craft` to update Craft, or a plugin’s handle).

```bash
php craft update element-api
```

![update <handle></code> command."](./images/cli-update-plugin.png)

一度に複数のハンドルを渡すこともできます。

```bash
php craft update element-api commerce
```

デフォルトでは、Craft は利用可能な最新バージョンにアップデートします。 特定バージョンにアップデートするには、ハンドルに `:<version>` を追加します。

```bash
php craft update element-api:2.5.4
```

Craft は `composer install` コマンドのように動作する `update/composer-install` コマンドも提供しますが、Composer をインストールする必要はありません。
