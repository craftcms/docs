<template>
  <button
    @click="toggleColorMode"
    class="dark-mode-toggle"
    :class="colorMode"
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
    @apply block rounded-full absolute top-0;
    width: calc(1.25rem - 2px);
    height: calc(1.25rem - 2px);
    transition: all 0.25s cubic-bezier(0.86, 0, 0.07, 1);
    background: #a0aec0;
  }

  &.light {
    .knob {
      @apply left-0;
    }
  }

  &.dark {
    border-color: rgba(45, 55, 72, 1);
    background: transparent;

    .knob {
      left: 1.25rem;
    }
  }
}
</style>

<script>
import { getStorage, setStorage } from "../Storage";

export default {
  data() {
    return {
      defaultMode: null,
      isDark: null
    };
  },
  mounted() {
    this.detectColorScheme();
  },
  methods: {
    toggleColorMode() {
      this.isDark = !this.isDark;
      this.onUpdate();
    },
    detectColorScheme() {
      let storedValue = getStorage("theme", this.$site.base);

      if (storedValue) {
        this.isDark = storedValue === "dark";
      } else if (!window.matchMedia) {
        // browser doesn’t support `matchMedia`, default to light
        this.isDark = false;
      } else {
        this.isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      }

      this.onUpdate();
    },
    onUpdate() {
      setStorage("theme", this.colorMode, this.$site.base);
      this.$emit("toggle-color-mode", this.colorMode);
    }
  },
  computed: {
    colorMode() {
      return this.isDark ? "dark" : "light";
    }
  }
};
</script>
