<template>
  <button
    @click="handleClick"
    class="dark-mode-toggle"
    :class="{ 'dark': on, 'light': ! on }"
    :aria-label="`Switch dark/light mode`"
  >
    <div class="backdrop relative w-full h-full">
      <div class="knob"></div>
    </div>
  </button>
</template>

<style lang="postcss">
.dark-mode-toggle {
  @apply inline-block rounded-full w-10 h-5 relative mt-4 outline-none appearance-none overflow-hidden;
  background: #f1f5fd;
  border: 1px solid transparent;

  &:focus {
    @apply outline-none;
  }

  .knob {
    @apply block rounded-full absolute top-0 left-0;
    width: calc(1.25rem - 2px);
    height: calc(1.25rem - 2px);
    transition: all 0.25s cubic-bezier(0.86, 0, 0.07, 1);
    background: #a0aec0;

    &:after {
      content: "";
      @apply absolute;
      transition: all 0.25s cubic-bezier(0.86, 0, 0.07, 1);
    }
  }
}

.dark-mode-toggle {
  &.dark {
    border-color: rgba(45, 55, 72, 1);
    background: transparent;

    .knob {
      left: 1.25rem;

      &:after {
        content: "";
        @apply bg-gray-900;
        height: 110%;
        width: 160%;
        right: 40%;
        top: -5%;
        background: rgb(35, 31, 32);
        border-radius: 40%/60%;
      }
    }
  }
}
</style>

<script>
export default {
  props: {
    on: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      enabled: this.on,
    };
  },
  methods: {
    handleClick() {
      this.enabled = !this.enabled;
      this.$emit("toggle-color-mode");
    },
  },
};
</script>
