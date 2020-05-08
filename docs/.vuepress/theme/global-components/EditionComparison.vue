<template>
  <table>
    <tbody>
      <fragment v-for="(feature, index) in features" :key="index">
        <tr v-if="feature.category" class="category">
          <td class="feature">
            <b>{{ feature.category }}</b>
          </td>
          <td class="edition">Lite</td>
          <td class="edition">Pro</td>
        </tr>
        <tr v-for="item in feature.items" :key="item.name">
          <td>
            <span>{{ item.name }}</span>
            <info-hud v-if="item.info" class="info"
              ><span class="smaller">{{ item.info }}</span></info-hud
            >
          </td>
          <td class="support">
            <check-mark v-if="item.lite" label="supported in Commerce Lite" />
          </td>
          <td class="support">
            <check-mark v-if="item.pro" label="supported in Commerce Pro" />
          </td>
        </tr>
      </fragment>
    </tbody>
  </table>
</template>

<script>
import CheckMark from "./CheckMark";
import InfoHud from "./InfoHud";
import { Fragment } from "vue-fragment";

export default {
  components: { Fragment, CheckMark, InfoHud },
  data() {
    return {
      features: [
        {
          category: "Checkout",
          items: [
            {
              name: "Front end cart",
              lite: true,
              pro: true
            },
            {
              name: "Add products/purchasables to cart",
              lite: true,
              pro: true
            },
            {
              name: "Attach arbitrary data to line items",
              lite: true,
              pro: true
            },
            {
              name: "Update line item quantity",
              lite: true,
              pro: true
            },
            {
              name: "Add multiple line items to cart",
              pro: true
            }
          ]
        },
        {
          category: "Promotions",
          items: [
            {
              name: "Sales",
              lite: true,
              pro: true
            },
            {
              name: "Discounts",
              info:
                "Custom rules that can reduce the price of items in the cart based on things like minimum order quantity or price.",
              pro: true
            },
            {
              name: "Coupon codes",
              pro: true
            }
          ]
        },
        {
          category: "Shipping",
          items: [
            {
              name: "Single shipping cost+price for orders",
              lite: true,
              pro: true
            },
            {
              name: "Unlimited shipping methods, categories, and zones",
              info: "Any shipping method may include complex shipping rules.",
              pro: true
            },
            {
              name: "Customer shipping method selection",
              pro: true
            }
          ]
        },
        {
          category: "Taxes",
          items: [
            {
              name: "Single tax rate for all orders",
              lite: true,
              pro: true
            },
            {
              name: "Unlimited tax categories and zones",
              info:
                "Custom tax rules based on configurable multi-state or multi-country zones.",
              pro: true
            },
            {
              name: "VAT Business ID validation for tax rates",
              pro: true
            }
          ]
        },
        {
          category: "Orders",
          items: [
            {
              name: "Create orders in the control panel",
              pro: true
            },
            {
              name:
                "Custom PHP adjusters for modifying tax, shipping, and discounts",
              pro: true
            }
          ]
        }
      ]
    };
  }
};
</script>

<style>
table {
  display: table;
  border: 0;
  width: 100%;
  position: relative;
  overflow: visible;
}

td,
tr {
  border: 0;
}

.category {
  border-top: 0;
  font-weight: bold;
}

.category .feature {
  font-size: 1.25rem;
  padding-left: 0;
}

.category td {
  padding-top: 2rem;
  border: 0;
}

.edition {
  width: 15%;
  text-align: left;
}

.support {
  position: relative;
  overflow: visible;
  font-weight: bold;
}

.info {
  margin-left: 0.75rem;
}

.smaller {
  font-size: 0.9rem;
  line-height: 1.25rem;
}
</style>
