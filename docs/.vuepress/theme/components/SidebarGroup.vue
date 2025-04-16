<template>
  <section
    class="sidebar-group mt-4"
    :class="[
      {
        collapsible,
        'is-sub-group': depth !== 0,
      },
      `depth-${depth}`,
    ]"
  >
    <component 
      :id="fixedHeadingId" 
      :is="headingLevel"
    >
      <RouterLink
        v-if="item.path"
        class="sidebar-heading clickable"
        :class="{
          open,
          active: isActive($route, item.path),
        }"
        :to="item.path"
        @click.native="$emit('toggle')"
      >
        <span>{{ item.title }}</span>
        <span v-if="collapsible" class="arrow" :class="open ? 'down' : 'right'" />
      </RouterLink>

      <button
        v-else-if="collapsible"
        class="sidebar-heading"
        :class="{ open }"
        @click="$emit('toggle')"
      >
        <span>{{ fixedHeading || item.title }}</span>
        <span class="arrow" :class="open ? 'down' : 'right'" />
      </button>

      <p
        v-else
        class="sidebar-heading"
        :class="{ open }"
      >
        <span>{{ fixedHeading || item.title }}</span>
      </p>
    </component>

    <DropdownTransition>
      <SidebarLinks
        v-if="open || !collapsible"
        class="sidebar-group-items"
        :items="item.children"
        :sidebar-depth="item.sidebarDepth || sidebarDepth"
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
    DropdownTransition,
  },

  props: {
    item: {
      type: Object
    },
    open: {
      type: Boolean
    },
    collapsible: {
      type: Boolean
    },
    depth: {
      type: Number
    },
    sidebarDepth: {
      type: Number
    },
    fixedHeading: {
      type: String
    },
    fixedHeadingId: {
      type: String
    },
    headingLevel: {
      type: String,
      default: 'h3'
    }
  },

  // ref: https://vuejs.org/v2/guide/components-edge-cases.html#Circular-References-Between-Components
  beforeCreate() {
    this.$options.components.SidebarLinks = require("./SidebarLinks.vue").default;
  },

  methods: { isActive },
};
</script>

<style lang="postcss">
.sidebar-group {
  &.group-0 {
    @apply mt-0;
  }

  &:not(.collapsible) {
    .sidebar-heading:not(.clickable) {
      @apply cursor-auto;
      color: inherit;
    }
  }

  &.is-sub-group {
    padding-left: 0;

    & > .sidebar-heading {
      @apply font-normal pl-8;
      font-size: 0.95em;
      line-height: 1.4;

      &:not(.clickable) {
        @apply opacity-50;
      }
    }

    & > .sidebar-group-items {
      @apply pl-4;

      & > li > .sidebar-link {
        font-size: 0.95em;
      }
    }
  }
}

.sidebar-heading {
  @apply px-4 cursor-pointer font-bold m-0 box-border w-full;
  text-align: left;
  transition: color 0.15s ease;

  &.open,
  &:hover {
    color: inherit;
  }

  .arrow {
    @apply relative;
    top: -0.12em;
    left: 0.5em;
  }

  &.clickable {
    &.active {
      @apply font-semibold text-blue;
    }

    &:hover {
      @apply text-blue;
    }
  }
}

.sidebar-group-items {
  @apply overflow-hidden;
  transition: height 0.1s ease-out;
  font-size: 0.95em;
}
</style>
