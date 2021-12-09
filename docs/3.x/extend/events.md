# Events

Craft has all kinds of events you can use to customize how things work. See [Using Events in a Custom Module](https://craftcms.com/knowledge-base/custom-module-events) for an example of how to wire up event code using a module.

## Event Code Generator

Select an event for more detail and code snippet.

<event-browser source="craft" />

## Common Event Flows

### Saving Entries

While every element in Craft CMS has a common set of events your custom code can subscribe to, the entry-saving workflow is one of the most common and complex.

::: tip
See [Handling Entry Saves](https://craftcms.com/knowledge-base/handling-entry-saves) for more on entry-specific concepts.
:::

Generally, entries progress through the following order of operations:

1. Pre-flight checks that trigger `EVENT_BEFORE_SAVE`.
2. Validation that triggers `EVENT_BEFORE_VALIDATE` and `EVENT_AFTER_VALIDATE`.
3. Saving for the initial site that triggers `EVENT_AFTER_SAVE`.
4. Propagating non-translatable changes to the entry’s other sites, which repeats steps 1-3 for each site before triggering `EVENT_AFTER_PROPAGATE`.
