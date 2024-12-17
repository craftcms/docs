<template>
  <div>
    <span id="nav-hamburger-label" class="sr-only" aria-hidden="true">Menu</span>
    <button @click="handleClick" class="nav-hamburger" aria-labelledby="nav-hamburger-label">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
</template>

<style lang="postcss">
.nav-hamburger {
  @apply rounded absolute inline-block;
  height: 38px;
  width: 37px;
  top: 10px;
  left: 1rem;

  &:focus {
    @apply outline-none;
  }

  span {
    @apply block absolute left-0;
    background: var(--hamburger-color);
    top: 12px;
    left: 9px;
    width: 19px;
    height: 2px;
  }

  span + span {
    top: 18px;
  }

  span + span + span {
    top: 24px;
  }
}

@screen md {
  .nav-hamburger {
    left: 2rem;
  }
}

@screen lg {
  .nav-hamburger {
    @apply hidden;
  }
}
</style>

<script>
export default {
  methods: {
    handleClick(e) {
      this.$emit("click", e);
    },
  },
};
</script>