- - -
Craft 3では、1つインストールするだけで複数のウェブサイトをホストできます。
- - -

# サイト

ドメインが異なったり、異なるテンプレートセットを使用したり、エントリコンテンツの異なるバージョンを持っている、1つ以上のサイトを定義できます。

ドメインが異なったり、異なるテンプレートセットを使用したり、エントリコンテンツの異なるバージョンを持っている、1つ以上のサイトを定義できます。

Craft のマルチサイト機能は、同じパブリッシングチームを持つサイトに向いています。 サイトに含めたいセクションだけを有効化できる能力により、エントリレベルでマルチサイトのコンテンツを管理します。

## サイトの作成

Craft のインストールは、1つのデフォルトサイトからはじまります。 サイト名はインストール時に定義され、ハンドルは `default` となります。

サイトを追加するには、「設定 > サイト」を使用します。

サイトグループでは、言語や種類などの共通点によってサイトをひとまとめに整理できます。

- グループ
- 名前
- ハンドル
- 言語
- これはプライマリサイトですか？
- ベース URL


### サイトグループ

Craft は（デフォルトサイトの名前を付けた）最初のサイトグループを作成し、そのグループにデフォルトサイトを割り当てます。

Craft は（デフォルトサイトの名前を付けた）最初のサイトグループを作成し、そのグループにデフォルトサイトを割り当てます。

In addition to organization, Site Groups can be used in a section’s Propagation Method. By selecting **Save entries to other sites in the same group**, Craft will only propagate that section’s new entries to sites in the same group.

現在のサイトグループの情報には、次のようにアクセスできます。

```twig
Site ID:            {{ currentSite.id }}
Site Handle:        {{ currentSite.handle }}
Site Name:          {{ currentSite.name }}
Site Language:      {{ currentSite.language }}
Is Primary Site?:   {{ currentSite.primary }}
Base URL:           {{ currentSite.baseUrl }}
```


### 言語

サイトの言語を選択すると、日付、時間、および、数字の書式と、翻訳の静的メッセージで使用するための言語を Craft に伝えます。

テンプレート内では、`craft.app.language` 経由で言語設定にアクセスすることもできます。 これを条件文で使えます。

```twig
{% if craft.app.language == 'de' %}
  <p>Guten Tag!</p>
{% endif %}
```

この例では、読み込まれるテンプレート名は `_share/footer-de` になります。

```twig
{% include '_share/footer-' ~ craft.app.language %}
```

この例では、読み込まれるテンプレート名は `_share/footer-de` になります。


### プライマリサイト

Craft はデフォルトサイトをプライマリサイトとしてセットします。 すなわち、どのサイトをロードするか決定できない場合に Craft がフロントエンドのデフォルトとしてロードします。 1つしかサイトがない場合、プライマリサイトを無効にできません。

追加のサイトを作成すると、プライマリサイトを変更できます。 Craft は現在のプライマリサイトを自動的に切り替えます。

### サイト URL

Each site has a Base URL Craft uses to generate links to entries and other site content.

マルチサイトは `https://craftcms.com/` や `https://craftcms.com/de/` のように同じホスト名を共有したり、`https://craftcms.com/` や `https://de.craftcms.com/` のように異なるホスト名を持つこともできます。

異なるホスト名でサイトを作成したい場合、それに対するトラフィックを処理するようサーバーを設定しなければなりません。 ホスト名は現在のサイトと同じウェブルート（`web/`）を指すことも、独自の別のウェブルートにすることもできます。 後者の場合、`.htaccess`、および、`index.php` ファイルを新しいウェブルートへ確実にコピーしてください。

::: tip
If you have multiple sites using different root domains like `https://site-a.com` and `https://site-b.com`, with the way Craft’s [license enforcements works](https://craftcms.com/support/license-enforcement), you’ll want to pick one of the domains to access the Craft control panel from for _all_ sites.
:::

::: tip
If your primary site’s Base URL includes a subdirectory (i.e. `https://foo.dev/bar/`), you should set the [baseCpUrl](config3:baseCpUrl) config setting.
:::

::: warning
Careful using the `@web` alias to define your sites’ Base URLs.  
You should explicitly override the alias to avoid introducing a [cache poisoning](https://www.owasp.org/index.php/Cache_Poisoning) vulnerability, and to make sure Craft can reliably determine which site is being requested. See [Aliases](config/#aliases) for an example.
:::

## すべての有効サイトにエントリを広げる

In the settings for each Channel Section is an option to propagate entries in that section across all sites. This is enabled by default, and is the only option for Single sections.

When enabled, Craft will create the new entry in each site enabled for that section using the submitted content.

If you would like the section's content to be separate then disable this option for that section.

## ガイド：新しいサイトの設定

In this short guide we'll walk through the steps of setting up a new site in Craft. This guide assumes you already have Craft installed and the default site setup and configured.

### ステップ 1：設定でサイトを作成

The first step is to create the new site in the Settings of your Craft installation.

1. Go to **Settings** → **Sites** and press **New Site**.
2. ドロップダウンメニューからサイトが所属するグループを選択します。 グループの選択により、サイトの機能に影響することはありません。
3. 名前を付けてください。 Craft はコントロールパネルのサイト名を利用し、`{{ siteName }}` を使ってテンプレート内に表示することもできます。
4. サイト名をベースにして、Craft はサイトのハンドルを生成します。 あなたが望むなら、ハンドルを編集できます。 テンプレート内でこのサイトを参照するために、サイトハンドルを利用します。
5. サイトの言語を選択してください。 （言語の使い方の詳細は、上記を参照してください）
6. このサイトをプライマリサイトにする場合は、「これはプライマリサイトですか？ 」をオンにします。 これで、有効になります。
7. 「このサイトには独自の基本 URL があります」のチェックボックスをオンにし、ベース URL を入力します。 この例では `https://beta.craftcms.com` になります。
8. 新しいサイトを保存します。

### ステップ 2：テンプレートディレクトリの作成

Create the template directories and templates for your new site.

We recommend you have template directories named after the sites handles (e.g. `templates/default` and `templates/beta`). You store the site-specific templates in each site template directory.

### ステップ 3：サイトのセクションとフィールドのアップデート

1. 新しいサイトで有効にしたいセクションに移動し、「サイト設定」テーブルを利用してサイトを有効にします。
2. 各セクションの新しいサイト向けに、エントリー URI 形式、テンプレート、および、デフォルトのステータスを定義します。
3. すべての有効サイトにエントリを広げるかどうかを選択します。 チェックした場合、Craft はシステム内のすべてのサイトに新しいエントリを作成します。 このオプションがチェックされていない場合、Craft は現在選択されているサイトのみに新しエントリを保存します。

### ステップ 4：フィールドの翻訳方法の定義

By default, custom fields are set to store the same value across all sites. If any fields should have unique values across your sites, then you will need to edit their [Translation Method](fields.md#translation-methods) settings.

### ステップ 5：設定のテスト

Using new or existing entries, test that the Section, Field, and Translation Method settings work as you expect.

### ステップ 6：アセットボリューム設定の確認

If you have any local asset volumes, you will need to make sure those assets are available from each of your sites.

- 「ファイルシステムのパス」設定は、相対的（`uploads/images/`）であるべきです
- URL の設定は、 相対的（`/images`）であるべきです

### ステップ 7：ウェブサーバーと DNS の設定

1. ドメイン（例： `beta.craftcms.com`）が `web` ディレクトリを参照するよう、ウェブサーバーを設定します。 Craft はブラウザがどのサイトを要求しているかを自動的に検出します。
2. ドメインがウェブサーバーを指すよう、DNS レコードをアップデートします。

## ローカライズされたサイトの設定

This guide will walk you through all of the steps that are typically involved in setting up a localized site using Craft’s multi-site feature and translation support.

### ステップ 1：サイトと言語の定義

The first step to creating localized site is to decide the languages you need to support. After that, create a new Site in Craft for each supported language.

### ステップ 2：セクションのアップデート

After creating a new site for a language, enable the new site in each Section. In **Settings** → **Sections**, go into each section settings you want included in the localized site and enable the site in the Site Settings. Fill out the Entry URI Format (for Channel and Structure sections) or URI (for Single sections) to reflect how you want the URIs structured for that site.

### ステップ 3：翻訳可能なフィールドの定義

In **Settings** → **Fields**, choose the fields you want to have translatable. Under **Translation Method**, choose **Translate for each language**.

Craft will allow you to update this field’s content in each entry on a per-language basis.

### ステップ 4：テンプレートのアップデート

If you have any templates that you only want to serve from a specific site, you can create a new subfolder in your templates folder, named after your site's handle, and place the templates in there.

For example, if you wanted to give your German site its own homepage template, you might set your templates folder up like this:

```treeview
templates/
├── index.twig (default homepage template)
└── de/
    └── index.twig (German homepage template)
```

Use `craft.app.language` to toggle specific parts of your templates, depending on the language:

```twig
{% if craft.app.language == 'de' %}
  <p>I like bread and beer.</p>
{% endif %}
```

You can also take advantage of Craft’s [static translation](#static-message-translations) support for strings throughout your templates.

```twig
{{ "Welcome!"|t }}
```

### ステップ 5：投稿者にサイトへのアクセス権を付与

As soon as you add an additional site to your Craft installation, Craft will start checking for site permissions whenever users try to edit content. By default, no users or groups have access to any site, so you need to assign them.

When you edit a user group or a user account, you will find a new Sites permissions section, which lists all of your sites. Assign them where appropriate.


## 静的メッセージの翻訳

Most websites and apps will have some UI messages that are hard-coded into the templates or PHP files. These are called “static messages”, because they aren’t being dynamically defined by content in the CMS.

If you’re building a multilingual site or app, then these messages will need to be translatable just like your CMS-driven content.

To do that, Craft employs Yii’s [Message Translations](https://www.yiiframework.com/doc/guide/2.0/en/tutorial-i18n#message-translation) feature, and pre-defines special translation categories:

- `site` はプロジェクトに属するメッセージに使用されます。
- `app` はコントロールパネルのメッセージに使用されます。
- それぞれのプラグインは、プラグインのハンドルに基づいて独自のカテゴリも取得します。

### メッセージの準備

The first step is to run all of your static messages through the translator. If you’re working on a template, use the [translate](dev/filters.md#translate-or-t) filter (`|t`). If you’re working in PHP code, use [Craft::t()](yii2:yii\BaseYii::t()).

::: code
```twig
{# old #}
<a href="/contact">Contact us</a>

{# new #}
<a href="/contact">{{ 'Contact us'|t }}</a>
```
```php
// old
echo 'Contact us';

// new
echo Craft::t('site', 'Contact us');
```
:::

### 翻訳の提供

Once you’ve prepped a message for translations, you need to supply the actual translation.

To do that, create a new folder in your project’s base directory called `translations/`, and within that, create a new folder named after the target language’s ID. Within that, create a file named after the translation category you want to create massages for (`site.php` for project messages, `app.php` to overwrite Craft's control panel messages, or `<plugin-handle>.php` to overwrite a plugin’s messages).

For example, if you want to translate your project’s messages into German, this is what your project’s directory structure should look like:

```treeview
my-project.test/
├── config/
├── ...
└── translations/
    └── de/
        └── site.php
```

Now open `site.php` in a text editor, and have it return an array that maps the source messages to their translated messages.

```php
<?php

return [
    'Contact us' => 'Kontaktiere uns',
];
```

Now, when Craft is processing the message translation for a German site, “Contact us” will be replaced with  “Kontaktiere uns”.

#### メッセージパラメータ

Static messages can have [placeholder values](https://www.yiiframework.com/doc/guide/2.0/en/tutorial-i18n#message-parameters). For example:

```php
<?php

return [
    'Welcome back, {name}' => 'Willkommen zurück {name}',
];
```

To replace the placeholder values with dynamic values when translating the message, pass the `params` argument when using the [translate](dev/filters.md#translate-or-t) filter or calling [Craft::t()](yii2:yii\BaseYii::t()):

::: code
```twig
<a href="/contact">{{ 'Welcome back, {name}'|t(params = {
  name: currentUser.friendlyName,
}) }}</a>
```
```php
echo Craft::t('site', 'Welcome back, {name}', [
    'name' => Craft::$app->user->identity->friendlyName,
]);
```
:::
