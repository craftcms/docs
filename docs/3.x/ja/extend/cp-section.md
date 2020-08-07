# コントロールパネルのセクション

モジュールとプラグインは、[EVENT_REGISTER_CP_NAV_ITEMS](craft3:craft\web\twig\variables\Cp::EVENT_REGISTER_CP_NAV_ITEMS) イベントを使用して新しいセクションをコントロールパネルに追加できます。

```php
use craft\events\RegisterCpNavItemsEvent;
use craft\web\twig\variables\Cp;
use yii\base\Event;

public function init()
{
    parent::init();

    Event::on(
        Cp::class,
        Cp::EVENT_REGISTER_CP_NAV_ITEMS,
        function(RegisterCpNavItemsEvent $event) {
            $event->navItems[] = [
                'url' => 'section-url',
                'label' => 'Section Label',
                'icon' => '@ns/prefix/path/to/icon.svg',
            ];
        }
    );

    // ...
}
```

[navItems](craft3:craft\events\RegisterCpNavItemsEvent::$navItems) 配列内のそれぞれの項目は、次のキーを持つことができます。

- `url` – ナビゲーション項目がリンクする URL。 （<craft3:craft\helpers\UrlHelper::cpUrl()> を実行します。 ）
- `label` – ユーザーが目にするナビゲーション項目のラベル。
- `icon` – 使用するアイコン SVG のパス。 （エイリアスではじめることができます。 ）
- `badgeCount` _（オプション）_ – ナビゲーション項目に表示されるバッジの数。
- `subnav` _（オプション）_ – セクションにアクセスしたときに表示される、サブナビゲーション項目の配列。 （[サブナビゲーション](#subnavs)を参照してください。 ）


For Craft to properly designate an item as “active,” its `url` must be registered with a relative path to the plugin or module’s control panel section. Any `subnav` paths should begin with `url` in order to appear selected when active.

## サブナビゲーション

テンプレートでは、`selectedSubnavItem` 変数にナビゲーション項目のキーをセットすることによって、どのサブナビゲーション項目が選択されているかを指定できます。

```php
'subnav' => [
    'foo' => ['label' => 'Foo', 'url' => 'section-url/foo'],
    'bar' => ['label' => 'Bar', 'url' => 'section-url/bar'],
    'baz' => ['label' => 'Baz', 'url' => 'section-url/baz'],
],
```

1つのセクションだけを追加したいプラグインは、[EVENT_REGISTER_CP_NAV_ITEMS](craft3:craft\web\twig\variables\Cp::EVENT_REGISTER_CP_NAV_ITEMS) イベントを使うのではなく、プライマリプラグインクラスの `$hasCpSection` プロパティで設定できます。

```twig
{% set selectedSubnavItem = 'bar' %}
```

## プラグインセクション

[getCpNavItem()](craft3:craft\base\PluginInterface::getCpNavItem()) メソッドで上書きすることによって、プラグインのコントロールパネルのナビゲーション項目の外観を変更できます。

```php
<?php

namespace ns\prefix;

class Plugin extends \craft\base\Plugin
{
    public $hasCpSection = true;

    // ...
}
```

::: tip
You can alternatively set a `hasCpSection` value in `composer.json` as noted in the [plugin guide](plugin-guide.md#compser-json). We don’t recommend setting it in both places, however, since the value set in `composer.json` will override your public class property’s value and likely create confusion.
:::

プラグインのセクションをクリックすると、ユーザーは`/admin/plugin-handle` に移動し、プラグインの[テンプレートルート](template-roots.md)（ベースソースフォルダ内の `templates/` フォルダ）内の `index.html` または `index.twig` テンプレートをロードしようと試みます。

```php
public function getCpNavItem()
{
    $item = parent::getCpNavItem();
    $item['badgeCount'] = 5;
    $item['subnav'] = [
        'foo' => ['label' => 'Foo', 'url' => 'plugin-handle/foo'],
        'bar' => ['label' => 'Bar', 'url' => 'plugin-handle/bar'],
        'baz' => ['label' => 'Baz', 'url' => 'plugin-handle/baz'],
    ];
    return $item;
}
```

::: tip
コントロールパネルのテンプレート開発の詳細については、[コントロールパネルのテンプレート](cp-templates.md)を参照してください。
:::

あるいは、プラグインの `init()` メソッドからコントロールパネルのルートを登録することによって、`/admin/plugin-handle` のリクエストをコントローラーアクション（または、他のテンプレート）にルーティングできます。

::: tip
See [Control Panel Templates](cp-templates.md) for more information about developing Control Panel templates.
:::

Alternatively, you can route `/admin/plugin-handle` requests to a controller action (or a different template) by registering a control panel route from your plugin’s `init()` method:

```php
use craft\events\RegisterUrlRulesEvent;
use craft\web\UrlManager;
use yii\base\Event;

public function init()
{
    Event::on(
        UrlManager::class,
        UrlManager::EVENT_REGISTER_CP_URL_RULES,
        function(RegisterUrlRulesEvent $event) {
            $event->rules['plugin-handle'] = 'plugin-handle/foo/bar';
        }
    );
}
```
