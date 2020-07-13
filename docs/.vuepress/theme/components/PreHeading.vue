<template>
  <div class="pre-heading">
    <h4
      v-if="this.$page.frontmatter[0].preheading"
      class="preheading"
    >{{ this.$page.frontmatter[0].preheading }}</h4>
  </div>
</template>

<style lang="postcss">
.theme-default-content {
  .preheading {
    @apply my-0 py-0 -mb-1 leading-none uppercase text-base tracking-wider;
    color: #a0aec0;
  }
}
</style>

<script>
export default {};
</script>
