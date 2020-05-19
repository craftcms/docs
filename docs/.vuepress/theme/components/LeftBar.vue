<template>
  <aside class="left-bar fixed h-screen w-64">
    <div id="top" class="h-12 flex items-center">
      <RouterLink
        :to="`/`"
        ref="siteName"
        class="site-name text-slate font-bold px-4"
      >{{ $siteTitle }}</RouterLink>
    </div>

    <slot name="top" />

    <div id="mid">
      <DocSetPanel :set="set" :version="version" @selectVersion="handleVersionSelect" />
      <SidebarLinks class="left-bar-links" :depth="0" :items="items" :sidebar-depth="0" />
    </div>

    <slot name="bottom" />

    <div id="bottom" class="left-bar-bottom absolute bottom-0 w-full border-t">
      <div v-if="set && set.locales" class="language p-4">
        <span class="inline-block relative" style="top: 2px; margin-right: 0.125rem;">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.75 0.25C3.46875 0.25 0 3.71875 0 8C0 12.2812 3.46875 15.75 7.75 15.75C12.0312 15.75 15.5 12.2812 15.5 8C15.5 3.71875 12.0312 0.25 7.75 0.25ZM13.3438 5.25H11.25C11.0312 4.125 10.6875 3.125 10.25 2.3125C11.5938 2.90625 12.6875 3.9375 13.3438 5.25ZM7.75 1.75C8.3125 1.75 9.25 3.0625 9.71875 5.25H5.75C6.21875 3.0625 7.15625 1.75 7.75 1.75ZM1.5 8C1.5 7.59375 1.53125 7.15625 1.625 6.75H4.03125C4 7.1875 4 7.59375 4 8C4 8.4375 4 8.84375 4.03125 9.25H1.625C1.53125 8.875 1.5 8.4375 1.5 8ZM2.125 10.75H4.21875C4.4375 11.9062 4.78125 12.9062 5.21875 13.7188C3.875 13.125 2.78125 12.0625 2.125 10.75ZM4.21875 5.25H2.125C2.78125 3.9375 3.875 2.90625 5.21875 2.3125C4.78125 3.125 4.4375 4.125 4.21875 5.25ZM7.75 14.25C7.15625 14.25 6.21875 12.9688 5.75 10.75H9.71875C9.25 12.9688 8.3125 14.25 7.75 14.25ZM9.9375 9.25H5.53125C5.5 8.875 5.5 8.4375 5.5 8C5.5 7.5625 5.5 7.15625 5.53125 6.75H9.9375C9.96875 7.15625 10 7.5625 10 8C10 8.4375 9.96875 8.875 9.9375 9.25ZM10.25 13.7188C10.6875 12.9062 11.0312 11.9062 11.25 10.75H13.3438C12.6875 12.0625 11.5938 13.125 10.25 13.7188ZM11.4375 9.25C11.4688 8.84375 11.5 8.4375 11.5 8C11.5 7.59375 11.4688 7.1875 11.4375 6.75H13.875C13.9375 7.15625 14 7.59375 14 8C14 8.4375 13.9375 8.875 13.875 9.25H11.4375Z"
              fill="#718096"
            />
          </svg>
        </span>
        English
      </div>
    </div>
  </aside>
</template>

<style lang="postcss">
.left-bar-links {
  max-height: 85vh;
  overflow-y: auto;
  padding-bottom: 10vh;
}

.doc-set {
  @apply block px-4 py-1 text-slate font-medium text-lg;
}

.current-doc-set {
  font-size: 1.125rem;
}

.doc-set-version {
  padding-left: 0.375rem;
}

.left-bar-bottom {
  @apply bg-white;
}

.home {
  @apply text-sm relative;
  color: #718096;

  .back {
    @apply inline-block absolute mr-1 opacity-100;
    top: 8px;
    left: 15px;
    transition: all 100ms ease-out;
    transform: translateX(0);
    width: auto;
  }

  .home-icon {
    @apply hidden;
  }

  .home-title {
    padding-left: 15px;
  }

  &.active {
    @apply text-blue text-lg;

    .home-icon {
      @apply inline-block;
    }

    .back {
      @apply opacity-0 mr-0;
      transform: translateX(-5px);
    }

    .home-title {
      @apply relative pl-0;
      left: -2px;
    }
  }
}

.version-arrow {
  @apply pointer-events-none;
  top: 0.55rem;
  right: 0.385rem;
}
</style>

<script>
import DocSetPanel from "./DocSetPanel.vue";
import SidebarLinks from "./SidebarLinks.vue";
import {
  resolveSidebarItems,
  resolveMatchingConfig,
  resolveItem
} from "../util";

export default {
  props: ["items", "set", "language", "version"],
  components: { DocSetPanel, SidebarLinks },
  methods: {
    handleLanguageSelect(event) {
      const selected = event.target.value;
      this.$emit("selectLanguage", selected);
    },
    handleVersionSelect(selected) {
      this.$emit("selectVersion", selected);
    }
  }
};
</script>
