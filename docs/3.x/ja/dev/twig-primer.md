- - -
[Twig](http://twig.sensiolabs.org/) は高速で強力なテンプレートシステムで、一般的に Craft、Drupal、および、（[Timber](https://www.upstatement.com/timber/) プラグイン経由の）WordPress などのコンテンツ管理システムのフロントエンドビューを強化するために利用されています。
- - -
# Twig 入門書

どのように機能するかを見てみましょう。

Let’s take a look at how it works.

## 3種類の Twig タグ

Twig テンプレートは、Twig コードが散りばめられた HTML ファイルです。 Twig がテンプレートを読み込むとき、最初に Twig コードから生の HTML コードを分離することを行います。 生の HTML コードは干渉されることなくブラウザに出力されます。

すべての Twig コードは、周囲の HTML と区別するための基本的なパターンに従います。 その外縁には左右の波括弧（`{` と `}`）があり、Twig コードのどんな _種類_ かを示す別の文字と対になっています。 これらの文字セットは「デリミタ」と呼ばれます。

Twig で注意しなければいけないデリミタは、3種類あります。

- ロジックタグ
- 出力タグ
- コメントタグ

### ロジックタグ

Twig コメントは `{#` と `#}` デリミタで囲まれます。 これらを利用して、コードの中に自分のための小さなメモを残すことができます。

ブラウザでレンダリングされたテキストとして表示されないという点で、HTML コメントに似ています。 違いは、そもそも HTML ソースにもならないということです。

```twig
<!-- This will be visible in the HTML source -->
{# This won’t! #}
```

### 出力タグ

`{%` and `%}` デリミタ内の構文はタグごとに異なりますが、常に同じもの、つまりタグ名ではじまります。

The syntax within the `{%` and `%}` delimiters varies from tag to tag, but they will always start with the same thing: the name of the tag.

最も単純な形式では、タグ名だけを必要とします。 例えば、Craft の [requireLogin](tags.md#requirelogin) タグを見てみましょう。

```twig
<p>The current time is {{ now|date("g:i a") }}.</p>
```

他のタグは、パラメータを受け取ることができます。 Craft の [exit](tags.md#exit) タグの場合、レスポンスでブラウザに送信されるべき HTTP ステータスコードをオプションでセットできます。

```twig
{% set entry = craft.entries.section( {{ sectionId }} ).one() %}
{% set entry = craft.entries.section( {% if filterBySection %} sectionId {% endif %} ) %}
```

いくつかのタグは、開始タグと終了タグの _間に_ ネストされたタグを持つことができます。

```twig
{% js %}
  console.log('Hello world');
{% endjs %}
```

Craft テンプレートで利用可能なタグのリストは、[タグ](tags.md)ページを参照してください。

```twig
{# Loop through the recipes #}
```

Craft テンプレートで利用可能なファンクションのリストは、[ファンクション](functions.md)ページを参照してください。

### コメントタグ

追加の HTML コードを動的に出力するには、プリント文を使用します。 それらは `{{` と `}}` デリミタで囲まれ、Twig が[文字列](#strings)として扱えるものであれば、その中にほぼ何でも記述できます。

```twig
{% set style = 'stirred' %}

{{ style }}
```

::: tip
プリント文（または、他の Twig コード）を他のプリント文の中に配置しないでください。 文字列を他の式と組み合わせる方法について知るには、[文字列の組み合わせ](#combining-strings)を参照してください。 :::
:::

#### 自動エスケープ

ほとんどの場合、プリント文はコンテンツを実際に出力する前に自動的に HTML エンコード します（**自動エスケープ**と呼ばれます）。 これは、クロスサイトスクリプティング（XSS）の脆弱性から保護するのに役立ちます。

自動エスケープではない場合、`<script>alert('Uh-oh')</script>` を検索すると次のような HTML になります。

```twig{16}
{{ siteName|upper }}
```

If it weren’t for auto-escaping, a search for `<script>alert('Uh-oh')</script>` would result in this HTML:

```html
{{ now|date("M d, Y") }}
```

これにより、元の Twig テンプレートに含まれない場合でも、JavaScript が実行される原因となります。 しかし、自動エスケープのお陰で、実際には次のような HTML になります。

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

最初に自動エスケープせずに、プリント文がコンテンツを直接出力するケースは2つあります。

- プリント文の中で呼び出された最後のタグや（[markdown](filters.md#markdown-or-md) フィルタのような）ファンクションによって、コンテンツが安全であるとみなされた場合
- [raw](https://twig.symfony.com/doc/2.x/filters/raw.html) フィルタを利用して、コンテンツが安全だと明示的に示した場合

#### 手動エスケープ

信頼されたコンテンツと信頼されてないコンテンツの両方を一緒に扱う必要がある場合があります。 例えば、ユーザーが提供したコンテンツを Markdown として出力したいものの、ユーザーが悪意のあるものを入れていないことを最初に確認したいとします。

あるいは、_いくつかの_ HTML を許可したい場合、それが使い慣れているなら、[HTML Purifier](http://htmlpurifier.org/) を使ってコンテンツをサニタイズする [purify](#purify) フィルターを利用できます。

```twig
{# Escape any HTML in the Body field, then format as Markdown #}
{{ entry.body|escape|markdown }}
```

それを行うには、[markdown](filters.md#markdown-or-md) フィルタに渡す前に [escape](https://twig.symfony.com/doc/2.x/filters/escape.html) フィルタを利用して、ユーザーが提供したコンテンツないの _すべての_ HTML を明示的にエンコードします。

```twig
{# Purify the content in the Body field, then format as Markdown #}
{{ entry.body|purify|markdown }}
```

## 変数

[set](https://twig.symfony.com/doc/2.x/tags/set.html) タグを利用して変数を定義できます。

[for](https://twig.symfony.com/doc/2.x/tags/for.html) タグを利用して、配列をループできます。

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

Craft は、ユーザー自身が定義する変数に加えて、いくつかの定義済み変数を提供しています。 Craft テンプレートで利用可能なグローバル変数のリストは、[グローバル変数](global-variables.md)ページを参照してください。

## フィルタ

Twig テンプレートには様々なことを行うことができるいくつかのファンクションが用意されています。 例えば、Craft は不可視項目の HTML を生成するために利用できる [hiddenInput](functions.md#hiddeninput) ファンクションを提供しています。

```twig
{{ hiddenInput('entryId', 100) }}
{# Output: <input type="hidden" name="entryId" value="100"> #}
```

Craft テンプレートで利用可能なフィルタのリストは、[フィルタ](filters.md)ページを参照してください。

## ファンクション

フィルタはファンクションに似ていますが、パイプ構文（`|`）を利用し、常に何らかの値を操作するためのものです。 例えば、Craft は [Markdown](https://daringfireball.net/projects/markdown/) 形式のテキストを HTML に変換する [markdown](filters.md#markdown-or-md) フィルタを提供しています。

```twig
{% set text = "I **really** love Tom Petty." %}
{{ text|markdown }}
{# Output: <p>I <strong>really</strong> love Tom Petty.</p> #}
```

フィルタを連鎖できます。 後続のフィルタは、先行するフィルタの結果を出発点として利用します。

```twig
{% set text = "I **really** love Tom Petty." %}
{{ text|markdown|striptags|upper }}
{# Output: I REALLY LOVE TOM PETTY.</p> #}
```

フィルタは直前の値だけに適用されることに注意してください。 フィルタを式の結果に適用したい場合、最初に式を括弧で囲まなければなりません。

```twig
{{ 100.3 + 50.3|round }}
{# Output: 150.3 #}

{{ (100.3 + 50.3)|round }}
{# Output: 151 #}
```

Refer to the [Filters](filters.md) page for a full list of filters available to your Craft templates.

## 続きを読む

テストは、`true` または `false` だけを返すファンクションのようなもので、値の性質について何かを明らかにすることを目的としています。 例えば、[defined](https://twig.symfony.com/doc/2.x/tests/defined.html) テストは、変数やハッシュ / オブジェクトのプロパティが定義されているかどうかに依存して、`true` または `false` を返します。

```twig
{% if specs.weight is defined %}
  <dt>Weight</dt>
  <dd>{{ specs.weight }}</dd>
{% endif %}
```

Craft テンプレートで利用可能なテストのリストは、[テスト](tests.md)ページを参照してください。

```twig
{% if entry is not defined %}
  {% exit 404 %}
{% endif %}
```

Twig で扱う値は、6種類あります。

## 値の種類

それぞれについて、詳しく見ていきましょう。

- [文字列](#strings)
- [数字](#numbers)
- [ブーリアン](#booleans)
- [配列](#arrays)
- [ハッシュ](#hashes)
- [functions.md](#arrow-functions)

Let’s take a look at each of them in detail.

### 文字列

テキスト値は**文字列**と呼ばれます。 文字列を識別するために、いくつかのテキストをダブル、または、シングルクォーテーションで囲みます（ただし、カーリー / スマートクォートを _除きます_）。

```twig
{% set greeting = "Hello there" %}
```

一度文字列をはじめると、Twig はマッチする別の引用符に出会うまで解析を続けます。 つまり、同じタイプの引用符でない限り、文字列の中に他の引用符を安全に追加できます。

```twig
{% set heading = 'Try the new 7" folding tablet' %}
{% set subheading = "The original Microsoft Surface was 3.5' long." %}
```

同じ文字列で両方のタイプの引用符を利用する必要がある場合、文字列の開始デリミタとマッチするものの直前にバックスラッシュ（`\`）を配置して、終了デリミタとして解析されないよう「エスケープ」できます。

```twig
{% set subheading = "The original Microsoft Surface was 3' 6\" long." %}
```

#### 文字列の結合

::: tip
文字列補完は、ダブルクォートで囲まれた文字列でのみ機能します。
:::

```twig
{# Concatenation #}
{% set greeting = "Hello, " ~ currentUser.friendlyName %}

{# Interpolation #}
{% set greeting = "Hello, #{currentUser.friendlyName}" %}
```

::: tip
String interpolation only works in double-quoted strings.
:::

### 数字

数字はプリント文で出力したり、文字列と結合できます。

```twig
{% set answer = 42 %}
```

Numbers can be output in a print statement, or combined with a string.

```twig
<p>The answer is {{ answer }}</p>
```

### ブーリアン

ブーリアン値は `true` または `false` のどちらかです。 これらは Twig の予約後のため、ブーリアン値を作成したい場合、それを入力するだけです。

```twig
{% set havingABud = true %}
```

プリント文でブーリアン値を出力したり、別の文字列と結合すると、値は `'1'` または `'0'` のどちらかに変換されます。

If you were to output a boolean value in a print statement, or combine it with another string, the value will be converted to either `'1'` or `'0'`.

### 配列

配列は、ネストされた値の順序付きリストです。 配列は左右の角括弧（`[` および `]`）で区切られ、値はカンマで区切られます。

```twig
{% set todoList = [
  'Finish design',
  'Build HTML & CSS',
  'Manage content with Craft'
] %}
```

テンプレートは以前と同様に [include](https://twig.symfony.com/doc/2.x/tags/include.html) タグで動作しますが、他のテンプレートでは代わりに [embed](https://twig.symfony.com/doc/2.x/tags/embed.html) タグを利用して `content` ブロック全体を上書きするオプションがあります。

```twig
<ol class="todo">
  {% for item in todoList %}
    <li>{{ item }}</li>
  {% endfor %}
</ol>
```

配列をプリント文で直接出力したり、他の文字列と結合したりできないことに注意してください。 配列の値をカンマ区切りで素早く出力したい場合、[join](https://twig.symfony.com/doc/2.x/filters/join.html) フィルタを利用できます。

```twig
{{ todoList|join(', ') }}
```

### ハッシュ

ハッシュは[配列](#arrays)に似ていますが、値はカスタム**キー**によってインデックスが付けられます。

ハッシュを定義するには、左右の波括弧（`{` および `}`）をデリミタとして利用します。 ハッシュのキーと値のペアを配列のようにカンマで区切り、個々のキーと値をコロンで区切ります。

```twig
{% set specs = {
  length: '108cm',
  width: '68.6cm',
  height: '53.3cm',
  weight: '90kg'
} %}
```

配列と同様に、[for](https://twig.symfony.com/doc/2.x/tags/for.html) タグを利用してハッシュ内のすべての値をループできます。

```twig{5}
{% set myKey = 'weight' %}
{% set myValue = '90kg' %}

{% set specs = {
  (myKey): myValue
} %}
```

ドットや配列構文を利用して、キーを指定してハッシュ値に直接アクセスすることもできます。

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

いくつかの[ファンクション](#functions)と[フィルタ](#filters)では、引数に**アローファンクション**を渡すことができます。 アローファンクションは、テンプレート内で直接定義するコンパクトなファンクションで、単一の値を返します。

例えば、Craft の [group](filters.md#group) フィルタは、渡されたアローファンクションの結果に基づいて、配列内のすべてのアイテムをグループ化します。

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

## ループ

[配列](#arrays)や[ハッシュ](#hashes)内の複数のアイテムをループさせなければならないことがよくあります。 そのために、[for](https://twig.symfony.com/doc/2.x/tags/for.html) タグを利用します。

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

## 条件文

条件が `false` のときにテンプレートの別の部分を表示したい場合、ネストされた `{% else %}` タグを含めることができます。

```twig
{% if currentUser %}
  <p>Hello, {{ currentUser.friendlyName }}</p>
{% endif %}
```

ネストされた `{% elseif %}` タグ（`{% else %}` タグがある場合は、その前）を含めることで、元の条件が `false` の場合に追加のフォールバック条件を作成することもできます。

```twig
{% if currentUser %}
  <a href="/logout">Logout</a>
{% else %}
  <a href="/login">Login</a>
{% endif %}
```

::: tip
何かの値に応じてテンプレートの異なる部分を切り替えたい場合、複数の `{% if %}` と `{% elseif %}` タグで何度も同じ値を比較するよりもシンプルな構文を [switch](tags.md#switch) タグが提供します。
:::

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



## DRY テンプレート

何かをコーディングするときは、常にコードを「DRY」（Don’t Repeat Yourself）に保ち、 同じ一般的なロジックや HTML を複数箇所に書いたり、保守したりしないようにするのは良い習慣です。 これは Twig にも当てはまります。 ウェブサイトの各ページには同じヘッダーとフッターがあり、ページの大部分は共有された再利用可能なコンポーネントで構成されているはずです。

Twig はテンプレートを DRY に保つための4つの方法を提供します。

- [Twig に付随するフィルタ](#template-inheritance)
- [Craft の独自フィルタ](#includes)
- [エンベッド](#embeds)
- [マクロ](#macros)

### テンプレートの継承

Twig テンプレートは他のテンプレートを**拡張**して、親よりも詳細を入力できます。 サブテンプレートが親から HTML の基本セットを _受け継ぐ_ ため、このコンセプトは**テンプレートの継承**と呼ばれます。

このテンプレート自体にあまり価値はありませんが、ネストされたテンプレートを活用するためのフレームワークを提供します。

```twig
<!DOCTYPE html>
<html xmlns="https://www.w3.org/1999/xhtml" lang="{{ currentSite.language }}">
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

これで、`templates/` フォルダに `_html5.twig` テンプレートを**拡張する** `hello-world.twig` テンプレートを作成できます。

- ネストされたテンプレートに `<head>` および `<body>` 要素のコンテンツを上書きするための方法を与える、`head` および `body` **ブロック**を定義します。
- ネストされたテンプレートで、変数 `docTitle` を定義できます。 これは `<title>` の値になり、定義されていない場合、デフォルトでサイト名になります。
- `bodyAttributes` ハッシュを定義することで、ネストされたテンプレートで `<body>` 要素にカスタム属性をセットできるようになります。 （このハッシュを HTML 属性のリストに変換するため、[attr](functions.md#attr) ファンクションを利用しています。

このテンプレートは、いくつかのことを行っています。

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

- `_html5.twig` テンプレートを**拡張する**ものであると宣言しています。
- [Twig Templates in Craft](https://mijingo.com/products/screencasts/twig-templates-in-craft/) は、Craft の Twig を快適に使えるようになることを目的とした、Mijingo によるビデオコースです。
- [Straight up Craft](https://straightupcraft.com/twig-templating) は、Craft での Twig の使い方に関する素晴らしい記事があります。
- [Twig for Designers](https://github.com/brandonkelly/TwigForDesigners) は進行中の eBook で、非開発者が Twig をどのように使えるか説明することを目的としています。

テンプレートが別のテンプレートを拡張する場合、ブラウザに直接出力される HTML コードを持たないことに注意してください。 HTML コードの _すべて_ は、テンプレートブロック内で定義されなければなりません。

::: tip
テンプレートは再起的に拡張できます。 `hello-world.twig` を拡張し、`body` ブロックに HTML を追加する別のテンプレートを作成してみてください。 :::
:::

### インクルード

例えば、`templates/` フォルダに `_tip.twig` というテンプレートを次のように作成します。

これで、`tipText` 値を渡して別のテンプレートからインクルードできます。

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

### エンベッド

エンベッドは[インクルード](#includes)に似ていて、さらに強大な力を持っています。 インクルードしたテンプレート内のテンプレートブロックを上書きできます。 例として、コンテンツをよりカスタマイズしやすくしてみましょう。 `<p>` タグをブロックで囲むことで、それが可能になります。

```twig
<div class="tip">
  <h6>Tip</h6>
  {% block content %}
    <p>{{ tipText }}</p>
  {% endblock %}
</div>
```

独立したコンポーネントの HTML のみを出力する「部分的な」テンプレートを作成し、[include](https://twig.symfony.com/doc/2.x/tags/include.html) タグを利用して他のテンプレートに含めることができます。

```twig
{% embed '_tip' %}
  {% block content %}
    <p>I’m a helpful tip!</p>
  {% endblock %}
{% endembed %}
```

### マクロ

テンプレートでは、HTML を出力する再利用可能なファンクションである**マクロ**を定義できます。 これらはテンプレートが似たような HTML を複数回出力する必要がある場合に特に便利ですが、他のテンプレートでは必要としないため、[include](#includes) を利用する価値はありません。

[macro](https://twig.symfony.com/doc/2.x/tags/macro.html) タグに `<li>` の HTMLをプルしておき、代わりにナビのアイテムごとに呼び出すことができます。

```twig
<nav class="global-nav">
  <ul>
    <li class="nav-item"><a href="{{ url('about') }}">About</a></li>
    <li class="nav-item"><a href="{{ url('blog') }}">Blog</a></li>
    <li class="nav-item"><a href="{{ url('contact') }}">Contact</a></li>
  </ul>
</nav>
```

::: tip
[import](https://twig.symfony.com/doc/2.x/tags/import.html) タグを利用して、他のテンプレートからマクロをインポートできます。
:::

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

## 追加リソース

Twig の詳細については、これらのリソースをチェックしてください。

- [Twig for Template Designers](https://twig.symfony.com/doc/templates.html) は、すべての Twig の機能を詳細なドキュメントです。
- [Twig Templates in Craft](https://craftquest.io/courses/twig-templates-in-craft) – Craft の Twig テンプレート手法を紹介する、CraftQuest の全12回のビデオコース
