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

    <div id="mid" class="relative">
      <div class="nav-wrap relative w-64 overflow-x-hidden h-full">
        <transition name="slide-left">
          <div class="set-index" v-if="! this.$activeSet">
            <DocSetPanel @selectVersion="handleVersionSelect" />
          </div>
        </transition>
        <transition name="slide-right">
          <div class="set-nav" v-if="this.$activeSet">
            <DocSetPanel @selectVersion="handleVersionSelect" />
            <transition :name="getTransitionClass(1)">
              <SidebarLinks
                v-if="currentSidebarDepth === 1"
                class="left-bar-links"
                :depth="0"
                :items="items"
                :class="{ 'has-bottom': hasBottomLinks }"
              />
            </transition>
            <transition name="slide-right">
              <SidebarLinks
                v-if="currentSidebarDepth === 2"
                class="left-bar-links"
                :depth="0"
                :items="items"
                :class="{ 'has-bottom': hasBottomLinks }"
              />
            </transition>
          </div>
        </transition>
      </div>
    </div>

    <slot name="bottom" />

    <transition name="slide-up">
      <div v-if="hasBottomLinks" id="bottom" class="left-bar-bottom">
        <div class="language">
          <select
            name="locale"
            class="locale-select-element"
            @change="handleLanguageSelect($event)"
          >
            <option
              v-for="(locale, path) in set.locales"
              :value="locale.lang"
              :selected="$lang == locale.lang"
            >{{ locale.config.label }}</option>
          </select>
        </div>
      </div>
    </transition>
  </aside>
</template>

<style lang="postcss">
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: opacity 350ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 350ms cubic-bezier(0.22, 1, 0.36, 1);
  opacity: 1;
  transform: translateX(0);
}

/* slide from left to target */
.slide-left-enter,
.slide-left-leave-to {
  position: absolute;
  transform: translateX(-16rem);
  opacity: 0;
}

/* slide from right to target */
.slide-right-enter,
.slide-right-leave-to {
  position: absolute;
  transform: translateX(16rem);
  opacity: 0;
}

.slide-up-enter-active {
  transition: opacity 350ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 350ms cubic-bezier(0.22, 1, 0.36, 1);
  opacity: 1;
  transform: translateY(0);
}

/* immediate outtro */
.slide-up-leave-active {
  transition: opacity 0, transform 0;
}

.slide-up-enter,
.slide-up-leave-to {
  transform: translateY(4rem);
  opacity: 0;
}

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
import {
  resolveSidebarConfig,
  getRelativeActiveBaseFromConfig,
  getRegularPathWithoutVersion,
  getDocSetDefaultUri
} from "../util";

export default {
  props: ["items", "set", "language"],
  components: { DocSetPanel, SidebarLinks },
  data() {
    return {
      currentSidebarDepth: null,
      previousSidebarDepth: null
    };
  },
  computed: {
    hasBottomLinks() {
      return this.$activeSet && this.set.hasOwnProperty("locales");
    },
    defaultUri() {
      return getDocSetDefaultUri(this.$activeSet);
    }
  },
  mounted() {
    this.currentSidebarDepth = this.getSidebarNavigationDepth();
  },
  methods: {
    handleLanguageSelect(event) {
      const selected = event.target.value;
      this.$emit("selectLanguage", selected);
    },
    handleVersionSelect(selected) {
      this.$emit("selectVersion", selected);
    },
    getSidebarNavigationDepth() {
      if (!this.$activeSet) {
        return 0;
      }

      let config = resolveSidebarConfig(
        this.$site,
        this.$page,
        this.$activeSet,
        this.$activeVersion,
        this.$localeConfig,
        this.$themeConfig
      );

      const sidebarPath = getRegularPathWithoutVersion(
        this.$page.regularPath,
        this.$activeVersion
      );

      const sidebarBase = getRelativeActiveBaseFromConfig(sidebarPath, config);

      if (sidebarBase === "/") {
        return 1;
      }

      return 2;
    },
    getTransitionClass(depth) {
      if (!this.previousSidebarDepth) {
        return;
      }

      const direction =
        this.currentSidebarDepth > this.previousSidebarDepth ? "right" : "left";

      // if the depth of this thing is lower and we’re moving right, slide it to the left
      if (direction === "right" && depth < this.currentSidebarDepth) {
        return depth < this.currentSidebarDepth ? "slide-left" : "slide-right";
      }

      // invert if we’re moving to the left
      return depth < this.currentSidebarDepth ? "slide-right" : "slide-left";
    }
  },
  watch: {
    items(items) {
      this.previousSidebarDepth = this.currentSidebarDepth;
      this.currentSidebarDepth = this.getSidebarNavigationDepth();
    }
  }
};
</script>
