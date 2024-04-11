# Conditions

The Craft CMS condition builder is a powerful tool that helps content editors and site developers utilize dynamic, rule-based settings.

![Abstracted illustration of a condition builder with a criteria row and an add button](../images/abstracted-condition.png)

There are several places you can find the condition builder in action:

- Conditional field layouts, which make it possible to display specific tabs or fields only when precise criteria are met;
- Custom [sources](../system/elements.md#sources), which are optional element index sources customized to display whatever elements meet the criteria you set;
- Search field filters;
- Craft Commerce’s promotion and shipping rules;

## Architecture

A condition is a group of one or more condition rules that, when combined, can perform a collective task like modifying an element query or matching an element. The rules are available for a control panel user to configure, should they decide to utilize a condition wherever you’ve made it available.

The “condition builder” is the [Htmx](https://htmx.org/)-powered UI framework the control panel user interacts with in their browser.

Custom fields may define condition rule types to be pulled into element conditions. Most built-in field types take advantage of this and are a great source of examples.

Element types also have an opportunity to register their own conditions and condition rules for native attribute types.

At a high level, a condition rule doesn’t know anything about how it will be used. The <craft5:craft\base\conditions\BaseCondition> class does most of the work to stitch things together and construct the appropriate UI. This base condition class is extended by most of Craft’s included conditions, and all of these pieces are integral parts of the condition builder framework.

## Condition Builder Framework

Developers can work with existing conditions or introduce new ones using the condition builder framework.

Conditions need to implement [ConditionInterface](craft5:craft\base\conditions\ConditionInterface). A generic base implementation is provided by [BaseCondition](craft5:craft\base\conditions\BaseCondition).

Condition rules must implement [ConditionRuleInterface](craft5:craft\base\conditions\ConditionRuleInterface). You’ll find a generic [BaseConditionRule](craft5:craft\base\conditions\BaseConditionRule) implementation along with a handful of base condition rules in `base/conditions/` that are geared for common rule formats.

The HTML representation of a condition builder can be generated with `$condition->getBuilderHtml()`, which supports a few builder-specific options:

- `mainTag` – The container tag type (`form`, by default);
- `id` – The HTML container’s `id` attribute;
- `sortable` – Whether the rules should be user-sortable (`true` by default);
- `singleUseTypes` – Whether rules can only be used once within the condition;
- `projectConfigTypes` – Whether to limit the available rules to those which can be stored in the project config (needed for custom sources);

### Element Query Conditions

[Element types](./element-types.md) can provide their own custom condition classes which extend [ElementCondition](craft5:craft\elements\conditions\ElementCondition). Doing so will give them a chance to include additional element type-specific rules, by overriding [conditionRuleTypes()](craft5:craft\elements\conditions\ElementCondition::conditionRuleTypes()) (see [EntryCondition](craft5:craft\elements\conditions\entries\EntryCondition) for an example).

The element type should return an instance of its custom condition class from a static `createCondition()` method.

### Field Condition Rules

[Field types](./field-types.md) can provide a rule type which implements [FieldConditionRuleInterface](craft5:\craft\fields\conditions\FieldConditionRuleInterface) and uses [FieldConditionRuleTrait](craft5:craft\fields\conditions\FieldConditionRuleTrait).
