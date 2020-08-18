<template>
  <div class="right-bar">
    <ColorModeToggle v-on="$listeners" />
    <div class="sidebar-link-wrapper">
      <SidebarLinks
        :depth="0"
        :items="headingItems"
        fixed-heading="On this Page"
      />
    </div>
  </div>
</template>

<script>
import SidebarLinks from "./SidebarLinks";
import ColorModeToggle from "./ColorModeToggle";

export default {
  components: {
    SidebarLinks,
    ColorModeToggle
  },
  props: ["headingItems"],
};
</script>

<style lang="postcss">
.right-bar {
  @apply w-64 absolute right-0 top-0 bottom-0 hidden;

  .sidebar-heading {
    @apply text-xs mx-0 tracking-wide uppercase;
    padding: 0.35rem 0;
    border-left: none;
  }
  
  .sidebar-link-wrapper {
    @apply fixed mt-24 w-64 pt-1 overflow-hidden;
  }

  .sidebar-group:not(.collapsable) .sidebar-heading:not(.clickable) {
    color: #a0aec0;
  }

  .sidebar-links {
    @apply ml-0 pl-0 pb-4 overflow-y-auto;
    max-height: calc(100vh - 6.5rem);

    .sidebar-links {
      @apply pb-0;
      max-height: none;
    }

    .sidebar-link {
      @apply mx-0 px-0 text-slate border-0 pr-4;
      opacity: 0.6;

      &.active {
        @apply opacity-100 text-slate;
      }
    }
  }
}

@screen xl {
  .right-bar {
    @apply block;
    width: calc(50% - 384px);
  }
}

@screen xxl {
  .right-bar {
    .sidebar-links {
      max-height: calc(100vh - 12.5rem);
      .sidebar-links {
        @apply pb-0;
        max-height: none;
      }
    }
  }
}
</style>
