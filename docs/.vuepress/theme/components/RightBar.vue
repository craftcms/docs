<template>
  <div class="right-nav">
    <div class="fixed mt-24 w-64 pt-1">
      <SidebarLinks :depth="0" :items="headingItems" fixed-heading="On this Page" />
    </div>
  </div>
</template>

<script>
import SidebarLinks from "./SidebarLinks";

export default {
  components: {
    SidebarLinks
  },
  props: ["headingItems"]
};
</script>

<style lang="postcss">
.right-nav {
  @apply w-64 absolute right-0 top-0 hidden;
}

@screen xl {
  .right-nav {
    @apply block;
    width: calc(50% - 384px);
  }
}
</style>