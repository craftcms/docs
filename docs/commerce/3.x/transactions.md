# Transactions

A transaction is one distinct interaction between Commerce and a payment gateway as a completed order is being charged or refunded.

The typical checkout flow will involve multiple transactions, with the exact steps depending on your configuration, the payment gateway you’re using, and whether the customer’s payment method is approved.

In Craft Commerce, each of these is represented by a [transaction](commerce3:craft\commerce\models\Transaction) model. A transaction can only have one [type](#transaction-types) and [status](#transaction-statuses), and it may have a relationship to a parent transaction.

In the Craft control panel, you’ll find transactions listed in a **Transactions** tab in any order’s detail page.

## Transaction Types

The transaction type describes the purpose of the transaction and determines how it’s counted when determining order totals.

### `authorize`

A transaction may authorize the customer’s payment method to confirm it can be charged, without actually capturing the order amount. In this case, an authorization will be placed on their card but payment will be captured later.

An authorization transaction can have any one of the available [transaction statuses](#transaction-statuses).

### `capture`

A capture transaction will only ever be the child of a prior authorize transaction that had a `success` status. The capture transaction’s purpose is to claim the entire payment amount from the gateway, similarly to how a check’s payment details would be captured to initiate a bank deposit.

A capture can only have one of two statuses: `success` or `failed`.

- TODO: note capture in non-credit-card contexts

### `purchase`

A purchase transaction is used for immediately charging the customer’s card. (In this case, there won’t be prior authorize or capture transactions.)

A purchase transaction can have any one of the available [transaction statuses](#transaction-statuses).

### `refund`

A refund transaction is used to credit funds back to the customer, and it can only be the child of a successful `capture` or `purchase` transaction.

TODO: list available statuses

## Transaction Statuses

### `pending`

A transaction’s status is `pending` when it’s first created.

That status could be changed from `pending` once the customer or store manager initiates some action that’s handled by the gateway to determine what next status should be.

### `redirect`

The redirect status is used when the customer was sent to an off-site URL to complete the transaction. A redirect status would only apply to authorize and capture transactions—refunds are usually handled by a store manager in the control panel and don’t require off-site steps.

### `processing`

Some gateways handle transactions asynchronously and don’t immediately return a success or failure response. `processing` is a semi-successful and often short-lived status that indicates a transaction is in progress and the gateway will follow up once it’s complete.

An example of this is a Stripe customer being returned to the Craft site from a [SCA](https://stripe.com/docs/strong-customer-authentication) flow. Commerce will update the transaction as `processing` until a Stripe webhook arrives with the results of the bank payment.

Once Commerce sets a `processing` status on an `authorize` or `purchase` transaction, the cart will be completed to become an order. The only way for a customer to complete a cart is to have either a successful purchase, a successful authorization, or a successful `processing` transaction.

### `success`

A `success` status indicates that any one of the [transaction types](#transaction-types) was successful.

### `failed`

A `failed` status indicates that any one of the [transaction types](#transaction-types) was failed.

TODO: where do I find the failure reason?
