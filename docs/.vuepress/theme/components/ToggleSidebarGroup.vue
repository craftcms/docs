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
      more ...
      <span class="arrow" :class="{ 'down': ! isOpen, 'up': isOpen }"></span>
    </h3>
    <SidebarLinks
      v-if="isOpen || descendantIsActive(item)"
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
      isOpen: false
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
}
</style>
