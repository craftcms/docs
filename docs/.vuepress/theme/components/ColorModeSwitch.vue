<template>
  <button
    @click="handleClick"
    class="dark-mode-toggle"
    :class="{ 'dark': on, 'light': ! on }"
    role="switch"
    :aria-label="`Dark mode`"
    :aria-checked="on ? 'true' : 'false'"
  >
    <div class="backdrop relative w-full h-full">
      <div class="knob"></div>
    </div>
  </button>
</template>

<style lang="postcss">
.dark-mode-toggle {
  --lightswitch-color: var(--ui-component-color);
  border-color: var(--lightswitch-color);
  @apply inline-block border border-2 rounded-full h-5 relative mt-4 outline-none appearance-none overflow-hidden;
  width: 44px;
  height: 22px;

  &:focus {
    outline: 2px solid var(--link-color-default);
  }

  .knob {
    @apply block rounded-full absolute;
    left: 2px;
    top: 2px;
    width: 14px;
    height: 14px;
    transition: all 0.25s cubic-bezier(0.86, 0, 0.07, 1);
    background: var(--lightswitch-color);

    &:after {
      content: "";
      @apply absolute;
      transition: all 0.25s cubic-bezier(0.86, 0, 0.07, 1);
    }
  }
}

.dark-mode-toggle {
  &.dark {
    background: transparent;

    .knob {
      left: 23px;

      &:after {
        content: "";
        @apply bg-gray-900;
        height: 110%;
        width: 160%;
        right: 40%;
        top: -5%;
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
