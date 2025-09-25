<template>
  <div class="pre-heading">
    <h4
      v-if="this.$page.frontmatter && this.$page.frontmatter.preheading"
      class="pre-heading-title"
    >{{ this.$page.frontmatter.preheading }}</h4>
  </div>
</template>

<style lang="postcss">
.theme-default-content {
  .pre-heading-title {
    @apply my-0 py-0 px-2 relative inline-block leading-normal uppercase rounded text-xs border tracking-wider;
    border-color: currentColor;
  }
}
</style>

<script>
export default {};
</script>
