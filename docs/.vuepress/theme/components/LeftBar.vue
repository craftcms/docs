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
      <div class="doc-sets">
        <RouterLink :to="`/`" class="doc-set home" :class="{ active: set === false }">
          <span class="back">
            <svg
              width="7"
              height="12"
              viewBox="0 0 7 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.15625 5.75L4.75 1.125C4.9375 0.9375 5.11458 0.9375 5.28125 1.125L5.90625 1.71875C6.07292 1.90625 6.07292 2.08333 5.90625 2.25L2.1875 6L5.90625 9.75C6.07292 9.91667 6.07292 10.0938 5.90625 10.2812L5.28125 10.875C5.11458 11.0625 4.9375 11.0625 4.75 10.875L0.15625 6.25C-0.0104167 6.08333 -0.0104167 5.91667 0.15625 5.75Z"
                fill="#718096"
              />
            </svg>
          </span>

          <span class="mr-2 inline-block relative home-icon" style="top: 2px; left: -1px;">
            <svg
              width="18"
              height="16"
              viewBox="0 0 20 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.3633 7.32617C19.4961 7.43685 19.5625 7.58073 19.5625 7.75781C19.5625 7.89062 19.5182 8.0013 19.4297 8.08984L19.0977 8.48828C18.987 8.62109 18.8542 8.6875 18.6992 8.6875C18.5664 8.6875 18.4557 8.64323 18.3672 8.55469L17.4375 7.82422V14C17.4375 14.2878 17.3268 14.5312 17.1055 14.7305C16.9062 14.9518 16.6628 15.0625 16.375 15.0625H12.125C11.8372 15.0625 11.5827 14.9518 11.3613 14.7305C11.1621 14.5312 11.0625 14.2878 11.0625 14V10.5469H8.9375V14C8.9375 14.2878 8.82682 14.5312 8.60547 14.7305C8.40625 14.9518 8.16276 15.0625 7.875 15.0625H3.625C3.33724 15.0625 3.08268 14.9518 2.86133 14.7305C2.66211 14.5312 2.5625 14.2878 2.5625 14V7.82422L1.66602 8.55469C1.55534 8.64323 1.43359 8.6875 1.30078 8.6875C1.14583 8.6875 1.01302 8.62109 0.902344 8.48828L0.570312 8.08984C0.481771 7.97917 0.4375 7.86849 0.4375 7.75781C0.4375 7.58073 0.503906 7.43685 0.636719 7.32617L8.80469 0.619141C9.15885 0.33138 9.55729 0.1875 10 0.1875C10.4427 0.1875 10.8411 0.33138 11.1953 0.619141L19.3633 7.32617ZM15.8438 13.4688V6.49609L10 1.71484L4.15625 6.49609V13.4688H7.34375V10.0156C7.34375 9.72786 7.44336 9.48438 7.64258 9.28516C7.86393 9.0638 8.11849 8.95312 8.40625 8.95312H11.5938C11.8815 8.95312 12.125 9.0638 12.3242 9.28516C12.5456 9.48438 12.6562 9.72786 12.6562 10.0156V13.4688H15.8438Z"
                fill="#4A7CF6"
              />
            </svg>
          </span>

          <span class="home-title">Home</span>
        </RouterLink>
        <RouterLink
          v-if="$page.frontmatter.home && set.primarySet"
          v-for="(set, index) in $site.themeConfig.docSets"
          :to="set.defaultUri"
          class="doc-set"
        >
          <span class="mr-2 inline-block relative" style="top: 2px;">
            <img
              :src="set.icon"
              width="16"
              height="16"
              alt
              style="filter: grayscale(100%); opacity: 0.85;"
            />
          </span>

          <span>{{ set.title }}</span>
        </RouterLink>
      </div>
      <div v-if="set" class="px-4 mt-2 pb-4 flex w-full justify-between items-center">
        <RouterLink :to="set.defaultUri" class="flex items-center">
          <span class="icon mr-3 inline-block">
            <img :src="set.icon" width="28" height="28" alt />
          </span>
          <div class="current-doc-set text-slate leading-none font-medium">{{ set.title }}</div>
        </RouterLink>
        <div v-if="set.versions" class="relative">
          <select
            name
            class="doc-set-version border pr-5 py-1 rounded-md leading-none block flex content-center items-center version-select appearance-none font-medium text-sm bg-transparent cursor-pointer"
            @change="handleVersionSelect($event)"
            v-model="version"
          >
            <option v-for="version in set.versions">{{ version }}</option>
          </select>

          <svg
            class="version-arrow absolute"
            width="11"
            height="7"
            viewBox="0 0 11 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.07812 6.07031L0.742188 1.76367C0.566406 1.58789 0.566406 1.42188 0.742188 1.26562L1.29883 0.679688C1.47461 0.523438 1.64062 0.523438 1.79688 0.679688L5.3125 4.16602L8.82812 0.679688C8.98438 0.523438 9.15039 0.523438 9.32617 0.679688L9.88281 1.26562C10.0586 1.42188 10.0586 1.58789 9.88281 1.76367L5.54688 6.07031C5.39062 6.22656 5.23438 6.22656 5.07812 6.07031Z"
              fill="#718096"
            />
          </svg>
        </div>
      </div>

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
import SidebarLinks from "./SidebarLinks.vue";
import {
  resolveSidebarItems,
  resolveMatchingConfig,
  resolveItem
} from "../util";

export default {
  props: ["items", "set", "language", "version"],
  components: { SidebarLinks },
  methods: {
    handleVersionSelect(event) {
      const selected = event.target.value;
      this.$emit("selectVersion", selected);
    },
    handleLanguageSelect(event) {
      const selected = event.target.value;
      this.$emit("selectLanguage", selected);
    }
  }
};
</script>
