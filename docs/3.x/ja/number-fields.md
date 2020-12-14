# 数字フィールド

数字フィールドでは、数値を受け入れるテキスト入力を提供します。

## 設定

数字フィールドの設定は、次の通りです。

* **初期値** – 新しいエレメントに適用するデフォルト値
* **最小値** – フィールドに入力できる最小の数字
* **最大値** – フィールドに入力できる最大の数字
* **小数点** – フィールドに入力できる小数点以下の最大の桁数
* **Prefix** – 入力欄の前に表示するテキスト
* **Suffix** – 入力欄の後に表示するテキスト

## Development

### 数字フィールドによるエレメントの照会

数字フィールドを持つ[エレメントを照会](element-queries.md)する場合、フィールドのハンドルにちなんで名付けられたクエリパラメータを使用して、数字フィールドのデータに基づいた結果をフィルタできます。

利用可能な値には、次のものが含まれます。

| 値                                    | 取得するエレメント           |
| ------------------------------------ | ------------------- |
| `100`                                | 値が 100。             |
| `'>= 100'`                        | 少なくとも、値が 100。       |
| `['and', '>= 100', '<= 1000']` | 値が 100 から 1,000 の間。 |

::: code
```twig
{# Fetch entries with a Number field set to at least 100 #}
{% set entries = craft.entries()
    .myFieldHandle('>= 100')
    .all() %}
```
```php
// Fetch entries with a Number field set to at least 100
$entries = \craft\elements\Entry::find()
    ->myFieldHandle('>= 100')
    ->all();
```
:::

### 数字フィールドデータの操作

If you have an element with a Number field in your template, you can access its data using your Number field’s handle:

::: code
```twig
{% set value = entry.myFieldHandle %}
```
```php
$value = $entry->myFieldHandle;
```
:::

That will give you the number value for the field, or `null` if there is no value.

To format the number with proper thousands separators (e.g. `,`), use the [number](./dev/filters.md#number) filter:

::: code
```twig
{{ entry.myFieldHandle|number }}
```
```php
\Craft::$app->getFormatter()->asDecimal($entry->myFieldHandle);
```
:::

If the number will always be an integer, pass `decimals=0` to format the number without any decimals.

::: code
```twig
{{ entry.myFieldHandle|number(decimals=0) }}
```
```php
\Craft::$app->getFormatter()->asDecimal($entry->myFieldHandle, 0);
```
:::


### Saving Number Fields

If you have an element form, such as an [entry form](https://craftcms.com/knowledge-base/entry-form), that needs to contain a Number field, you can use this template as a starting point:

```twig
{% set field = craft.app.fields.getFieldByHandle('myFieldHandle') %}

{% set value = entry is defined
    ? entry.myFieldHandle
    : field.defaultValue %}

<input type="number"
    name="fields[myFieldHandle]"
    min="{{ field.min }}"
    max="{{ field.max }}"
    value="{{ value }}">
```
