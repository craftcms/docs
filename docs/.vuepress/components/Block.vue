<template>
  <div class="custom-block">
    <div v-if="label" class="banner">
      <span class="label">{{ label }}</span>
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
  },
};
</script>

<style lang="postcss" scoped>
.banner {
    @apply mb-5 mt-5;
}

.label {
    @apply uppercase bg-transparent tracking-wider leading-none h-auto font-mono;
    font-size: 0.8em;
    border-color: currentColor;
    border-radius: 3px;
    border-width: 1px;
    opacity: 0.4;
    padding: 4px 8px 3px;
}
</style>
