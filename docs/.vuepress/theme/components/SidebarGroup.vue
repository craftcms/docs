<template>
  <section
    class="sidebar-group"
    :class="[
      {
        collapsable,
        'is-sub-group': depth !== 0
      },
      `depth-${depth}`
    ]"
  >
    <RouterLink
      v-if="item.path"
      class="sidebar-heading clickable"
      :class="{
        open,
        'active': isActive($route, item.path)
      }"
      :to="item.path"
      @click.native="$emit('toggle')"
    >
      <span>{{ item.title }}</span>
      <span v-if="collapsable" class="arrow" :class="open ? 'down' : 'right'" />
    </RouterLink>

    <p v-else class="sidebar-heading" :class="{ open }" @click="$emit('toggle')">
      <span>{{ fixedHeading || item.title }}</span>
      <span v-if="collapsable" class="arrow" :class="open ? 'down' : 'right'" />
    </p>

    <DropdownTransition>
      <SidebarLinks
        v-if="open || !collapsable"
        class="sidebar-group-items"
        :items="item.children"
        :sidebar-depth="item.sidebarDepth"
        :depth="depth + 1"
      />
    </DropdownTransition>
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
.sidebar-group {
  @apply mt-4;

  &.group-0 {
    @apply mt-0;
  }
}
</style>

<style lang="stylus">
.sidebar-group {
  &:not(.collapsable) {
    .sidebar-heading:not(.clickable) {
      cursor: auto;
      color: inherit;
    }
  }

  // refine styles of nested sidebar groups
  &.is-sub-group {
    padding-left: 0;

    & > .sidebar-heading {
      font-size: 0.95em;
      line-height: 1.4;
      font-weight: normal;
      padding-left: 2rem;

      &:not(.clickable) {
        opacity: 0.5;
      }
    }

    & > .sidebar-group-items {
      padding-left: 1rem;

      & > li > .sidebar-link {
        font-size: 0.95em;
      }
    }
  }
}

.sidebar-heading {
  @apply: px-4;
  color: $textColor;
  transition: color 0.15s ease;
  cursor: pointer;
  font-weight: bold;
  // text-transform uppercase
  width: 100%;
  box-sizing: border-box;
  margin: 0;

  &.open, &:hover {
    color: inherit;
  }

  .arrow {
    position: relative;
    top: -0.12em;
    left: 0.5em;
  }

  &.clickable {
    &.active {
      font-weight: 600;
      color: $accentColor;
    }

    &:hover {
      color: $accentColor;
    }
  }
}

.sidebar-group-items {
  transition: height 0.1s ease-out;
  font-size: 0.95em;
  overflow: hidden;
}
</style>
