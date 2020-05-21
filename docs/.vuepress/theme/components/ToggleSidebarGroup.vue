<template>
  <section
    class="toggle-sidebar-group pl-0 mt-2"
    :class="[
      {
        collapsable,
        'is-sub-group': depth !== 0
      },
      `depth-${depth}`
    ]"
  >
    <h3 class="pl-4 toggle cursor-pointer select-none" @click="isOpen = ! isOpen">
      {{ isOpen ? "less" : "more" }}
      <span
        class="toggle-arrow"
        :class="{ 'down': ! isOpen, 'up': isOpen }"
      >
        <svg
          width="9"
          height="6"
          viewBox="0 0 11 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="inline-block"
        >
          <path
            d="M5.07812 6.07031L0.742188 1.76367C0.566406 1.58789 0.566406 1.42188 0.742188 1.26562L1.29883 0.679688C1.47461 0.523438 1.64062 0.523438 1.79688 0.679688L5.3125 4.16602L8.82812 0.679688C8.98438 0.523438 9.15039 0.523438 9.32617 0.679688L9.88281 1.26562C10.0586 1.42188 10.0586 1.58789 9.88281 1.76367L5.54688 6.07031C5.39062 6.22656 5.23438 6.22656 5.07812 6.07031Z"
            fill="#a0aec0"
          />
        </svg>
      </span>
    </h3>
    <SidebarLinks
      v-if="isOpen"
      class="sidebar-group-items"
      :items="item.toggleChildren"
      :sidebar-depth="item.sidebarDepth"
      :depth="depth + 1"
    />
  </section>
</template>

<script>
import { isActive } from "../util";
import DropdownTransition from "./DropdownTransition.vue";

export default {
  name: "SidebarGroup",

  components: {
    DropdownTransition
  },

  data() {
    return {
      isOpen: this.descendantIsActive(this.item)
    };
  },

  props: ["item", "open", "collapsable", "depth", "fixedHeading"],

  // ref: https://vuejs.org/v2/guide/components-edge-cases.html#Circular-References-Between-Components
  beforeCreate() {
    this.$options.components.SidebarLinks = require("./SidebarLinks.vue").default;
  },

  methods: {
    isActive,
    descendantIsActive(item) {
      const route = this.$route;
      if (item.type === "group") {
        return item.toggleChildren.some(child => {
          if (child.type === "group") {
            return descendantIsActive(route, child);
          } else {
            return child.type === "page" && isActive(route, child.path);
          }
        });
      }
      return false;
    }
  }
};
</script>

<style lang="postcss">
.toggle-sidebar-group {
  &.group-0 {
    @apply mt-0;
  }

  .sidebar-link {
    @apply pl-4;
  }

  .toggle {
    @apply text-xs tracking-wide uppercase font-bold;
    color: #a0aec0;
  }

  .toggle-arrow {
    @apply relative;
    top: -1px;
    margin-left: 0.125rem;

    &.down {
    }

    &.up {
      svg {
        transform: rotate(-180deg);
      }
    }
  }
}
</style>
