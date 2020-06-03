<template>
  <div class="code-placeholder" title="Placeholder value; yours may differ.">
    <slot></slot>
  </div>
</template>

<style lang="postcss">
.code-placeholder {
  @apply inline-block bg-blue text-white rounded;
  padding: 0.05rem 0.25rem;
  @apply opacity-50;

  &:hover {
    @apply opacity-100;
  }
}
</style>

<script>
export default {};
</script>