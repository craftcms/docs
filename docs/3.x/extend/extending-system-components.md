# Extending System Components

## Custom Validation Rules

You can add your own custom validation rules to elements and other system components using the [EVENT_DEFINE_RULES](api:craft\base\Model#event-define-rules) event.

Additional rules can use any of [Yii’s core validators](https://www.yiiframework.com/doc/guide/2.0/en/tutorial-core-validators), [Craft’s validators](https://github.com/craftcms/cms/tree/develop/src/validators), or an [inline validation method](https://www.yiiframework.com/doc/guide/2.0/en/input-validation#inline-validators).

In this example, we’re adding a 5-item maximum for custom entry fields in a “News” section. It uses Craft’s `ArrayValidator` to easily validate based on the size of an array or element query result (like the Tags field):

```php
use craft\elements\Entry;
use craft\events\DefineRulesEvent;
use craft\validators\ArrayValidator;
use yii\base\Event;

Event::on(Entry::class, Entry::EVENT_DEFINE_RULES, function(DefineRulesEvent $e) {
    /** @var Entry $entry */
    $entry = $e->sender;

    // Only worry about entries in the News section
    if ($entry->section->handle !== 'news') {
        return;
    }

    $e->rules[] = ['field:myTagsField', ArrayValidator::class, 'max' => 5, 'on' => Entry::SCENARIO_LIVE];
    $e->rules[] = ['field:myCheckboxesField', ArrayValidator::class, 'max' => 5, 'on' => Entry::SCENARIO_LIVE];
    $e->rules[] = ['field:myTableField', ArrayValidator::class, 'max' => 5, 'on' => Entry::SCENARIO_LIVE];
});
```
