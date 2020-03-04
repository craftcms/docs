# Element Exporters

[[toc]]

Element Exporters in Craft are PHP classes that allow the exporting of elements from their listing dashboard pages to CSV, XML or JSON files.

Craft ships with two exporter types out of the box

- **Raw Data (fastest)** - A simple "dump" of all the element columns from the database
- **Expanded** - Includes the IDs of related elements in [relational fields](../relations.md)
  
![default exporters](../images/exporters-default.png =200x)

Craft 3.4 introduced the concept of custom element exporters, allowing a developer to write their own exporters that will be added to the dropdown on the appropriate element pages in the dashboard.

## Creating Custom Exporters

Craft exporters should extend <api:craft\base\ElementExporter>. 
Their `export()` method should return an array using the array keys as column(CSV) / node(XML) / object(JSON) titles.

Here is a simple exporter that will export only the Title, Status and URL of the element as well as the Title of related elements from a field called `myRelatedElements`;
```php
<?php

namespace ns\prefix\exporters;

use Craft;
use craft\base\Field;
use craft\base\Element;
use craft\base\ElementExporter;
use craft\elements\db\ElementQuery;
use craft\base\EagerLoadingFieldInterface;
use craft\elements\db\ElementQueryInterface;

class MyCustomExporter extends ElementExporter
{
  /**
   * @inheritdoc
   */
  public static function displayName(): string
  {
    return Craft::t('app', 'My Exporter');
  }

  /**
   * @inheritdoc
   */
  public function export(ElementQueryInterface $query): array
  {
    $results = [];

    // Eager-load as much as we can
    $eagerLoadableFields = [];
    foreach (Craft::$app->getFields()->getAllFields() as $field)
    {
      /** @var Field $field */
      if ($field instanceof EagerLoadingFieldInterface)
      {
        $eagerLoadableFields[] = $field->handle;
      }
    }

    /** @var ElementQuery $query */
    $query->with($eagerLoadableFields);


    /** @var Element $element */
    foreach ($query->each() as $element)
    {
      $thisData = [
          'Title'   => $element->title ?? '',
          'Status'  => ucfirst($element->status),
          /* Array of element titles, related elements were eager loaded above */
          'Related' => $this->collectRelatedFieldTitles($element->myRelatedElements),
          'URL'     => $element->getUrl(),
      ];

      $results[] = $thisData;
    }

    return $results;
  }

  /**
   * Extracts element titles from an array of related elements
   *
   * @param Element[] $elements
   * @return array
   */
  private function collectRelatedFieldTitles(array $elements): array
  {
    $titles = [];
    foreach ($elements as $element)
    {
      /** @var Element $element */
      $titles[] = $element->title;
    }

    return $titles;
  }


}
```

::: tip
If a key has an array value (such as the `Related` key above) the output will vary depending on output format.
In CSV format this will be shown as:
``` csv
Related
"[""Value 1"",""Value 2""]"
```
In JSON format it will be:
``` json
"Related": [
    "Value 1",
    "Value 2"
]
```
And in XML it's
``` xml
<Related>
  <elementType>Value 1</elementType>
  <elementType>Value 2</elementType>
</Related>
```
:::

::: tip 
Use PascalCase (UpperCamelCase) or similar format for your returned array's keys as some export formats, particularly XML, may not be able to name nodes, with spaces in the key. 
In the case it can't use the key as the node name (or if the array is un-keyed such as an array of values) the element type (user, entry etc) is used.
:::

::: warning NOTE
The `elementType` shown in the XML example is the element type you are exporting, NOT the type of the related element. 
The above export for a Commerce Product showing some related Entries would be something like:
``` xml
<RelatedEntries>
  <product>Value 1</product>
  <product>Value 2</product>
</RelatedEntries>
```
:::



## Registering Custom Exporters

In order to have the option to export using your custom exporter we need to register it for use.

Register your exporter in addition to the default exporters in your module / plugin's `init()` method as follows:

``` php{4}
Event::on(craft\base\Element::class,
    craft\base\Element::EVENT_REGISTER_EXPORTERS,
    function (yii\base\Event $event) {
      $event->exporters[] = ns\prefix\exporters\MyCustomExporter::class;
    });
```
If you want to **replace** the exporters rather than extend them change the highlighted line above to `$event->exporters = [ns\prefix\exporters\MyCustomExporter::class];`

Your custom exporter should now be available to you in the Elements Export button

![custom exporter added](../images/exporters-custom.png =200x)

::: tip 
To restrict the exporter to a particular type of element (Entry, Category, Product etc.) you can register against only those types rather than all elements.

``` php
Event::on(craft\commerce\elements\Product::class,
    craft\commerce\elements\Product::EVENT_REGISTER_EXPORTERS,
    function (yii\base\Event $event) {
      $event->exporters[] = ns\prefix\exporters\MyCustomExporter::class;
    });
```
:::



