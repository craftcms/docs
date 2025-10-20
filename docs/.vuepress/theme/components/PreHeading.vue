<template>
  <div class="pre-heading">
    <h4
      v-if="this.$page.frontmatter && this.$page.frontmatter.preheading"
      class="pre-heading-title"
    >{{ this.$page.frontmatter.preheading }}</h4>
  </div>
</template>

<style lang="postcss">
.pre-heading {
  @apply mb-2;
}

/* This is here for specificity! */
.theme-default-content {
  .pre-heading-title {
    @apply my-0 px-2 relative inline-block leading-normal uppercase rounded text-xs border tracking-wider;
    border-color: currentColor;
    padding-bottom: 0;
    padding-top: 0.2em;
  }
}
</style>

<script>
export default {};
</script>
