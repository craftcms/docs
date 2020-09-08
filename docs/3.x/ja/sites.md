- - -
Craft 3では、1つインストールするだけで複数のウェブサイトをホストできます。
- - -

# サイト

ドメインが異なったり、異なるテンプレートセットを使用したり、エントリコンテンツの異なるバージョンを持っている、1つ以上のサイトを定義できます。

You can define one or more sites at different domains, using a different set of templates, and different versions of entry content.

Craft のマルチサイト機能は、同じパブリッシングチームを持つサイトに向いています。 サイトに含めたいセクションだけを有効化できる能力により、エントリレベルでマルチサイトのコンテンツを管理します。

## サイトの作成

Craft のインストールは、1つのデフォルトサイトからはじまります。 サイト名はインストール時に定義され、ハンドルは `default` となります。

それぞれのサイトは、次の属性を持っています。

サイトグループでは、言語や種類などの共通点によってサイトをひとまとめに整理できます。

* グループ
* 名前
* ハンドル
* 言語
* これはプライマリサイトですか？
* ベース URL


### サイトグループ

Craft は（デフォルトサイトの名前を付けた）最初のサイトグループを作成し、そのグループにデフォルトサイトを割り当てます。

フィールドグループに似ていて、サイトグループは整理するためだけにあります。

現在のサイトグループの情報には、次のようにアクセスできます。

サイトの言語を選択すると、日付、時間、および、数字の書式と、翻訳の静的メッセージで使用するための言語を Craft に伝えます。

```twig
Site ID:            {{ currentSite.id }}
Site Handle:        {{ currentSite.handle }}
Site Name:          {{ currentSite.name }}
Site Language:      {{ currentSite.language }}
Is Primary Site?:   {{ currentSite.primary }}
Base URL:           {{ currentSite.baseUrl }}
```


### 言語

Choosing the language for the site tells Craft the language to use when formatting dates, times, and numbers, and translating static messages.

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

where your template name would be, for example, `_share/footer-de`.


### プライマリサイト

Craft はデフォルトサイトをプライマリサイトとしてセットします。 すなわち、どのサイトをロードするか決定できない場合に Craft がフロントエンドのデフォルトとしてロードします。 1つしかサイトがない場合、プライマリサイトを無効にできません。

追加のサイトを作成すると、プライマリサイトを変更できます。 Craft は現在のプライマリサイトを自動的に切り替えます。

### サイト URL

マルチサイトは `https://craftcms.com/` や `https://craftcms.com/de/` のように同じホスト名を共有したり、`https://craftcms.com/` や `https://de.craftcms.com/` のように異なるホスト名を持つこともできます。

Multiple sites can share the same host name, such as `https://craftcms.com/` and `https://craftcms.com/de/`, or they can have different host names, such as `https://craftcms.com/` and `https://de.craftcms.com/`.

異なるホスト名でサイトを作成したい場合、それに対するトラフィックを処理するようサーバーを設定しなければなりません。 ホスト名は現在のサイトと同じウェブルート（`web/`）を指すことも、独自の別のウェブルートにすることもできます。 後者の場合、`.htaccess`、および、`index.php` ファイルを新しいウェブルートへ確実にコピーしてください。

::: tip
`https://site-a.com` と `https://site-b.com` のような異なるルートドメインを使用するマルチサイトを持つ場合、Craft の [license enforcements works](https://craftcms.com/support/license-enforcement) の仕組みによって、_すべて_ のサイトのためにアクセスする Craft コントロールパネルのドメインをその中の1つから選択することができます。
:::

::: warning
サイトのベース URL を定義する場合、`@web` エイリアスを使用しないでください。 それは [cache poisoning](https://www.owasp.org/index.php/Cache_Poisoning) の脆弱性をもたらすことができ、リクエストされたサイトを Craft が確実に判断することができなくなります。
:::

## すべての有効サイトにエントリを広げる

それぞれのチャンネルセクションの設定には、すべてのサイトにエントリを広げるためのオプションがあります。 これはデフォルトで有効になっていて、シングルやストラクチャーセクションでは、必ず有効な状態となります。

セクションのコンテンツをサイトごとに分離したい場合、そのセクションにあるこのオプションを無効にします。

If you would like the section's content to be separate then disable this option for that section.

## ガイド：新しいサイトの設定

これは、Craft で新しいサイトをセットアップするステップを段階的に説明するショートガイドです。 このガイドは、すでに Craft がインストールされていて、デフォルトのセットアップや設定が済んでいることを前提としています。

### ステップ 1：設定でサイトを作成

新しいサイト向けに、テンプレートディレクトリとテンプレートを作成します。

1. 「設定 > サイト」に移動し、「新しいサイト」ボタンをクリックします。
2. ドロップダウンメニューからサイトが所属するグループを選択します。 グループの選択により、サイトの機能に影響することはありません。
3. 名前を付けてください。 Craft はコントロールパネルのサイト名を利用し、`{{ siteName }}` を使ってテンプレート内に表示することもできます。
4. サイト名をベースにして、Craft はサイトのハンドルを生成します。 あなたが望むなら、ハンドルを編集できます。 テンプレート内でこのサイトを参照するために、サイトハンドルを利用します。
5. サイトの言語を選択してください。 （言語の使い方の詳細は、上記を参照してください）
6. このサイトをプライマリサイトにする場合は、「これはプライマリサイトですか？ 」をオンにします。 to enable it.
7. 「このサイトには独自の基本 URL があります」のチェックボックスをオンにし、ベース URL を入力します。 この例では `https://beta.craftcms.com` になります。
8. 新しいサイトを保存します。

### ステップ 2：テンプレートディレクトリの作成

Create the template directories and templates for your new site.

サイトハンドルを名前に付けたテンプレートディレクトリ（例： `templates/default` と `templates/beta`）を持たせることをオススメします。 それぞれのサイトのテンプレートディレクトリに、サイト固有のテンプレートを保管します。

### ステップ 3：サイトのセクションとフィールドのアップデート

1. 新しいサイトで有効にしたいセクションに移動し、「サイト設定」テーブルを利用してサイトを有効にします。
2. 各セクションの新しいサイト向けに、エントリー URI 形式、テンプレート、および、デフォルトのステータスを定義します。
3. すべての有効サイトにエントリを広げるかどうかを選択します。 チェックした場合、Craft はシステム内のすべてのサイトに新しいエントリを作成します。 このオプションがチェックされていない場合、Craft は現在選択されているサイトのみに新しエントリを保存します。

### ステップ 4：フィールドの翻訳方法の定義

デフォルトでは、カスタムフィールドはサイト単位で値を保存します。 本文フィールドがある場合、それぞれのサイトはそのフィールドのコンテンツだけを保存できます。

### ステップ 5：設定のテスト

翻訳方法をセットするには、翻訳したいそれぞれのフィールドに移動し、翻訳方法で適切なオプションを選択します。

### ステップ 6：アセットボリューム設定の確認

If you have any local asset volumes, you will need to make sure those assets are available from each of your sites.

* 「ファイルシステムのパス」設定は、相対的（`uploads/images/`）であるべきです
* URL の設定は、 相対的（`/images`）であるべきです

### ステップ 7：ウェブサーバーと DNS の設定

1. ドメイン（例： `beta.craftcms.com`）が `web` ディレクトリを参照するよう、ウェブサーバーを設定します。 Craft はブラウザがどのサイトを要求しているかを自動的に検出します。
2. ドメインがウェブサーバーを指すよう、DNS レコードをアップデートします。

## Setting Up a Localized Site

This guide will walk you through all of the steps that are typically involved in setting up a localized site using Craft’s multi-site feature and translation support.

### Step 1: Defining Your Sites and Languages

The first step to creating localized site is to decide the languages you need to support. After that, create a new Site in Craft for each supported language using the [guide on configuring a multi-site setup in Craft](sites.md).

### Step 2: Update Your Sections

After creating a new site for a language, enable the new site in each Section. In Settings → Sections, go into each section settings you want included in the localized site and enable the site in the Site Settings. Fill out the Entry URI Format (for Channel and Structure sections) or URI (for Single sections) to reflect how you want the URIs structured for that site.

### Step 3: Define Your Translatable Fields

In Settings → Fields, choose the fields you want to have translatable. Under Translation Method, choose "Translate for each language."

Craft will allow you to update this field's content in each entry on a per-language basis.

### Step 4: Update Your Templates

If you have any templates that you only want to serve from a specific site, you can create a new sub-folder in your templates folder, named after your site's handle, and place the templates in there.

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

### Step 5: Give your authors access to the sites

As soon as you add an additional site to your Craft installation, Craft will start checking for site permissions whenever users try to edit content. By default, no users or groups have access to any site, so you need to assign them.

When you edit a user group or a user account, you will find a new Sites permissions section, which lists all of your sites. Assign them where appropriate.


## Static Message Translations

Most websites and apps will have some UI messages that are hard-coded into the templates or PHP files. These are called “static messages”, because they aren’t being dynamically defined by content in the CMS.

If you’re building a multilingual site or app, then these messages will need to be translatable just like your CMS-driven content.

To do that, Craft employs Yii’s [Message Translations](https://www.yiiframework.com/doc/guide/2.0/en/tutorial-i18n#message-translation) feature, and pre-defines special translation categories:

- `site` is used for messages that belong to the project.
- `app` is used for Craft control panel messages.
- Each plugin gets its own category as well, based on the plugin’s handle.

### Prep Your Messages

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

### Provide the Translations

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

#### Message Parameters

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
