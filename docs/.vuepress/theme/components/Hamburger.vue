<template>
  <button @click="handleClick" class="nav-hamburger">
    <span></span>
    <span></span>
    <span></span>
  </button>
</template>

<style lang="postcss">
.nav-hamburger {
  @apply rounded absolute inline-block;
  height: 2.3rem;
  width: 2.3rem;
  top: 0.6rem;

  span {
    @apply block bg-black absolute left-0;
    top: 13px;
    left: 0.575rem;
    width: 18px;
    height: 2px;
  }

  span + span {
    top: 18px;
  }

  span + span + span {
    top: 23px;
  }
}

@screen lg {
  @apply hidden;
}
</style>

<script>
export default {
  methods: {
    handleClick(e) {
      this.$emit("click", e);
    }
  }
};
</script>