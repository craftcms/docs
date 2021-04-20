---
keywords: multi multisite multilingual translation
---

# Sites & Localization

In Craft 3 you can host multiple websites in a single Craft installation.

You can define one or more sites at different domains, using a different set of templates, and different versions of entry content.

The multi-site feature in Craft is for sites with the same publishing team. You manage the multi-site content at the entry level, with the ability to enable Sections you want included in a site.

## Creating a Site

Every Craft installation starts with one default site. The site name is what you defined at time of installation, and the handle is `default`.

You add additional sites using the Sites settings in **Settings** → **Sites**.

Each site has the following attributes:

- Group
- Name
- Handle
- Language
- Is Primary Site?
- Base URL


### Site Groups

Site Groups allow you to organize your sites together by commonality, like language or site type.

Craft creates the first Site Group for you, named after the default site, and assigns the default site to that group.

Similar to Field Groups, Site Groups are for organization only.

You can access the current site’s group information using `currentSite.group`:

```twig
{# @var currentSite craft\models\Site #}
Site ID:          {{ currentSite.id }}
Site Handle:      {{ currentSite.handle }}
Site Name:        {{ currentSite.name }}
Site Language:    {{ currentSite.language }}
Is Primary Site?: {{ currentSite.primary }}
Base URL:         {{ currentSite.baseUrl }}

{# @var siteGroup craft\models\SiteGroup #}
{% set siteGroup = currentSite.group %}
Site Group Name:  {{ siteGroup.name }}
```


### Language

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


### Primary Site

Craft sets the default site as the Primary site, meaning Craft will load it by default on the front end, if it is unable to determine which site to load. If you only have one site then you cannot disable it as the Primary site.

You can change the Primary site once you create additional sites. Craft will automatically toggle the current Primary site.

### Site URL

Each site has a Base URL, which Craft uses as the starting point when generating dynamic links to entries and other site content.

Multiple sites can share the same host name, such as `https://craftcms.com/` and `https://craftcms.com/de/`, or they can have different host names, such as `https://craftcms.com/` and `https://de.craftcms.com/`.

If you want to create a site with a different host name, you must configure your server to handle traffic for it. The host name can either point to the same web root as your current site (e.g. `web/`), or you may want to give it its own separate web root. If you do the latter, make sure you copy your `.htaccess` and `index.php` files into the new web root.

::: tip
If you have multiple sites using different root domains like `https://site-a.com` and `https://site-b.com`, with the way Craft’s [license enforcements works](https://craftcms.com/support/license-enforcement), you’ll want to pick one of the domains to access the Craft control panel from for _all_ of the sites.
:::

::: warning
Careful using the `@web` alias to define your sites’ Base URLs.  
You should explicitly override the alias to avoid introducing a [cache poisoning](https://www.owasp.org/index.php/Cache_Poisoning) vulnerability, and to make sure Craft can reliably determine which site is being requested. See [Aliases](config/#aliases) for an example.
:::

## Propagating Entries Across All Enabled Sites

In the settings for each Channel Section is an option to propagate entries in that section across all sites. This is enabled by default, and is the only option for Single sections.

When enabled, Craft will create the new entry in each site enabled for that section using the submitted content.

If you would like the section's content to be separate then disable this option for that section.

## Setting Up a New Site

In this short guide we'll walk through the steps of setting up a new site in Craft. This guide assumes you already have Craft installed and the default site setup and configured.

### Step 1: Create the Site in Settings

The first step is to create the new site in the Settings of your Craft installation.

1. Go to **Settings** → **Sites** and choose **New Site**.
2. Use the dropdown menu to choose the group your site should belong to. The group selection won’t have any impact on your site’s functionality.
3. Give your site a name. Craft uses the site name in the control panel, and you can also display it in your templates using `{{ siteName }}`.
4. Based on the Site name, Craft will generate a Site Handle. You can edit the Handle if you’d like. You will use the Site Handle to refer to this site in the templates.
5. Choose the language for this site (see above for more information on how you can use languages).
6. If this site should be the Primary Site, toggle **Is Primary Site?** to enable it.
7. Check the box for **This site has its own base URL** and put in the Base URL. For our example it’ll be `https://beta.craftcms.com`.
8. Save the new site.

### Step 2: Create Template Directories

Create the template directories and templates for your new site.

We recommend you have template directories named after the sites handles (e.g. `templates/default` and `templates/beta`). You store the site-specific templates in each site template directory.

### Step 3: Update the Sections

1. Go into each Section that you want to be available in the new site and enable the site using the Site Settings table.
2. Define the Entry URI Format, Template, and Status for the new site in each Section.
3. Choose whether you want to propagate the entries across all sites. If checked, entries in the section will be saved for all of the sites the section is enabled for. If unchecked, entries will only be saved in the site they were originally created in.

### Step 4: Define Translation Method of Fields

By default, custom fields are set to store the same value across all sites. If any fields should have unique values across your sites, then you will need to edit their [Translation Method](fields.md#translation-methods) settings.

### Step 5: Test Your Settings

Using new or existing entries, test that the Section, Field, and Translation Method settings work as you expect.

### Step 6: Check Your Asset Volumes Settings

If you have any local asset volumes, you will need to make sure those assets are available from each of your sites.

- The File System Path settings should be relative (`uploads/images/`).
- The URL settings should be relative (`/images`)

### Step 7: Configure Your Web Server and DNS

1. Configure your web server so the domain (e.g. `beta.craftcms.com`) points at the `web` directory. Craft will automatically detect which site the browser is requesting.
2. Update your DNS records so the domain points at the web server.

## Setting Up a Localized Site

This guide will walk you through all of the steps that are typically involved in setting up a localized site using Craft’s multi-site feature and translation support.

### Step 1: Defining Your Sites and Languages

The first step to creating localized site is to decide the languages you need to support. After that, create a new Site in Craft for each supported language.

### Step 2: Update Your Sections

After creating a new site for a language, enable the new site in each Section. In **Settings** → **Sections**, go into each section settings you want included in the localized site and enable the site in the Site Settings. Fill out the Entry URI Format (for Channel and Structure sections) or URI (for Single sections) to reflect how you want the URIs structured for that site.

### Step 3: Define Your Translatable Fields

In **Settings** → **Fields**, choose the fields you want to have translatable. Under **Translation Method**, choose **Translate for each language**.

Craft will allow you to update this field’s content in each entry on a per-language basis.

### Step 4: Update Your Templates

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
