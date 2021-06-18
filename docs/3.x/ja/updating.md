# アップデートガイド

## コントロールパネルからのアップデート

アップデートが可能になると、Craft のアップデート権限を持つユーザーはコントロールパネルのサイドバーにあるナビゲーション項目「ユーティリティ」の横にバッジを確認できるようになります。 「ユーティリティ」をクリックし、その後「アップデート」を選択します。 デフォルトでインストールされているコントロールパネルのダッシュボードにあるアップデートウィジェットを利用することもできます。

このセクションには、Craft CMS のアップデートとプラグインのアップデートの両方を表示します。 それぞれのアップデートは、それ自身の「アップデート」ボタンを持っています。 Choosing any of those will initiate Craft’s self-updating process.

アップデートページの左上にある「すべてを更新」ボタンを利用して、（アップデート可能な Craft とプラグイン）すべてのアップデートを実行できます。

::: tip
Craft の[更新履歴](https://github.com/craftcms/cms/blob/main/CHANGELOG.md)は、リリースノートの一番上に重要な変更点を警告しています。 大抵は警告がありませんが、アップデートする前にチェックすると良いでしょう。 :::
:::

## ターミナルからのアップデート

Craft 3.0.38 および 3.1.4 では、Craft およびプラグインのアップデートで利用可能な新しい `update` コンソールコマンドが導入されました。

一度にすべてをアップデートするには、次のコマンドを実行します。

```bash
php craft update
```

![update</code> コマンドによるインタラクションの例。](./images/cli-update-info.png)

特定のものをアップデートするには、`all` をそのハンドル（Craft をアップデートするための `craft`、または、プラグインのハンドルのいずれか）に置き換えます。

```bash
php craft update all
```

特定のものをアップデートするには、`all` をそのハンドル（Craft をアップデートするための `craft`、または、プラグインのハンドルのいずれか）に置き換えます。

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
