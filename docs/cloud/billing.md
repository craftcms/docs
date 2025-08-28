# Billing

Every Cloud project starts with a [free 7-day trial](#trials). At the end of the trial, you pay for the next month or a year of service. We currently do not support switching from monthly to yearly billing, or vice-versa.

Like the Plugin Store and Developer Support plans, all Craft Cloud payments are processed with [Stripe](https://stripe.com/).

## Trials

You must have a valid payment method on file to start a seven-day trial of Craft Cloud, but you will not be billed until the end of the trial. If you cancel prior to your first bill, you will not be charged for any services.

Trials provide access to all Cloud features, except for custom domains. Connecting a custom domain will prompt you to skip the trial and immediately start a subscription. Either way, you always have access to a [preview domain](/knowledge-base/cloud-domains).

## Personal Accounts + Organizations

Payment methods for personal accounts and organizations are separate. You will only be able to create Cloud projects in an account or organization that has a current payment method on file.

**All Cloud projects are billed to the primary payment method on the account or organization it was created in.**

Read more about [managing payment methods](/knowledge-base/craft-console-organizations#managing-payment-information) on Craft Console.

## Billing History

View the billing history for a Cloud project by navigating to its **Settings** screen. You can view *all* invoices for the current account or organization by clicking the gear icon in the toolbar at the top of any screen, then selecting **Billing**.

## Cancellation

To cancel an active Cloud project subscription, navigate to the project’s **Settings** screen in Craft Console and click **Cancel Project** within the **Danger Zone** section.

### Reactivation

Canceled projects can be reactivated until the end of the current billing period. Partial refunds are not issued for early cancellation or deletion of a project.

### Deletion

Once a project is canceled, you may immediately delete it via the same **Danger Zone**. We do not provide refunds for projects deleted prior to the end of the final billing period.

::: warning
Deleted projects *immediately* stop serving traffic, and cannot be reactivated or recovered.
:::

## Disputes and Refunds

Please email <support@craftcms.com> or use our [contact form](https://craftcms.com/contact) if you have questions or concerns about billing. For prompt support, use the email associated with your Craft Console account, and include the Project’s **Name** and **ID**. Your Project ID can be found in its Craft Console URL:

```
/accounts/{org-name}/cloud/projects/{project-id}
```

## Failed Payments

We will notify you as soon as we detect problems with the payment method on file, and prior to any automated changes in your project’s status or availability. Set up a new payment method as soon as possible to avoid service disruptions!

::: tip
All billing-related communication will be sent from notifications@craft.cloud. If your project is managed within a Craft Console [organization](/knowledge-base/craft-console-organizations), all its owners will be notified of billing issues.
:::

**Keep a valid payment method on file and monitor the inbox associated with your Craft Console account to avoid billing issues.** We strongly recommend using [organizations](kb:craft-console-organizations) for Craft Cloud projects—adding a second owner ensures that critical billing notifications are sent to users that can act on them.
