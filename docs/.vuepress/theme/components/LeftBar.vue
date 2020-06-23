<template>
  <aside class="left-bar fixed h-screen w-64">
    <div id="top" class="h-12 flex items-center">
      <RouterLink
        :to="`/`"
        ref="siteName"
        class="site-name text-slate font-bold px-4 mt-1"
      >{{ $siteTitle }}</RouterLink>
    </div>

    <slot name="top" />

    <div id="mid">
      <DocSetPanel @selectVersion="handleVersionSelect" />
      <SidebarLinks
        class="left-bar-links"
        :depth="0"
        :items="items"
        :class="{ 'has-bottom': hasBottomLinks }"
      />
    </div>

    <slot name="bottom" />

    <div v-if="hasBottomLinks" id="bottom" class="left-bar-bottom">
      <div class="language">
        <select name="locale" class="locale-select-element" @change="handleLanguageSelect($event)">
          <option
            v-for="(locale, path) in set.locales"
            :value="getEquivalentLocalePath(locale, path)"
            :selected="$lang == locale.lang"
          >{{ locale.config.label }}</option>
        </select>
      </div>
    </div>
  </aside>
</template>

<style lang="postcss">
.left-bar-links {
  @apply h-screen overflow-y-auto pb-32;
  /* browser height - approx. .doc-set-panel height - #top height */
  height: calc(100vh - 93px - 3rem);

  &.has-bottom {
    /* browser height - approx. .doc-set-panel - #top height - #bottom height */
    height: calc(100vh - 93px - 3rem - 3rem);
  }
}

.left-bar {
  .left-bar-bottom {
    @apply absolute w-full border-t;
  }
}

@media screen and (min-width: 1408px) {
  .left-bar-links.has-bottom {
    height: calc(100vh - 180px - 3rem - 3rem);
  }
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

.left-bar-bottom {
  @apply h-12;
}
</style>

<script>
import DocSetPanel from "./DocSetPanel.vue";
import SidebarLinks from "./SidebarLinks.vue";

export default {
  props: ["items", "set", "language"],
  components: { DocSetPanel, SidebarLinks },
  computed: {
    hasBottomLinks() {
      return this.$activeSet && this.set.hasOwnProperty("locales");
    }
  },
  methods: {
    handleLanguageSelect(event) {
      const selected = event.target.value;
      this.$emit("selectLanguage", selected);
    },
    handleVersionSelect(selected) {
      this.$emit("selectVersion", selected);
    },
    getEquivalentLocalePath(locale, path) {
      let localePath = this.$activeSet.baseDir;

      if (localePath === "") {
        localePath = "/";
      }

      if (this.$activeVersion) {
        localePath += this.$activeVersion;
      }

      localePath += path;

      return localePath;
    }
  }
};
</script>
