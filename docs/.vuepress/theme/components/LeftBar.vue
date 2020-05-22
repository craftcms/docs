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
      <DocSetPanel @selectVersion="handleVersionSelect" />
      <SidebarLinks class="left-bar-links" :depth="0" :items="items" />
    </div>

    <slot name="bottom" />

    <div id="bottom" class="left-bar-bottom absolute bottom-0 w-full border-t">
      <div v-if="set && set.locales" class="language">
        <select name="locale" class="locale-select-element" @change="handleLanguageSelect($event)">
          <option
            v-for="(locale, path) in set.locales"
            :value="path"
            :selected="$lang == locale.lang"
          >{{ locale.config.label }}</option>
        </select>
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

.language {
  @apply relative pl-2 pr-4 py-2;

  &:before {
    content: "";
    @apply block absolute w-4 h-4 left-0 mt-2 ml-4;
    margin-right: 0.125rem;
    background: transparent url("/icons/icon-globe.svg") no-repeat 0 0;
  }
}

.locale-select-element {
  @apply appearance-none bg-transparent block relative pl-8 pr-2 py-1 cursor-pointer;
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

export default {
  props: ["items", "set", "language"],
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
