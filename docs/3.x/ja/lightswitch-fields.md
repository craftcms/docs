# Lightswitch フィールド

Lightswitch フィールドでは、「はい」または「いいえ」の答えが必要なとき向けに、トグル入力を提供します。

## テンプレート記法

### Lightswitch フィールドによるエレメントの照会

Lightswitch フィールドを持つ[エレメントを照会](element-queries.md)する場合、フィールドのハンドルにちなんで名付けられたクエリパラメータを利用して、Lightswitch フィールドのデータに基づいた結果をフィルタできます。

利用可能な値には、次のものが含まれます。

| 値                        | 取得するエレメント               |
| ------------------------ | ----------------------- |
| `true` or `':notempty:'` | Lightswitch 値が有効になっている。 |
| `false` or `':empty:'`   | Lightswitch 値が無効になっている。 |

::: tip
明示的な Lightswitch 値の設定を持たないエレメントは、フィールドの設定にしたがって、デフォルトのフィールド値を持つかのように扱われます。
:::
```twig
{% if entry.lightswitchFieldHandle %}
    <p>I'm on!</p>
{% else %}
    <p>I'm off.</p>
{% endif %}
```
```php
{% if entry.myFieldHandle %}
    <p>I'm on!</p>
{% else %}
    <p>I'm off.</p>
{% endif %}
```
:::

::: tip
Any elements that don’t have an explicit Lightswitch value set will be treated as if they have the default field value, per the field settings.
:::

### Lightswitch フィールドデータの操作

Lightswitch フィールドを含める必要がある[投稿フォーム](dev/examples/entry-form.md)がある場合、出発点としてこのテンプレートを利用してください。

::: code
```twig
{% if entry.myFieldHandle %}
    <p>I’m on!</p>
{% else %}
    <p>I’m off.</p>
{% endif %}
```
```php
if ($entry->myFieldHandle) {
    // I’m on!
} else {
    // I’m off.
}
```
:::

::: tip
If the element doesn’t have an explicit Lightswitch field value yet, the field’s default value will be returned.
:::

### 投稿フォームで Lightswitch フィールドを保存

::: tip
そのエレメントが明示的な Lightswitch フィールド値の設定を持たない場合、フィールドのデフォルト値が返されます。
:::

```twig
{{ hiddenInput('fields[myFieldHandle]', '') }}

{{ tag('input', {
  type: 'checkbox',
  name: 'fields[myFieldHandle]',
  value: '1',
  checked: (entry.myFieldHandle ?? false) ? true : false,
}) }}
```
