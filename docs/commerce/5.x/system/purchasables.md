# Purchasables

The core of anything sold with Commerce is a _purchasable_, a special type of [element](/5.x/system/elements.md) that conforms to an interface that guarantees it can be added to a cart.

Commerce ships with two types of purchasables: [variants](products-variants.md#variants) and [donations](donations.md). Somewhat counterintuitively, [products](products-variants.md) are _not_ purchasables!

## Line Items

When a customer adds a purchasable to their [cart](orders-carts.md), Commerce represents it as a _line item_.

Line items capture a reference to the purchasable and some vital properties like the price, dimensions, weight. They can also hold customer notes, private notes, and arbitrary _options_ data.

<See path="orders-carts.md" label="Line Items" description="Learn more about the features and capabilities of line items." />

### Snapshots

When a line item is populated from a purchasable, a JSON snapshot is saved on that line item. The snapshot provides a permanent record of whatever the purchasable looked like in that moment, regardless of how products or variations change over time. The snapshot will persist, regardless of any store changes after checkout.

<toggle-tip title="Example Snapshot">

```json
{
  "isDefault": false,
  "sortOrder": 1,
  "deletedWithProduct": false,
  "width": null,
  "height": null,
  "length": null,
  "weight": null,
  "freeShipping": false,
  "promotable": false,
  "availableForPurchase": true,
  "minQty": null,
  "maxQty": null,
  "inventoryItemId": 1,
  "inventoryTracked": false,
  "eagerLoadInfo": null,
  "id": 114,
  "tempId": null,
  "draftId": null,
  "revisionId": null,
  "isProvisionalDraft": false,
  "uid": "639a0373-cd9a-4d5b-9a48-860e4ebf355d",
  "siteSettingsId": 119,
  "fieldLayoutId": 12,
  "enabled": true,
  "archived": false,
  "siteId": 2,
  "title": "Advanced Unit",
  "slug": "__temp_gpyrlszcdnezpempgaxfzzryspgsylgjnojs",
  "uri": null,
  "dateCreated": "2024-07-01T16:02:32-07:00",
  "dateUpdated": "2024-07-10T09:23:04-07:00",
  "dateLastMerged": null,
  "dateDeleted": null,
  "deletedWithOwner": null,
  "trashed": false,
  "isNewForSite": false,
  "forceSave": false,
  "fieldId": null,
  "canonicalId": 114,
  "cpEditUrl": "#",
  "isDraft": false,
  "isRevision": false,
  "isUnpublishedDraft": false,
  "ref": null,
  "status": "enabled",
  "structureId": null,
  "url": "https://my-project.ddev.site/widgets/thingamabob?variant=114",
  "isAvailable": true,
  "isPromotable": false,
  "price": 8.99,
  "promotionalPrice": null,
  "basePrice": 8.99,
  "basePromotionalPrice": null,
  "onPromotion": false,
  "salePrice": 8.99,
  "sku": "WIDGET-THINGY-ADVANCED",
  "stock": 0,
  "product": {
    "postDate": "2024-07-01T16:02:03-07:00",
    "expiryDate": null,
    "typeId": 1,
    "defaultVariantId": 142,
    "defaultSku": "WIDGET-THINGY-BASIC",
    "defaultHeight": null,
    "defaultLength": null,
    "defaultWidth": null,
    "defaultWeight": null,
    "taxCategory": null,
    "name": null,
    "eagerLoadInfo": null,
    "id": 113,
    "tempId": null,
    "draftId": null,
    "revisionId": null,
    "isProvisionalDraft": false,
    "uid": "40cdabfe-c7ca-4a49-be20-f55be18531cd",
    "siteSettingsId": 117,
    "fieldLayoutId": 11,
    "enabled": true,
    "archived": false,
    "siteId": 2,
    "title": "Thingamabob",
    "slug": "thingamabob",
    "uri": "widgets/thingamabob",
    "dateCreated": "2024-07-01T16:02:03-07:00",
    "dateUpdated": "2024-07-10T09:23:28-07:00",
    "dateLastMerged": null,
    "dateDeleted": null,
    "deletedWithOwner": null,
    "trashed": false,
    "isNewForSite": false,
    "forceSave": false,
    "canonicalId": 113,
    "cpEditUrl": "https://my-project.ddev.site/admin/commerce/products/widgets/113-thingamabob",
    "isDraft": false,
    "isRevision": false,
    "isUnpublishedDraft": false,
    "ref": null,
    "status": "live",
    "structureId": null,
    "url": "https://my-project.ddev.site/widgets/thingamabob"
  },
  "description": "Thingamabob - Advanced Unit",
  "purchasableId": 114,
  "options": [],
  "sales": []
}
```

</toggle-tip>

Snapshot data can be essential in cases where you need to [display a completed order](../development/orders.md)’s line items in a template but the product and variant have since been deleted. This only applies to completed orders, though—if a purchasable is deleted prior to checkout, any line items that refer to it are automatically removed from customers’ carts and [notices](orders-carts.md#order-notices) are attached with a description of what happened.

When building your front end and displaying line items, it’s best to reference purchasable information retrieved via `lineItem.getPurchasable()`. The `snapshot` property is a plain array, and will not have many of the [variant](commerce5:craft\commerce\elements\Variant) and [product](commerce5:craft\commerce\elements\Product) methods you would expect, having dealt with them elsewhere in your templates:

```twig
{# Set a fallback for the purchasable info: #}
{% set purchasable = lineItem.getPurchasable() ?? lineItem.snapshot %}
```

To avoid recursive references and other serialization issues, snapshots do _not_ automatically include custom field data for variants or products. You can customize what additional fields are stored in a snapshot via the [Variant::EVENT_BEFORE_CAPTURE_VARIANT_SNAPSHOT](commerce5:craft\commerce\elements\Variant::EVENT_BEFORE_CAPTURE_VARIANT_SNAPSHOT) event, or add arbitrary data in reponse to [Variant::EVENT_AFTER_CAPTURE_VARIANT_SNAPSHOT](commerce5:craft\commerce\elements\Variant::EVENT_AFTER_CAPTURE_VARIANT_SNAPSHOT). Similar events exist for product elements, as well.

Snapshots are _not_ an authoritative source for pricing, stock, availability, or other values that can change—they are only intended to serve as way of identifying a purchasable to the customer (and administrators) after an order is completed.

::: tip
To learn more about adding your own custom purchasables, see the [Purchasable Types](../extend/purchasable-types.md) page.
:::
