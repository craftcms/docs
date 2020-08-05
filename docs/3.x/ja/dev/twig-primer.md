# Twig 入門書

これは Craft のテンプレートエンジンである Twig のコアコンセプトの要約です。

これはあくまで入門書であり、 Twig が行うことができるすべての包括的なドキュメントではありません。

## 3種類の Twig タグ

Twig templates are HTML files that are sprinkled with bits of Twig code. When Twig loads a template, the first thing it will do is separate the raw HTML code from the Twig code. The raw HTML code will be output to the browser without any tampering.

All Twig code follows a basic pattern that separates it from the surrounding HTML. At its outer edges you will find left and right curly braces (`{` and `}`), coupled with another character that signifies what _type_ of Twig code it is. These sets of characters are called “delimiters”.

それぞれについて、詳しく見てみましょう。

- ロジックタグ
- 出力タグ
- コメントタグ

### ロジックタグ

コメント構文は常に `{#` ではじまり `#}` で終わります。 You can use them to leave little notes for yourself in the code.

They are similar to HTML comments in that they won’t show up as rendered text in the browser. The difference is that they will never make it into the HTML source in the first place.

```twig
<!-- This will be visible in the HTML source -->
{# This won’t! #}
```

### 出力タグ

出力タグはテンプレートにアプトプットするためのものなので、 Twig の命令タグ内に記述することは絶対にできません

出力タグは、レンダリングされた HTML にプリントする責任があります。

In their simplest form, the tag name might be all that’s required. Take Craft’s [requireLogin](tags.md#requirelogin) tag, for example:

```twig
<p>The current time is {{ now|date("g:i a") }}.</p>
```

Other tags can accept parameters. In the case of Craft’s [exit](tags.md#exit) tag, you can optionally set the HTTP status code that should be sent to the browser in the response:

```twig
{% set entry = craft.entries.section( {{ sectionId }} ).one() %}
{% set entry = craft.entries.section( {% if filterBySection %} sectionId {% endif %} ) %}
```

これらの例は、正しくありません。

```twig
{% js %}
  console.log('Hello world');
{% endjs %}
```

こちらは正しいです。

```twig
{# Loop through the recipes #}
```

リソース：

### コメントタグ

To output additional HTML code dynamically, use a print statement. They are wrapped in `{{` and `}}` delimiters, and you can put just about anything inside them, as long as it can be treated as a [string](#strings).

```twig
{% set style = 'stirred' %}

{{ style }}
```

::: tip
Don’t place a print statement (or any other Twig code) within another print statement. See [Combining Strings](#combining-strings) to learn how to combine strings with other expressions.
:::

#### Auto-escaping

コメントタグの内側に記述された内容は、HTML コメントとは異なり、最終的なテンプレートにレンダリングされません。

For example, let’s say you have a search results page, where the search query is defined by a `q` query string parameter, and in the event that there are no results, you want to output a message to the user that includes the query:

```twig{16}
{{ siteName|upper }}
```

`set` タグを利用して、独自の変数を割り当てることができます。

```html
{{ now|date("M d, Y") }}
```

Which would cause JavaScript to execute on the page, even though it wasn’t part of the original Twig template. But thanks to auto-escaping, you’d actually end up with this HTML:

```html
<h3>Watch me count to ten!</h3>
<ul>
    {% for num in range(1, 10) %}
        <li class="{{ cycle(['odd', 'even'], loop.index0) }}">
            {{ num }}
        </li>
    {% endfor %}
</ul>
```

There are two cases where print statements will output content directly, without auto-escaping it first:

- When the content is deemed safe by the last tag or function that was called within the print statement (such as the [markdown](filters.md#markdown-or-md) filter).
- When you explicitly mark the content as safe using a [raw](https://twig.symfony.com/doc/2.x/filters/raw.html) filter.

#### Manual escaping

There are times where you may need to work with both trusted and untrusted content together. For example, let’s say you want to output user-supplied content as Markdown, but you want to ensure they haven’t put anything nefarious in there first.

リソース：

```twig
{# Escape any HTML in the Body field, then format as Markdown #}
{{ entry.body|escape|markdown }}
```

Twig と Craft は、テンプレートタグ内で利用できるいくつかのファンクションを提供します。

```twig
{# Purify the content in the Body field, then format as Markdown #}
{{ entry.body|purify|markdown }}
```

## 変数

リソース：

Twig を学ぶためにオンラインで利用できるいくつかの学習リソースがあります。

```twig
{% set title = "About Us" %}
{% set docTitle = title ~ " | ACME, Inc." %}

<html>
  <head>
    <title>{{ docTitle }}</title>
  </head>
  <body>
    <h1>{{ title }}</h1>
    <!-- ... -->
  </body>
</html>
```

Craft provides a few predefined variables that will be available in addition to the variables you define yourself. Refer to the [Global Variables](global-variables.md) page for a full list of global variables available to your Craft templates.

## フィルタ

There are several functions available to your Twig templates, which can do a wide variety of things. For example, Craft provides a [hiddenInput](functions.md#hiddeninput) function that can be used to generate the HTML for a hidden input:

```twig
{{ hiddenInput('entryId', 100) }}
{# Output: <input type="hidden" name="entryId" value="100"> #}
```

さらに、すべての Craft テンプレートは、いくつかの[グローバル変数](global-variables.md)があらかじめロードされています。

## ファンクション

Filters are like functions, but they use a pipe syntax (`|`), and they are always meant to manipulate a value of some sort. For example, Craft provides an [markdown](filters.md#markdown-or-md) filter, which converts [Markdown](https://daringfireball.net/projects/markdown/)-formatted text into HTML:

```twig
{% set text = "I **really** love Tom Petty." %}
{{ text|markdown }}
{# Output: <p>I <strong>really</strong> love Tom Petty.</p> #}
```

You can chain filters together. Each subsequent filters will use the result of the previous filter as its starting point.

```twig
{% set text = "I **really** love Tom Petty." %}
{{ text|markdown|striptags|upper }}
{# Output: I REALLY LOVE TOM PETTY.</p> #}
```

Note that filters will only apply to the value that immediately precedes it. If you want to apply the filter to the result of an expression, you must wrap the expression in parentheses first.

```twig
{{ 100.3 + 50.3|round }}
{# Output: 150.3 #}

{{ (100.3 + 50.3)|round }}
{# Output: 151 #}
```

Refer to the [Filters](filters.md) page for a full list of filters available to your Craft templates.

## 続きを読む

Tests are like functions that only return `true` or `false`, and are meant to reveal something about the nature of a value. For example, the [defined](https://twig.symfony.com/doc/2.x/tests/defined.html) test will return `true` or `false` depending on whether a variable or hash/object property is defined:

```twig
{% if specs.weight is defined %}
  <dt>Weight</dt>
  <dd>{{ specs.weight }}</dd>
{% endif %}
```

If you are looking for whether a test returns `false`, use the `is not` syntax:

```twig
{% if entry is not defined %}
  {% exit 404 %}
{% endif %}
```

Refer to the [Tests](tests.md) page for a full list of filters available to your Craft templates.

## Types of values

There are six types of values you’ll be working with in Twig:

- [Strings](#strings)
- [Numbers](#numbers)
- [Booleans](#booleans)
- [Arrays](#arrays)
- [Hashes](#hashes)
- [functions.md](#arrow-functions)

Let’s take a look at each of them in detail.

### Strings

Textual values are called **strings**. To identify a string, wrap some text in either double or single quotation marks (but _not_ curly/smart quotes).

```twig
{% set greeting = "Hello there" %}
```

Once you’ve started a string, Twig will keep parsing it until it comes across another matching quotation mark. Which means that you can safely add other quotation marks inside the string—as long as it’s not the same type of quotation mark.

```twig
{% set heading = 'Try the new 7" folding tablet' %}
{% set subheading = "The original Microsoft Surface was 3.5' long." %}
```

If you need to use both types of quotation marks in the same string, you can place a backslash (`\`) right before the one that matches the string’s opening delimiter to “escape” it from being parsed as the closing delimiter.

```twig
{% set subheading = "The original Microsoft Surface was 3' 6\" long." %}
```

#### Combining strings

Twig provides two ways to combine strings together: You can concatenate them using the **tilde** (`~`) operator, or you can inject a string into the middle of another string using **string interpolation**.

```twig
{# Concatenation #}
{% set greeting = "Hello, " ~ currentUser.friendlyName %}

{# Interpolation #}
{% set greeting = "Hello, #{currentUser.friendlyName}" %}
```

::: tip
String interpolation only works in double-quoted strings.
:::

### Numbers

Numbers can be written verbatim without any special delimiters.

```twig
{% set answer = 42 %}
```

Numbers can be output in a print statement, or combined with a string.

```twig
<p>The answer is {{ answer }}</p>
```

### Booleans

Boolean values are either `true` or `false`. Those are reserved words in Twig, so if you want to create a boolean value, you just type it out.

```twig
{% set havingABud = true %}
```

Booleans are most often used within [conditionals](#conditionals), which switch a part of the template on or off depending on an expression.

If you were to output a boolean value in a print statement, or combine it with another string, the value will be converted to either `'1'` or `'0'`.

### Arrays

Arrays are ordered lists of nested values. They are delimited with left and right square brackets (`[` and `]`), and their values are separated by commas.

```twig
{% set todoList = [
  'Finish design',
  'Build HTML & CSS',
  'Manage content with Craft'
] %}
```

より詳しいことは、このページの下段にある「続きを読む」セクションを見るか、[Twig 公式ドキュメント](https://twig.symfony.com/doc/templates.html)を直接参照してください。

```twig
<ol class="todo">
  {% for item in todoList %}
    <li>{{ item }}</li>
  {% endfor %}
</ol>
```

Note that you can’t output an array directly in a print statement, or combine it with another string. If you want to quickly output a comma-separated list of an array’s values, you could use the [join](https://twig.symfony.com/doc/2.x/filters/join.html) filter:

```twig
{{ todoList|join(', ') }}
```

### Hashes

Hashes are similar to [arrays](#arrays), except that the values are indexed by custom **keys**.

To define a hash, use left and right curly braces as the delimiters (`{` and `}`). Separate your hash’s key-value pairs with commas, like arrays, and separate the individual keys from the values with a colon.

```twig
{% set specs = {
  length: '108cm',
  width: '68.6cm',
  height: '53.3cm',
  weight: '90kg'
} %}
```

If you need to create a hash with a dynamic key, wrap the key in parentheses:

```twig{5}
{% set myKey = 'weight' %}
{% set myValue = '90kg' %}

{% set specs = {
  (myKey): myValue
} %}
```

https://twig.symfony.com/doc/tags/index.html

```twig
<dl class="specs">
  {% for key, value in specs %}
    <dt>{{ key }}</dt>
    <dd>{{ value }}</dd>
  {% endfor %}
</dl>
```

You can also access hash values directly by their keys, using either dot or array syntax:

```twig
<dl class="specs">
  <dt>Dimensions</dt>
  <dd>{{ specs.length }} × {{ specs.width }} × {{ specs.height }}</dd>

  <dt>Weight</dt>
  <dd>{{ specs['weight'] }}</dd>
</dl>
```

### Twig に付随するファンクション

Some [functions](#functions) and [filters](#filters) let you pass an **arrow function** as an argument. Arrow functions are compact functions that you define right in your template, which return a single value.

For example, Craft’s [group](filters.md#group) filter will group all of the items in an array, based on the result of an arrow function you pass in:

```twig{9}
{% set groceryList = [
  {name: 'Eggs', category: 'Dairy'},
  {name: 'Pancake Mix', category: 'Breakfast'},
  {name: 'Milk', category: 'Dairy'},
  {name: 'Onions', category: 'Produce'}
] %}

{# output the list by category #}
{% set itemsByCategory = groceryList|group(item => item.category) %}
{% for category, items in itemsByCategory %}
  <h3>{{ category }}</h3>
  <ul>
    {% for item in items %}
      <li>{{ item.name }}</li>
    {% endfor %}
  </ul>
{% endfor %}
```

## Loops

You’ll frequently need to loop over multiple items in an [array](#arrays) or [hash](#hashes). To do that, you’ll use a [for](https://twig.symfony.com/doc/2.x/tags/for.html) tag.

```twig{8-10}
{% set todoList = [
  'Finish design',
  'Build HTML & CSS',
  'Manage content with Craft'
] %}

<ol class="todo">
  {% for item in todoList %}
    <li>{{ item }}</li>
  {% endfor %}
</ol>
```

## Conditionals

Your templates can contain **conditionals**, which are initiated by an [if](https://twig.symfony.com/doc/2.x/tags/if.html) tag, which contains an expression that will be evaluated as either `true` or `false`, and will show part of a template depending on the result of that expression.

```twig
{% if currentUser %}
  <p>Hello, {{ currentUser.friendlyName }}</p>
{% endif %}
```

You can include a nested `{% else %}` tag, if you wish to show a different part of your template when the condition is `false`:

```twig
{% if currentUser %}
  <a href="/logout">Logout</a>
{% else %}
  <a href="/login">Login</a>
{% endif %}
```

You can also include nested `{% elseif %}` tags (before the `{% else %}` tag, if there is one), to create additional fallback conditions in the event that the original condition is `false`:

```twig
<p>Is it quitting time?</p>

{% set hour = now|date("G") %}
{% if hour >= 16 and hour < 18 %}
    <p>Yes!</p>
{% else %}
    <p>Nope.</p>
{% endif %}
```

::: tip
If you want to switch between different parts of your template depending on the value of something, [switch](tags.md#switch) tags provide a simpler syntax than multiple `{% if %}` and `{% elseif %}` tags each comparing the same value over and over again.
:::



## DRY templating

Whenever you’re coding anything, it’s always a good practice to keep your code “DRY” (Don’t Repeat Yourself), to avoid writing and maintaining the same general logic or HTML in multiple places. This applies to Twig as well: each page on your website is likely to have the same header and footer, and the vast majority of your pages should be made up of shared, reusable components.

Twig provides four ways to keep your templates DRY:

- [Twig に付随するフィルタ](#template-inheritance)
- [Craft の独自フィルタ](#includes)
- [Embeds](#embeds)
- [Macros](#macros)

### Template inheritance

Twig templates can **extend** other templates, filling in more details than their parent. This concept is called **template inheritance** because sub-templates _inherit_ a base set of HTML from their parent.

For example, you can create an `_html5.twig` template in your `templates/` folder, which defines the base HTML boilerplate that _all_ pages on your website should have:

```twig
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="{{ currentSite.language }}">
<head>
  {% block head %}
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta charset="utf-8">
    <title>{{ docTitle ?? siteName }}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  {% endblock %}
</head>
<body {{ attr(bodyAttributes ?? {}) }}>
  {% block body %}
  {% endblock %}
</body>
</html>
```

This template is pretty worthless on its own, but it provides a framework for nested templates to take advantage of:

- It defines `head` and `body` **blocks**, which give nested templates a way to override the contents of the `<head>` and `<body>` elements.
- It allows nested templates to define a `docTitle` variable, which will become the `<title>` value, and defaults to the site name if that’s not defined.
- It gives nested templates the ability to set custom attributes on the `<body>` element, by defining a `bodyAttributes` hash. (We’re using the [attr](functions.md#attr) function to convert that hash into a list of HTML attributes.)

With that template in place, you can now create a `hello-world.twig` template in your `templates/` folder, which **extends** your `_html5.twig` template:

```twig
{% extends "_html5" %}

{% set docTitle = 'Hello World' %}

{% set bodyAttributes = {
  class: 'hello-world'
} %}

{% block head %}
  {{ parent() }}
  <link rel="stylesheet" type="text/css" href="/styles.css">
{% endblock %}

{% block body %}
  <h1>Hello world!</h1>
{% endblock %}
```

This template is doing a few things:

- It’s declaring that it is meant to **extend** our `_html5.twig` template.
- [Twig Templates in Craft](https://mijingo.com/products/screencasts/twig-templates-in-craft/) は、Craft の Twig を快適に使えるようになることを目的とした、Mijingo によるビデオコースです。
- [Straight up Craft](https://straightupcraft.com/twig-templating) は、Craft での Twig の使い方に関する素晴らしい記事があります。
- [Twig for Designers](https://github.com/brandonkelly/TwigForDesigners) は進行中の eBook で、非開発者が Twig をどのように使えるか説明することを目的としています。

Note that when a template extends another template, it doesn’t have any HTML code that will be output to the browser directly. _All_ of its HTML code must be defined within template blocks.

::: tip
You can extend templates recursively. Try creating another template that extends `hello-world.twig` and adds additional HTML to the `body` block.
:::

### Includes

You can create “partial” templates, which only output the HTML for an individual component, and then include them within other templates using an [include](https://twig.symfony.com/doc/2.x/tags/include.html) tag.

For example, create a template called `_tip.twig` in your `templates/` folder, with this:

```twig
<div class="tip">
  <h6>Tip</h6>
  <p>{{ tipText }}</p>
</div>
```

Now you can include that from another template, passing in the `tipText` value:

```twig
{% include '_tip' with {
  tipText: 'I’m a helpful tip!'
} %}
```

### Embeds

Embeds are similar to [includes](#includes), with a superpower: they can override template blocks within the included template. Going with our tip example, let’s say you want to make the content more customizable. you could do that by wrapping the `<p>` tag in a block:

```twig
<div class="tip">
  <h6>Tip</h6>
  {% block content %}
    <p>{{ tipText }}</p>
  {% endblock %}
</div>
```

https://twig.symfony.com/doc/functions/index.html

```twig
{% embed '_tip' %}
  {% block content %}
    <p>I’m a helpful tip!</p>
  {% endblock %}
{% endembed %}
```

### Macros

Your templates can define **macros**, which are reusable functions that output HTML. These are especially useful when a template needs to output similar HTML multiple times, but it’s not worth using an [include](#includes) because no other templates are going to need it.

For example, let’s say you find yourself repeating the same HTML and Twig code for each the global nav items in your site layout template:

```twig
<nav class="global-nav">
  <ul>
    <li class="nav-item"><a href="{{ url('about') }}">About</a></li>
    <li class="nav-item"><a href="{{ url('blog') }}">Blog</a></li>
    <li class="nav-item"><a href="{{ url('contact') }}">Contact</a></li>
  </ul>
</nav>
```

You could pull that `<li>` HTML into a [macro](https://twig.symfony.com/doc/2.x/tags/macro.html) tag, and then call it for each of your nav items instead:

```twig
{% macro navItem(label, path) %}
  <li class="nav-item"><a href="{{ url(path) }}">{{ label }}</a></li>
{% endmacro %}

<nav class="global-nav">
  <ul>
    {{ _self.navItem('About', 'about') }}
    {{ _self.navItem('Blog', 'blog') }}
    {{ _self.navItem('Contact', 'contact') }}
  </ul>
</nav>
```

::: tip
You can import macros from other templates using an [import](https://twig.symfony.com/doc/2.x/tags/import.html) tag.
:::

## Additional resources

To learn more about Twig, check out these resources:

- [Twig for Template Designers](https://twig.symfony.com/doc/templates.html) は、すべての Twig の機能を詳細なドキュメントです。
- [Twig Templates in Craft](https://craftquest.io/courses/twig-templates-in-craft) – CraftQuest’s 12-part video course introducing Twig templating in Craft
