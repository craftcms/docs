# Conditions

The Craft CMS condition builder is a powerful tool that helps content editors and developers utilize dynamic, rule-based settings.

![Abstracted illustration of a condition builder with a criteria row and an add button](../images/abstracted-condition.png)

There are several places you can find the condition builder in action:

- Craft’s conditional field layouts, which make it possible to display specific tabs or fields only when precise criteria are met
- Craft’s Smart Sources, which are optional element index sources customized to display whatever elements meet the criteria you set
- Craft’s search field filters
- Craft Commerce’s promotion and shipping rules

## Architecture

A condition is a group of one or more condition rules that can run programmatically to modify an element query or match an element. The rules are available for a control panel user to configure, should they decide to utilize a condition wherever you’ve made it available.

We refer to the “condition builder” as the sum of the conditions, condition rules, and the Htmx-powered UI framework the control panel user interacts with in their browser.

Custom fields may define condition rule types to be pulled into element conditions. (Most included field types take advantage of this and offer examples.)

Element types can register their own conditions and condition rules for attribute types.

At a high level, a condition rule doesn’t know anything about how it will be used. A base condition class does most of the work to stitch things together and define UI. This base condition class is extended by most of Craft’s included conditions, and all of these pieces are integral parts of the condition builder framework.

## Condition Builder Framework

Developers can work with existing conditions or introduce new ones using the condition builder framework.

Conditions need to implement [ConditionInterface](craft4:craft\conditions\ConditionInterface). A generic base implementation is provided by [BaseCondition](craft4:craft\conditions\BaseCondition), and another base implementation is tailored for modifying a database query: [BaseQueryCondition](craft4:craft\conditions\BaseQueryCondition).

Condition rules must implement [ConditionRuleInterface](craft4:craft\conditions\ConditionRuleInterface); query condition rules must also implement [QueryConditionRuleinterface](craft4:craft\conditions\QueryConditionRuleinterface). You’ll find a generic [BaseConditionRule](craft4:craft\base\conditions\BaseConditionRule) implementation along with a handful of base condition rules in `base/conditions/` that are geared for common rule formats.

A condition builder’s HTML can be generated via `$condition->getBuilderHtml()`, which supports a few builder-specific options:

- `mainTag` – The container tag type (`form` by default)
- `id` – The container ID
- `sortable` – Whether the rules should be user-sortable (`true` by default)
- `singleUseTypes` – Whether rules can only be used once within the condition
- `projectConfigTypes` – Whether to limit the available rules to those which can be stored in the project config (needed for custom sources)

### Element Query Conditions

Element types can provide their own custom condition classes which extend [ElementQueryCondition](craft4:craft\conditions\elements\ElementQueryCondition). Doing so will give them a chance to include additional element type-specific rules, by overriding `conditionRuleTypes()` (see `EntryQueryCondition` for an example).

The element type can return an instance of it from its static `createCondition()` method.

### Field Condition Rules

Field types can provide a rule type which implements `craft\conditions\elements\fields\FieldConditionRuleInterface` and uses `craft\conditions\elements\fields\FieldConditionRuleTrait`.

The field type can return its class name from its `getQueryConditionRuleType()` method.
