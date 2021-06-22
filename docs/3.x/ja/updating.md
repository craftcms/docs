# アップデートガイド

## コントロールパネルからのアップデート

When an update is available, users with the permission to update Craft will see a badge in the control panel next to **Utilities** in the main navigation. Click **Utilities**, then **Updates**. (You can also get to this view directly from the **Updates** widget that’s installed by default in the control panel dashboard.)

This section displays updates for Craft CMS plugins, each with its own **Update** button. Choosing any of those will initiate Craft’s self-updating process.

You can choose **Update All** at the top left to initiate all available Craft and/or plugin updates at once.

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
