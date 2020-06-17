<template>
  <div class="post-heading">
    <div class="auto-toc block xl:hidden" v-if="headingItems.length && headingItems[0].children.length">
      <SidebarLinks :depth="0" :items="headingItems" fixed-heading="On this Page" />
    </div>
  </div>
</template>

<style lang="postcss">
.theme-default-content {
  .post-heading {
    .auto-toc {
      @apply w-full mt-3 mb-6 border-t border-b;
    }
    .sidebar-links {
      @apply list-none p-0 mx-0 mb-3;
      li {
        @apply list-none;
        a {
          @apply text-blue px-0;
        }
      }
    }

    .sidebar-heading {
      @apply p-0 text-xs mx-0 mb-2 tracking-wide uppercase;
    }
  }
}
</style>

<script>
import { resolveHeaders } from "../util";
import SidebarLinks from "./SidebarLinks";

export default {
  components: {
    SidebarLinks
  },
  computed: {
    headingItems() {
      return resolveHeaders(this.$page);
    }
  }
};
</script>