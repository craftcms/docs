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
  background-color: rgba(250, 251, 254, 1);
  height: 38px;
  width: 37px;
  top: 10px;

  &:focus {
    @apply outline-none;
  }

  span {
    @apply block bg-black absolute left-0;
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