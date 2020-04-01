# Build JSON endpoints with Element API

Another way you can work with Craft CMS content is using the first-party [Element API plugin](https://plugins.craftcms.com/element-api).

The Element API provides a configuration-driven routing system for retrieving content elements via JSON.

For example, you might configure a paginated endpoint for listing ingredients:

```php
'ingredients.json' => function() {
    return [
        'criteria' => ['section' => 'ingredients'],
        'elementsPerPage' => 10,
        'transformer' => function(craft\elements\Entry $entry) {
            return [
                'title' => $entry->title,
                'url' => $entry->url,
                'jsonUrl' => UrlHelper::url("ingredients/{$entry->slug}.json"),
            ];
        },
        'pretty' => true,
    ];
},
```

It would respond with JSON like this:

```json
{
    "data": [
        {
            "title": "Gin",
            "url": "/ingredients/gin",
            "jsonUrl": "/ingredients/gin.json"
        },
        {
            "title": "Tonic Water",
            "url": "/ingredients/tonic-water",
            "jsonUrl": "/ingredients/tonic-water.json"
        },
        // ...
    ],
    "meta": {
        "pagination": {
            "total": 66,
            "count": 10,
            "per_page": 10,
            "current_page": 1,
            "total_pages": 7,
            "links": {
                "next": "/ingredients.json?p=2"
            }
        }
    }
}
```

There’s more configuration required than the GraphQL API, and you can learn about installing and using the Element API from the comprehensive project readme: <https://github.com/craftcms/element-api>


The Element API provides a public, read-only JSON interface. If you need to add authentication or your own business logic, you’ll need to write your own module or plugin with a custom controller.