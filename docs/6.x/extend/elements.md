# Elements

## Edit Screens

## Indexes

## Queries

## Conditions

Craft uses _conditions_ throughout the control panel, in two main ways:

- **Matching** — Define requirements that a single element is tested against, like field layout elements or tabs.
- **Queries** — Build set of criteria that affect an element query, like filters applied to an element index.

Both systems involve a root condition, specific to an element type, inheriting from `CraftCms\Cms\Element\Conditions\ElementCondition`.
Its main responsibility is to provide a list of relevant _rules_:

```php
class ProductCondition extends ElementCondition
{
    #[Override]
    protected function selectableConditionRules(): array
    {
        return array_merge(parent::selectableConditionRules(), [
            PriceConditionRule::class,
            VendorConditionRule::class,
            // ...
        ]);
    }
}
```

Within a condition, zero or more [rules](#rules) establish the actual criteria.

::: tip
An empty set is typically treated as permissive rather than exclusive.
Take the **Visibility Conditions** on field layout elements, for example: Craft assumes the field will be visible in all circumstances, until at least one rule is added.
:::

### Rules

A single class can implement interfaces to support both use cases:

```php
use CraftCms\Cms\Condition\BaseConditionRule;
use CraftCms\Cms\Element\Conditions\Contracts\ElementConditionRuleInterface;
use CraftCms\Cms\Element\Conditions\Contracts\ElementQueryConditionRuleInterface;

class DistanceConditionRule extends BaseConditionRule implements ElementConditionRuleInterface, ElementQueryConditionRuleInterface
{
    public float $lat;
    public float $lng;
    public float $radius;
    public RadiusUnit $radiusUnit = RadiusUnit::Kilometers;

    public function getLabel(): string
    {
        return t('Within distance', category: 'my-plugin');
    }

    public function modifyQuery(Builder $query, ElementQueryInterface $elementQuery): void
    {
        // ...
    }

    public function matchElement(ElementInterface $element): bool
    {
        // ...
    }
}
```

We provide a number of starting points for common value types, like `CraftCms\Cms\Condition\BaseTextConditionRule`, `BaseDateRangeConditionRule`, or `BaseElementSelectConditionRule`.
Each comes with a default set of appropriate operators that are exposed in the rule’s UI, like “starts with,” “contains,” or “between.”

## Actions

