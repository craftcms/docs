# Order Status Emails

Once you’re using [order statuses](custom-order-statuses.md#functionality) to manage your orders, you can optionally choose to send emails when an order moves into a particular status.

For example, you might create an email called “Customer Order Confirmation” which emails a completed order summary to the customer. This would be linked to the default order status since we want it to trigger when the cart’s completed and becomes an order.

Another email could be “Admin Order Notification”, also attached to the default order status. Instead of being sent to the customer, however, it could go to the store owner’s email address and include stock or packing information.

## Settings

Before setting up emails for Craft Commerce, ensure that your Craft CMS installation is [properly configured for email delivery](https://craftcms.com/guides/why-doesnt-craft-send-emails#setting-up-email).
You can set up your email gateway by navigating to Settings → Email in the control panel.

::: tip
Commerce emails are sent in Craft queue jobs, so sending may be delayed depending on how your queue is configured to run. See the [runQueueAutomatically](https://craftcms.com/docs/3.x/config/config-settings.html#runqueueautomatically) config setting and notes.
:::

By default, Commerce will send messages using Craft’s “System Email Address” and “Sender Name” found in Settings → Email Settings in the control panel. If you’d like to override this and provide your own from name/address, navigate to _Commerce_ → _System Settings_ → _General Settings_ and enter your own “Status Email Address” and “From Name”.

## Creating an Email

To create a new email, navigate to _Commerce_ → _System Settings_ → _Emails_, and click “New Email”:

<img src="./assets/new-email-settings.png" width="645" alt="New Email Settings.">

Emails have the following configuration settings:

### Name

Enter the name of this email as it will be shown when managing it in the control panel.

### Email Subject

The subject of the email, which can be plain text or use Twig to set dynamic values. Two special variables are available:

-   `order` is a populated [Order object](commerce3:craft\commerce\elements\Order).
-   `orderHistory` is a populated [OrderHistory object](commerce3:craft\commerce\models\OrderHistory).

`order` is the cart or order relevant to the notification. The “Email Subject” we enter, for example, might be:

```twig
Order #{{ order.id }} received.
```

### Recipient

The “To” address or addresses for this email.

If “Send to the customer” is selected, the email will only be sent to the order’s customer in the language (locale) that customer used placing the order. This affects the use of the `|t` filter in other email fields that support Twig.

If “Send to custom recipient” is selected, an email address can be entered. The language of this email will be in the language of whatever user triggers the status change.

Like the [Email Subject](#email-subject), this field takes plain text as well as Twig values. Two special variables are available:

-   `order` is a populated [Order object](commerce3:craft\commerce\elements\Order).
-   `orderHistory` is a populated [OrderHistory object](commerce3:craft\commerce\models\OrderHistory).

`order` is the cart or order relevant to the notification. The “Recipient” we enter, for example, might be:

```twig
{{ order.email }}
```

This would send the email to the customer that created this order.

### Reply-To Address

The Reply-To address for this email.

This field takes plain text as well as Twig values. Two special variables are available:

-   `order` is a populated [Order object](commerce3:craft\commerce\elements\Order).
-   `orderHistory` is a populated [OrderHistory object](commerce3:craft\commerce\models\OrderHistory).

### BCC’d Recipient

The BCC addresses for this email. Most likely, you would BCC the store owner on order confirmation.

Separate multiple addresses with a comma (`,`).

This field takes plain text as well as Twig values. Two special variables are available:

-   `order` is a populated [Order object](commerce3:craft\commerce\elements\Order).
-   `orderHistory` is a populated [OrderHistory object](commerce3:craft\commerce\models\OrderHistory).

### CC’d Recipient

The CC addresses for this email. Separate multiple addresses with a comma (`,`).

This field takes plain text as well as Twig values. Two special variables are available:

-   `order` is a populated [Order object](commerce3:craft\commerce\elements\Order).
-   `orderHistory` is a populated [OrderHistory object](commerce3:craft\commerce\models\OrderHistory).

### HTML Email Template Path

The path to an HTML template in your site’s `templates/` folder.

This field takes plain text as well as Twig values. Two special variables are available:

-   `order` is a populated [Order object](commerce3:craft\commerce\elements\Order).
-   `orderHistory` is a populated [OrderHistory object](commerce3:craft\commerce\models\OrderHistory).

This allows you to have full design flexibility.

::: warning
Craft [global set variables](https://docs.craftcms.com/api/v3/craft-web-twig-variables-globals.html) are not automatically loaded into your email templates. To access global set variables, first load them into your template:

```twig
{% set globalSetName = craft.globals.getSetByHandle('globalSetName') %}
{{ globalSetName.customFieldName }}
```
:::

### Plain Text Email Template Path

The path to a plain text template in your site’s `templates/` folder.

This works the same way as the “HTML Email Template Path”.


### PDF Attachment

Choose a PDF that will be attached to this email.


## Selecting an Email

To use the email you’ve created, visit _Commerce_ → _System Settings_ → _Order Status_ and choose the Order Status that should send this email when it updates.

Select the email by name in the _Status Emails_ field. You can select as many emails as you’d like for any given Order Status.

![](./assets/order-status-email-selection.png)

Once you choose “Save” the designated emails will be sent when an order is assigned to that status.
