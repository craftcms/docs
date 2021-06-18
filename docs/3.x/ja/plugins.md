# プラグイン

プラグインは Craft のコア機能を拡張します。 新しいダッシュボードウィジェット、フィールドタイプ、コントロールパネルセクション、Twig テンプレート機能、ワークフローアクションなどを導入できます。

::: tip
プラグイン _開発_ のためのドキュメントをお探しの場合は、[Craft の拡張](extend/README.md)セクションをチェックしてください。 :::
:::

## プラグインストア

Craft のコントロールパネルはプラグインストアを特徴とし、数百の無料プラグインと商用プラグインをブラウズしたり、ワンクリックでインストールしたり、料金を支払うことができます。

::: tip
If you’ve disallowed admin changes in production, you will only be able to install plugins from the control panel in your local development environment.
:::

プラグインストアにアクセスするためには、Craft のコントロールパネルのナビゲーションにある「プラグインストア」をクリックします。 そこから、様々なプラグインカテゴリや選別されたリストをブラウズして、新しいプラグインを発見できます。

![Craft のプラグインストア](./images/plugin-store.png)

Choose any plugin to learn more about its features, pricing, documentation, version history, and see screenshots of it in action.

![Plugin Store plugin detail page](./images/plugin-store-plugin.png)

## 無料プラグインのインストール

無料プラグインは、「インストール」ボタンをクリックしてインストールできます。 インストールと併せて Craft のステータスを更新する、プラグインのインストールページが表示されます。

## 商用プラグインの試用

Craft が開発ドメイン上で実行されている場合、「試用」ボタンをクリックして商用プラグインを試用版としてインストールできます。 インストールと併せて Craft のステータスを更新する、プラグインのインストールページが表示されます。

## 商用プラグインの購入

商用プラグインを試して購入する準備ができている場合は、 プラグインストアに戻り、ヘッダーにあるカートアイコンをクリックしてください。 カートモーダルの「有効なトライアル」セクションに、プラグインの一覧を確認できます。 「カートに追加」ボタンをクリックして、カートにプラグインを追加し、チェックアウトを続行します。

[Craft ID](https://id.craftcms.com/) アカウントの「Licenses > Plugins」から、すべてのプラグインライセンスを管理できます。

::: tip
If you purchase a plugin license separately from a Craft install or need to update a license key, visit **Settings** → **Plugins** in the relevant site’s control panel. From that listing, you can enter a new key or environment variable placeholder for any commercial plugin.

![プラグインストアの商用ライセンスは、Craft のライセンスモデルに従わなければなりません。](./images/changing-plugin-license-key.gif)
:::

## プラグインライセンスの管理

プラグインベンダーが商用プラグインライセンスとして妥当なレベルのサポートを提供していないと感じる場合は、<support@craftcms.com> にメールを送ってください。

まだ Craft ID アカウントをお持ちでない場合は、[id.craftcms.com/register](https://id.craftcms.com/register) にアクセスしてアカウントを作成できます。

例えば、環境変数 `MY_PLUGIN_KEY` を作成した場合、プラグインのライセンスキーを必要とされる場所でキーの代わりに `$MY_PLUGIN_KEY` を利用できます。

プラグインライセンスが表示されない場合は、「Licenses > Claim License」に移動します。 ライセンスキーを手動で入力するか、購入に利用したメールアドレスを知っている場合は “Claim licenses by email address” セクションにそれを入力できます。 メールアドレスの所有者であることを確認後、 メールアドレスに関連付けられている未使用のライセンスがアカウントに追加されます。

### プラグインライセンスキーの保護

デフォルトでは、プラグインのライセンスキーはデータベースと[プロジェクトコンフィグ](project-config.md)に保存されます。 しかし、ライセンスキーをカスタム PHP 定数 に移動し、`$VARIABLE_NAME` 構文を使ってキーをセットすることもできます。

If you were to create a `MY_PLUGIN_KEY` environment variable, for example, you could then use `$MY_PLUGIN_KEY` in place of the key itself anywhere the plugin license key is required.

## プラグインライセンスの譲渡

プラグインライセンスを他の Craft ID アカウントに譲渡するには、あなたの Craft ID アカウントにログインし、「Licenses > Plugins」で表示されるライセンスを選択し、 “Release License” ボタンをクリックしてアカウントから解放します。 それによって、他の人が Craft ID アカウントの「Licenses > Claim License」ページから自分自身のライセンスを要求できるようになります。

## 商用プラグインのライセンス

これらのルールは、カスタマーに対しプラグインのライセンスを安全かつ予測可能にするとともに、プラグインベンダーにとって持続可能なビジネスモデルを提供することにも役立ちます。

- 開発環境で自由に試すことができますが、本番環境での利用には支払いを必要とします。
- 商用ライセンスは Craft へのインストールごとに1回限り支払う料金で、購入後1年間はアップデートにアクセスできます。
- 追加のアップデートは、年ごとのアップデート料金で入手することができます。
- 質問不要で、ライセンスは購入から30日以内に全額返金することができます。

さらに、プラグインストア内のすべてのプラグインは [MIT ライセンス](https://opensource.org/licenses/MIT) または [Craft ライセンス](https://craftcms.github.io/license/) のいずれかを使用する必要があります。 （一般的に、無料プラグインは MIT ライセンス、商用プラグインは Craft ライセンスを使用します。 ）

Together, these rules make plugin licensing safe and predictable for customers, while also helping provide a sustainable business model for plugin vendors.

## 商用プラグインのサポート

わたしたちは、プラグインベンダーに特定のサポート要件を課すものではありません。 サポートポリシーについて知るためには、ベンダーに確認する必要があります。 そして、何が期待できるかを知ってください。

If you feel that a plugin vendor isn’t providing a reasonable level of support for a commercial plugin license, please let us know by emailing <support@craftcms.com> and letting us know about the situation.
