<template>
  <RouterLink class="icon-link" :to="link">
    <div class="icon absolute left-0 w-3 h-3">
      <svg
        width="15"
        height="18"
        viewBox="0 0 15 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.5834 3.17429V17.2419H3.0429C1.34876 17.2419 0 16.1676 0 14.5694V2.38817C0 1.52403 0.7749 0.816406 1.72187 0.816406H12.4018V12.8933H3.0429C1.86604 12.8933 1.03337 13.4692 1.03337 14.5173V14.57C1.03337 15.6175 1.86604 16.2986 3.0429 16.2986H13.7796V3.17429H14.5834ZM12.4018 14.2031H3.1572C2.89856 14.2031 2.66974 14.3338 2.66974 14.5434C2.66974 14.8054 2.89963 14.9366 3.1572 14.9366H12.4017V14.2031H12.4018Z"
          fill="#718096"
        />
      </svg>
    </div>
    <div class="ml-5">
      <span class="leading-none text-lg font-medium block mb-1">{{
        title
      }}</span
      ><span class="text-sm text-slate block leading-tight">{{
        subtitle
      }}</span>
    </div>
  </RouterLink>
</template>

<style lang="postcss">
.icon-link {
  @apply block relative;

  .icon {
    svg {
      @apply max-w-full h-auto;
    }
  }

  &:hover {
    @apply no-underline !important;
  }
}
</style>

<script>
export default {
  props: ["icon", "title", "link", "subtitle", "repo"]
};
</script>
