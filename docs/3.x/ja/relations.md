# リレーション

Craft は、5つの関連フィールドタイプを持つ、エレメントを互いに関連付けるための強力なエンジンを持っています。

* [アセットフィールド](assets-fields.md)
* [カテゴリフィールド](categories-fields.md)
* [エントリフィールド](entries-fields.md)
* [タグフィールド](tags-fields.md)
* [ユーザーフィールド](users-fields.md)

他のフィールドタイプと同様に、これらを[セクション](entries.md#sections)、[ユーザー](users.md)、[アセット](assets.md)、[カテゴリグループ](categories.md)、[タググループ](tags.md)、および、[グローバル設定](globals.md)のフィールドレイアウトに追加できます。

## 専門用語

それぞれのリレーションは、*ソース* と *ターゲット* と呼ぶ、2つの要素で構成されています。

- <dfn>ソース</dfn>は、他のエレメントが選択される関連フィールドを持っています。
- <dfn>ターゲット</dfn>エレメントは、ソースによって選択されたものです。

エントリフィールドのリレーションとしてそれぞれの原材料を選択する、ドリンクレシピのエントリがあるとします。

次のように設定します。

1. フィールドタイプ「エントリ」を使用する新しいフィールドを作成し、名前を「原材料」とします。
2. 利用可能なソースエレメントから「原材料」をチェックして、そこに含まれるエントリだけがオプションで選択できるようにします。
3. レシピごとに必要とする多くの原材料を選択できるよう、「リミット」欄を空白のままにします。

これで、それぞれのドリンクエントリに新しい「原材料」フィールドから原材料を割り当てることができます。

エントリで複数の原材料を選択することで、レシピをソース、原材料をターゲットとして、いくつかのリレーションシップを作成します。

## テンプレート記法

リレーションフィールドをセットアップすると、テンプレート内で関連するエレメントを出力するためのオプションを見ることができます。

### ソースエレメントを経由したターゲットエレメントの取得

「ドリンク」エントリを出力している以下の例のように、すでにテンプレート内でソースエレメントを保持している場合、他のフィールドの値にアクセスするのと同じ方法、すなわちハンドルによって、特定のフィールドのターゲットエレメントにアクセスできます。

ソースの関連フィールドのハンドル（`ingredients`）を呼び出すと、そのフィールドのターゲットエレメントをフィールドに定義された順序で出力できる[エレメントクエリ](entries.md#querying-entries)が返ります。

ドリンクレシピの原材料リストを出力したい場合、次のようにします。

```twig
{% if drink.ingredients|length %}

    <h3>Ingredients</h3>

    <ul>
        {% for ingredient in drink.ingredients %}
            <li>{{ ingredient.title }}</li>
        {% endfor %}
    </ul>

{% endif %}
```

エレメントタイプでサポートされている追加パラメータを付加することもできます。

```twig
{% for ingredient in drink.ingredients.section('ingredients') %}
    <li>{{ ingredient.title }}</li>
{% endfor %}
```

### `relatedTo` パラメータ

アセット、カテゴリ、エントリ、ユーザー、および、タグは、それぞれ `relatedTo` パラメータをサポートし、あらゆる種類のとんでもないことを可能にします。

次のうちの1つを渡すことができます。

- 単一の**エレメントオブジェクト**：<craft3:craft\elements\Asset>、<craft3:craft\elements\Category>、<craft3:craft\elements\Entry>、<craft3:craft\elements\User>、または、<craft3:craft\elements\Tag>
- 単一の**エレメント ID**
- 以下ようなプロパティを持つ[**ハッシュ**](dev/twig-primer.md#hashes)：`element`、オプションで `field`、および / または、`sourceSite` を持つ `sourceElement` または `targetElement`
- 上記のオプションの任意の組み合わせを含む[**配列**](dev/twig-primer.md#arrays)。 _いくつかの_ エレメントではなく、すべてのエレメントのリレーションの場合は `and` ではじめることができます。（デフォルトの振る舞いは `or` で、省略したり明示的に渡せます）

#### シンプルなリレーションシップ

シンプルなクエリは、`drink` で表される `drinks` セクションのエントリのような、単一エレメントのオブジェクトや ID を渡すことです。

```twig
{% set relatedDrinks = craft.entries()
    .section('drinks')
    .relatedTo(drink)
    .all() %}
{# result: drinks entries with *any* relationship to `drink` (source or target) #}
```

エレメントの配列を渡すと、指定されたアイテムのいずれかに関連する結果を返します。

```twig
{% set relatedDrinks = craft.entries()
    .section('drinks')
    .relatedTo([ gin, lime ])
    .all() %}
{# result: drinks entries with any relationship to `gin` or `lime` #}
```

配列の最初に `and` を渡すと、指定されたアイテムの *すべて* に関連する結果を返します。

```twig
{% set relatedDrinks = craft.entries()
    .section('drinks')
    .relatedTo([ 'and', gin, lime ])
    .all() %}
{# result: drinks entries with any relationship to `gin` and `lime` #}
```

#### 高度なリレーションシップ

次のプロパティを含む[ハッシュ](dev/twig-primer.md#hashes)を `relatedTo` に渡すことで、より具体的なクエリを実行できます。

| プロパティ | 受け入れる値 | 説明 |
| -------- | -------- | ----------- | -- |
| `element`、`sourceElement`、または、`targetElement` | エレメント ID、エレメント、[エレメントクエリ](element-queries.md)、または、それらのいずれかを持つ配列。| ソース *または* ターゲットの関連性は `element`、提供されるものがソースである関連性は `sourceElement`、または、提供されるものがソースである関連性は `targetElement`。|
| `field`（オプション）| フィールドハンドル、フィールド ID、または、それらのいずれかを含む配列。| 指定したフィールドによって作成されたリレーションにスコープを制限します。|
| `sourceSite`（オプション）| [サイト](craft3:craft\models\Site)オブジェクト、サイト ID、または、サイトハンドル。| 指定したサイトによって作成されたリレーションにスコープを制限します。|

::: warning
翻訳可能なリレーションフィールドとしてデザインされている場合のみ、`sourceSite` を利用してください。
:::

これは `drink.ingredients.all()` の呼び出しと同等です。

```twig
{% set ingredients = craft.entries()
    .section('ingredients')
    .relatedTo({
        sourceElement: drink,
        field: 'ingredients'
    })
    .all() %}
{# result: ingredients entries related from `drink`’s custom `ingredients` field #}
```

これは特定のフィールドを制限しませんが、現在のサイトとのリレーションに制限しています。

```twig
{% set ingredients = craft.entries()
    .section('ingredients')
    .relatedTo({
        sourceElement: drink,
        sourceSite: craft.app.sites.currentSite.id
    })
    .all() %}
{# result: ingredients entries related from `drink`, limited to the current site #}
```

これは現在の原材料を主成分とするドリンクを探します。

```twig
{% set moreDrinks = craft.entries()
    .section('drinks')
    .relatedTo({
        targetElement: drink.ingredients.one(),
        field: 'ingredients'
    })
    .all() %}
{# result: other drinks using `drink`’s first ingredient #}
```

#### 行列を経由する

[行列](matrix-fields.md)フィールド内のソースエレメントに関連するエレメントを見つけたい場合、行列フィールドのハンドルを `field` パラメータに渡します。複数の関連フィールドを持つ行列フィールドにある特定のフィールドだけをターゲットにしたい場合、ドット表記を利用してブロックタイプのフィールドハンドルを指定できます。

```twig
{% set ingredients = craft.entries()
    .section('ingredients')
    .relatedTo({
        sourceElement: drink,
        field: 'ingredientsMatrix.relatedIngredient'
    })
    .all() %}
```

#### 複数のリレーションの判定基準を渡す

複数のタイプのリレーションを組み合わせる必要がある場合があります。例えば、エスプレッソを含む現在のユーザーのお気に入りのドリンクをすべて出力するには、次のようになります。

```twig
{% set espresso = craft.entries()
    .section('ingredients')
    .slug('espresso')
    .one() %}

{% set cocktails = craft.entries()
    .section('drinks')
    .relatedTo([
        'and',
        { sourceElement: currentUser, field: 'favoriteDrinks' },
        { targetElement: espresso, field: 'ingredients' }
    ])
    .all() %}
{# result: current user’s favorite espresso drinks #}
```

または、現在の原材料を主成分とするユーザーのお気に入りのドリンクを探すために、エレメントクエリを渡したいことでしょう。

```twig
{% set otherUsers = craft.users()
    .not(currentUser)
    .all() %}

{% set recommendedCocktails = craft.entries()
    .section('drinks')
    .relatedTo([
        'and',
        { sourceElement: otherUsers, field: 'favoriteDrinks' },
        { targetElement: drink.ingredients.one(), field: 'ingredients' }
    ])
    .all() %}
{# result: other users’ favorite drinks that use `drink`’s first ingredient #}
```
