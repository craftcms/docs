<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <div id="nprogress-container"></div>
    <div class="sidebar-mask" @click="toggleSidebar(false)" />
    <LeftBar
      :set="$activeSet"
      :version="$activeVersion"
      :items="sidebarItems"
      :extra-items="extraSidebarItems"
      @toggle-sidebar="toggleSidebar"
      @select-version="handleVersionUpdate"
    />
    <div id="main" class="main-container">
      <div id="top-bar" class="top-bar">
        <Hamburger @click="toggleSidebar" />
        <div
          class="ml-12 lg:ml-0 lg:block max-w-screen-md h-full flex items-center"
          role="search"
        >
          <SearchBox
            v-if="
              $site.themeConfig.search !== false &&
              $page.frontmatter.search !== false
            "
          />
        </div>
      </div>
      <Page
        :sidebar-items="sidebarItems"
        :heading-items="headingItems"
        :is-dark="isDark"
        @toggle-color-mode="toggleColorMode"
      >
        <template #top>
          <slot name="page-top" />
        </template>
        <template #bottom>
          <slot name="page-bottom" />
        </template>
      </Page>
    </div>
    <RightBar
      :heading-items="headingItems"
      :is-dark="isDark"
      @toggle-color-mode="toggleColorMode"
    />
  </div>
</template>

<style lang="postcss">
#nprogress-container {
  @apply block absolute top-0 left-0 right-0 overflow-hidden w-full;
  height: 2px;
  z-index: 1050;
}

.theme-container {
  @apply relative w-full;
}

.sidebar-transitioning {
  .main-container {
    transition: all 0.5s cubic-bezier(0.86, 0, 0.07, 1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .sidebar-transitioning .main-container {
    transition: none;
  }
}

.main-container {
  @apply mx-auto relative max-w-screen-md;
}

.top-bar {
  @apply block h-12 w-full content-center relative px-6 pt-2 max-w-screen-md;
}

@screen md {
  .top-bar {
    @apply px-10;
  }
}

.sidebar-mask {
  @apply fixed top-0 left-0 hidden h-screen w-screen;
  z-index: 9;
}

.sidebar {
  @apply bg-white text-base w-80 fixed z-10 m-0 left-0 bottom-0 box-border overflow-y-auto;
  top: 3.6rem;
}

.sidebar-open {
  .main-container {
    /* w-64 */
    transform: translateX(16rem);
    opacity: 0.5;
    overflow: hidden;
  }

  .left-bar {
    transform: translateX(0);
  }

  .sidebar-mask {
    @apply block;
  }
}

.theme-default-content:not(.custom),
.content-wrapper {
  @apply py-8 px-6 max-w-screen-md;
}

@screen md {
  .theme-default-content:not(.custom),
  .content-wrapper {
    @apply px-10;
  }
}

@screen lg {
  .main-container {
    @apply relative;
    left: 8rem;
  }

  .left-bar {
    transform: translateX(0);
  }
}

@screen xl {
  .main-container {
    left: 0;
  }
}
</style>

<script>
import "../styles/index.pcss";
import "prismjs/themes/prism-solarizedlight.css";
import "prismjs/plugins/treeview/prism-treeview.css";

import Page from "../components/Page";
import LeftBar from "../components/LeftBar";
import RightBar from "../components/RightBar";
import SearchBox from "../components/SearchBox";
import Hamburger from "../components/Hamburger";

import {
  resolveSidebarItems,
  resolveExtraSidebarItems,
  resolveHeaders,
  getPageWithRelativePath,
  fixDoubleSlashes,
  getSameContentForVersion,
} from "../util";

import { getStorage, setStorage, unsetStorage } from "../Storage";

export default {
  name: "Layout",

  components: {
    Page,
    LeftBar,
    RightBar,
    SearchBox,
    Hamburger,
  },

  data: () => ({
    isSidebarOpen: false,
    isSidebarTransitioning: false,
    version: null,
    suggestedUpdatePath: null,
    isDark: false,
    browserWidth:
      typeof document !== "undefined"
        ? document.documentElement.clientWidth
        : 0,
    colorModes: {
      light: "theme-light",
      dark: "theme-dark",
    },
  }),

  computed: {
    shouldShowNavbar() {
      const { themeConfig } = this.$site;
      const { frontmatter } = this.$page;
      if (frontmatter.navbar === false || themeConfig.navbar === false) {
        return false;
      }
      return (
        this.$title ||
        themeConfig.logo ||
        themeConfig.repo ||
        themeConfig.nav ||
        this.$themeLocaleConfig.nav
      );
    },

    shouldShowSidebar() {
      const { frontmatter } = this.$page;
      return (
        !frontmatter.home &&
        frontmatter.sidebar !== false &&
        this.sidebarItems.length > 0
      );
    },

    pageClasses() {
      const userPageClass = this.$page.frontmatter.pageClass;
      return [
        {
          "no-navbar": !this.shouldShowNavbar,
          "sidebar-open": this.isSidebarOpen,
          "sidebar-transitioning": this.isSidebarTransitioning,
        },
        userPageClass,
      ];
    },

    sidebarItems() {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath,
        this.$activeSet,
        this.$activeVersion,
        this.$localeConfig
      );
    },

    extraSidebarItems() {
      return resolveExtraSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath,
        this.$activeSet,
        this.$activeVersion,
        this.$localeConfig
      );
    },

    headingItems() {
      return resolveHeaders(this.$page);
    },

    colorMode() {
      return this.isDark ? "dark" : "light";
    },
  },

  mounted() {
    this.detectColorScheme();

    this.$router.afterEach(() => {
      this.isSidebarOpen = false;
    });

    // temporary means of scrolling to URL hash on load
    // https://github.com/vuejs/vuepress/issues/2428
    const hash = document.location.hash;
    if (hash.length > 1) {
      const id = hash.substring(1);
      const element = document.getElementById(id);

      if (element) {
        setTimeout(() => {
          if (element) {
            element.scrollIntoView({
              behavior: this.getPrefersReducedMotion() ? "auto" : "smooth",
            });
          }
        }, 750);
      }
    }

    window.addEventListener("resize", this.handleWidthChange);
  },

  unmounted() {
    window.removeEventListener("resize", this.handleWidthChange);
  },

  /**
   * Add a canonical tag that points to the default version’s equivalent page.
   *
   * If there’s no modern equivalent, omit the tag.
   */
  created() {
    if (!this.$activeSet) {
      // Don’t do anything if a doc set hasn’t been selected
      return;
    }

    let latestVersion = this.$activeSet.defaultVersion;
    let latestVersionActive = this.$activeVersion === latestVersion;
    let baseUrl = this.$themeConfig.baseUrl;

    if (latestVersionActive) {
      // If we’re on the lastest version, add a canonical tag
      this.$ssrContext.userHeadTags += `\n    <link rel="canonical" href="${
        baseUrl + this.$page.path
      }">`;
    } else {
      // Get path to same page in latest version, or `false` if there isn’t one
      let defaultVersionEquivalent = getSameContentForVersion(
        latestVersion,
        this.$activeSet,
        this.$activeVersion,
        this.$page,
        this.$site.pages,
        true
      );

      if (defaultVersionEquivalent) {
        this.$ssrContext.userHeadTags += `\n    <link rel="canonical" href="${
          baseUrl + defaultVersionEquivalent
        }">`;
      }
    }
  },

  methods: {
    toggleSidebar(to) {
      this.temporarilyAnimateBody();
      this.isSidebarOpen = typeof to === "boolean" ? to : !this.isSidebarOpen;
      this.$emit("toggle-sidebar", this.isSidebarOpen);
    },

    handleWidthChange() {
      if (typeof document === "undefined") {
        return;
      }

      /**
       * Mobile Safari throws a lot of window resize events;
       * make sure the viewport width actually changed.
       */
      if (document.documentElement.clientWidth !== this.browserWidth) {
        this.browserWidth = document.documentElement.clientWidth;
        this.isSidebarOpen = false;
      }
    },

    /**
     * Routes to equivalent content based on frontmatter, matching filename,
     * or root of target version if no matching content is found.
     */
    handleVersionUpdate(version) {
      this.$router.push(
        getSameContentForVersion(
          version,
          this.$activeSet,
          this.$activeVersion,
          this.$page,
          this.$site.pages,
          false
        )
      );
    },

    toggleColorMode() {
      this.isDark = !this.isDark;
      this.handleColorModeUpdate(true);
    },

    handleColorModeUpdate(updateStorage = false) {
      if (updateStorage) {
        if (this.colorMode !== this.getBrowserColorMode()) {
          // save the current setting if != browser default
          setStorage("theme", this.colorMode, this.$site.base);
        } else {
          // remove saved setting if it equals the browser default
          unsetStorage("theme", this.$site.base);
        }
      }

      for (const [key, value] of Object.entries(this.colorModes)) {
        if (this.colorMode === key) {
          this.addHtmlClass(value);
        } else {
          this.removeHtmlClass(value);
        }
      }
    },

    detectColorScheme() {
      let storedValue = getStorage("theme", this.$site.base);

      if (storedValue) {
        this.isDark = storedValue === "dark";
      } else {
        this.isDark = this.getBrowserPrefersDark();
      }

      this.handleColorModeUpdate();
    },

    addHtmlClass(className) {
      let htmlElement = document.getElementsByTagName("html")[0];
      htmlElement.classList.add(className);
    },

    removeHtmlClass(className) {
      let htmlElement = document.getElementsByTagName("html")[0];
      htmlElement.classList.remove(className);
    },

    getBrowserColorMode() {
      return this.getBrowserPrefersDark() ? "dark" : "light";
    },

    getBrowserPrefersDark() {
      if (!window.matchMedia) {
        return false;
      }

      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    },

    getPrefersReducedMotion() {
      if (!window.matchMedia) {
        return false;
      }

      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    },

    // side swipe
    onTouchStart(e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
      };
    },

    onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x;
      const dy = e.changedTouches[0].clientY - this.touchStart.y;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true);
        } else {
          this.toggleSidebar(false);
        }
      }
    },

    temporarilyAnimateBody() {
      this.isSidebarTransitioning = true;

      setTimeout(() => {
        this.isSidebarTransitioning = false;
      }, 1500);
    },
  },
};
</script>
