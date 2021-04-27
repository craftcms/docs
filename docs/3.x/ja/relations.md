# リレーション

Craft は、エレメントを互いに関連付けるための強力なエンジンを持っています。 関連フィールドタイプを利用して、それらの関連性を作成します。

* [アセットフィールド](assets-fields.md)
* [カテゴリフィールド](categories-fields.md)
* [エントリフィールド](entries-fields.md)
* [タグフィールド](tags-fields.md)
* [ユーザーフィールド](users-fields.md)

Craft は次の5つの関連フィールドタイプがあります。

## 専門用語

他のフィールドタイプと同様に、これらを[セクション](entries.md#sections)、[ユーザー](users.md)、[アセット](assets.md)、[カテゴリグループ](categories.md)、[タググループ](tags.md)、および、[グローバル設定](globals.md)のフィールドレイアウトに追加できます。

- **ソース**エレメント - 他のエレメントを選択した関連フィールドを持つもの
- **ターゲット**エレメント - ソースによって選択されたエレメント

Craft のリレーションを操作する前に、それがテンプレート記法に関連するため、次の用語を把握することが重要です。

それぞれのリレーションは2つのエレメントを必要とします。

1. Create a new field using the Entries field type, with the name “Ingredients”.
2. 与えられたエレメントのソースとして関連付くエレメントだけを見つけたい場合、`sourceElement` を使用します
3. Leave the Limit field blank so we can choose however many ingredients each recipe needs.

これは実際にどのように見えるのでしょう？

（エントリフィールド経由で）関連する要素を選択したドリンクレシピ向けのエントリがある場合、エレメントに次のようにラベル付けします。

## テンプレート記法

これを設定するために、エントリフィールドタイプの新しいフィールドを作成し、「原材料」という名前を付け、ソース（利用可能なエレメントが原材料セクションに存在するとします）から「原材料」を選択し、それぞれのレシピが必要とする多くの原材料を選択できるようリミット欄を空白のままにします。

### ソースエレメントを経由したターゲットエレメントの取得

これで、それぞれのドリンクエントリに新しい「原材料」フィールドから原材料を割り当てることができます。

リレーションフィールドをセットアップすると、テンプレート内で関連するエレメントを出力するためのオプションを見ることができます。

「ドリンク」エントリを出力している以下の例のように、すでにテンプレート内でソースレメントを保持している場合、他のフィールドの値にアクセスするのと同じ方法、すなわちハンドルによって、特定のフィールドのターゲットエレメントにアクセスできます。

```twig
{% set ingredients = drink.ingredients.all() %}
{% if ingredients|length %}

    <h3>Ingredients</h3>

    <ul>
        {% for ingredient in ingredients %}
            <li>{{ ingredient.title }}</li>
        {% endfor %}
    </ul>

{% endif %}
```

ソースの関連フィールドのハンドル（`ingredients`）を呼び出すと、そのフィールドのターゲットエレメントをフィールドに定義された順序で出力することができる Element Criteria Model が返ります。

```twig
{% for ingredient in drink.ingredients.section('ingredients').all() %}
    <li>{{ ingredient.title }}</li>
{% endfor %}
```

### `relatedTo` パラメータ

ドリンクレシピの原材料リストを出力したい場合、次のようにします。

You can pass one of these to it:

- ドリンクレシピエントリ：ソース  <craft3:craft\elements\Tag>
- 原材料：ターゲット
- A [**hash**](dev/twig-primer.md#hashes) with properties we’ll get into below: `element`, `sourceElement` or `targetElement` optionally with `field` and/or `sourceSite`
- An [**array**](dev/twig-primer.md#arrays) containing any mixture of the above options, which can start with `and` for relations on all elements rather than _any_ elements (default behavior is `or`, which you can omit or pass explicitly)

::: warning
You cannot chain multiple `relatedTo` parameters on the same element query; any subsequent `relatedTo` criteria will overwrite whatever was previously set.
:::

### The `andRelatedTo` Parameter

You can use the `andRelatedTo` parameter to further specify criteria that will be joined with an `and`. It accepts the same arguments, and you can use multiple `andRelatedTo` parameters.

::: warning
You can’t combine multiple `relatedTo` criteria with `or` *and* `and` conditions.
:::

#### 行列を経由する

A simple query might pass `relatedTo` a single element object or ID, like a `drinks` entry or entry ID represented here by `drink`:

```twig
{% set relatedDrinks = craft.entries.section('drinks').relatedTo(drink).all() %}
```

Passing an array of elements returns results relating to any one of the supplied items, meaning one *or* the other by default:

```twig
{% set ingredients = craft.entries.section('ingredients').relatedTo({
    sourceElement: drink,
    field: 'ingredients'
}) %}
```

Passing `and` at the beginning of an array returns results relating to *all* of the supplied items:

```twig
{% set ingredients = craft.entries.section('ingredients').relatedTo({
    sourceElement: drink,
    sourceLocale: craft.app.language
}) %}
```

You can further nest criteria as well:

```twig
{% set relatedDrinks = craft.entries()
    .section('drinks')
    .relatedTo([
        'and',
        [ 'or', gin, lime ],
        [ 'or', rum, grenadine ],
    ])
    .all() %}
{# result: drinks entries with any relationship to `gin` or `lime` *and*
   `rum` or `grenadine` #}
```

You could achieve the same result as the example above using the `andRelatedTo` parameter:

```twig
{% set relatedDrinks = craft.entries()
    .section('drinks')
    .relatedTo([ 'or', gin, lime ])
    .andRelatedTo([ 'or', rum, grenadine ])
    .all() %}
{# result: drinks entries with any relationship to `gin` or `lime` *and*
   `rum` or `grenadine` #}
```

#### 複数のリレーションの判定基準を渡す

You can query more specifically by passing `relatedTo`/`andRelatedTo` a [hash](dev/twig-primer.md#hashes) that contains the following properties:

| Property                                       | Accepts                                                             | Description                                                       |
| ---------------------------------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `element`, `sourceElement`、または `targetElement` | エレメントオブジェクト、および / または、 ID の配列                                       | 返されるエレメントが、渡したエレメントとソースまたはターゲットのどちらで関連付くかを気にしない場合、`element`を使用します |
| `field` _（オプション）_                              | フィールドハンドルかフィールド ID のいずれか（もしくは、ハンドル、および / または、ID の配列）をセットできます。       | Limits scope to relations created by the supplied field(s).       |
| `sourceLocale` _（オプション）_                       | [Site](craft3:craft\models\Site) object, site ID, or site handle. | Limits scope to relations created from the supplied site(s).      |

::: warning
Only use `sourceSite` if you’ve designated your relational field to be translatable.
:::

This is the equivalent of calling `drink.ingredients.all()`:

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

This doesn’t limit to a specific field, but it limits relations to the current site only:

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

This finds other drinks that uses the current one’s primary ingredient:

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

#### Going Through Matrix

If you want to find elements related to a source element through a [Matrix](matrix-fields.md) field, pass the Matrix field’s handle to the `field` parameter. If that Matrix field has more than one relational field and you want to target a specific one, you can specify the block type field’s handle using a dot notation:

```twig
{% set ingredients = craft.entries()
    .section('ingredients')
    .relatedTo({
        sourceElement: drink,
        field: 'ingredientsMatrix.relatedIngredient'
    })
    .all() %}
```

#### Passing Multiple Relation Criteria

There might be times when you need to factor multiple types of relations into the mix. For example, outputting all of the current user’s favorite drinks that include espresso:

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

Or you might want to pass an element query to find other users’ favorite drinks using the current one’s primary ingredient:

```twig
{% set otherUsers = craft.users()
    .id('not '~currentUser.id)
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
