<template>
  <div class="pre-heading">
    <h4
      v-if="this.$page.frontmatter && this.$page.frontmatter.preheading"
      class="preheading"
    >{{ this.$page.frontmatter.preheading }}</h4>
  </div>
</template>

<style lang="postcss">
.theme-default-content {
  .preheading {
    @apply my-0 py-0 px-2 relative inline-block leading-normal uppercase rounded text-xs border tracking-wider;
    color: #a0aec0;
  }
}
</style>

<script>
export default {};
</script>
