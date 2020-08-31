- - -
keywords: multi multisite multilingual translation
- - -

# サイト

In Craft 3 you can host multiple websites in a single Craft installation.

You can define one or more sites at different domains, using a different set of templates, and different versions of entry content.

The multi-site feature in Craft is for sites with the same publishing team. You manage the multi-site content at the entry level, with the ability to enable Sections you want included in a site.

## サイトの作成

Every Craft installation starts with one default site. The site name is what you defined at time of installation, and the handle is `default`.

You add additional sites using the Sites settings in Settings → Sites.

Each site has the following attributes:

* グループ
* 名前
* ハンドル
* 言語
* これはプライマリサイトですか？
* ベース URL


### サイトグループ

Site Groups allow you to organize your sites together by commonality, like language or site type.

Craft creates the first Site Group for you – named after the default site – and assigns the default site to that group.

Similar to Field Groups, Site Groups are for organization only.

You can access the current site's group information using:

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

In your templates, you can also access the language setting via `craft.app.language`. You can use this in a conditional:

```twig
{% if craft.app.language == 'de' %}
    <p>Guten Tag!</p>
{% endif %}
```

Or as a way to automatically include the proper template for each language:

```twig
{% include '_share/footer-' ~ craft.app.language %}
```

where your template name would be, for example, `_share/footer-de`.


### プライマリサイト

Craft sets the default site as the Primary site, meaning Craft will load it by default on the front end, if it is unable to determine which site to load. If you only have one site then you cannot disable it as the Primary site.

You can change the Primary site once you create additional sites. Craft will automatically toggle the current Primary site.

### サイト URL

Each site has a Base URL, which Craft uses as the starting point when generating dynamic links to entries and other site content.

Multiple sites can share the same host name, such as `https://craftcms.com/` and `https://craftcms.com/de/`, or they can have different host names, such as `https://craftcms.com/` and `https://de.craftcms.com/`.

If you want to create a site with a different host name, you must configure your server to handle traffic for it. The host name can either point to the same web root as your current site (e.g. `web/`), or you may want to give it its own separate web root. If you do the latter, make sure you copy your `.htaccess` and `index.php` files into the new web root.

::: tip
If you have multiple sites using different root domains like `https://site-a.com` and `https://site-b.com`, with the way Craft’s [license enforcements works](https://craftcms.com/support/license-enforcement), you’ll want to pick one of the domains to access the Craft control panel from for _all_ of the sites.
:::

::: warning
Don’t ever use the `@web` alias when defining your sites’ Base URLs. It could introduce a [cache poisoning](https://www.owasp.org/index.php/Cache_Poisoning) vulnerability, and Craft won’t be able to reliably determine which site is being requested.
:::

## すべての有効サイトにエントリを広げる

In the settings for each Channel Section is an option to propagate entries in that section across all sites. This is enabled by default, and is the only option for Single and Structure sections.

When enabled, Craft will create the new entry in each site enabled for that section using the submitted content.

If you would like the section's content to be separate then disable this option for that section.

## ガイド：新しいサイトの設定

In this short guide we'll walk through the steps of setting up a new site in Craft. This guide assumes you already have Craft installed and the default site setup and configured.

### ステップ 1：設定でサイトを作成

The first step is to create the new site in the Settings of your Craft installation.

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
