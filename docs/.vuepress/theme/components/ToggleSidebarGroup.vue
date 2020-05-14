<template>
  <section
    class="toggle-sidebar-group pl-0 mt-2 bg-red"
    :class="[
      {
        collapsable,
        'is-sub-group': depth !== 0
      },
      `depth-${depth}`
    ]"
  >
    <h3
      class="pl-4 text-sm capitalize tracking-widest cursor-pointer select-none"
      @click="open = ! open"
    >MOAR!</h3>
    <SidebarLinks
      v-if="open"
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

  props: ["item", "open", "collapsable", "depth", "fixedHeading"],

  // ref: https://vuejs.org/v2/guide/components-edge-cases.html#Circular-References-Between-Components
  beforeCreate() {
    this.$options.components.SidebarLinks = require("./SidebarLinks.vue").default;
  },

  methods: { isActive }
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
}
</style>
