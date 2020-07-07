<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <div class="sidebar-mask" @click="toggleSidebar(false)" />
    <LeftBar
      :set="$activeSet"
      :version="$activeVersion"
      :items="sidebarItems"
      @toggle-sidebar="toggleSidebar"
      @select-version="handleVersionUpdate"
      @select-language="handleLanguageUpdate"
    />
    <div id="main" class="main-container">
      <div id="top-bar" class="top-bar">
        <Hamburger @click="toggleSidebar" />
        <div id="search" class="ml-12 lg:ml-0 lg:block max-w-screen-md h-full flex items-center">
          <SearchBox
            v-if="
              $site.themeConfig.search !== false &&
                $page.frontmatter.search !== false
            "
          />
        </div>
      </div>
      <Page :sidebar-items="sidebarItems" :heading-items="headingItems">
        <template #top>
          <slot name="page-top" />
        </template>
        <template #bottom>
          <slot name="page-bottom" />
        </template>
      </Page>
    </div>
    <RightBar :heading-items="headingItems" />
  </div>
</template>

<style lang="postcss">
.theme-container {
  @apply relative w-full;
}

.main-container {
  transition: all 0.5s cubic-bezier(0.86, 0, 0.07, 1);
  @apply mx-auto relative max-w-screen-lg;
}

.top-bar {
  @apply block h-12 w-full content-center relative px-10 pt-2 max-w-screen-md;
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

@screen lg {
  .main-container {
    @apply relative;
    max-width: 1028px;
    left: 16rem;
  }

  .left-bar {
    transform: translateX(0);
  }
}

@screen xl {
  .main-container {
    left: 8rem;
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
  resolveHeaders,
  getAlternateVersion,
  getPageWithRelativePath,
  fixDoubleSlashes
} from "../util";

export default {
  name: "Layout",

  components: {
    Page,
    LeftBar,
    RightBar,
    SearchBox,
    Hamburger
  },

  data() {
    return {
      isSidebarOpen: false,
      version: null
    };
  },

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
          "sidebar-open": this.isSidebarOpen
        },
        userPageClass
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

    headingItems() {
      return resolveHeaders(this.$page);
    }
  },

  mounted() {
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
        const yOffset = -54;
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  },

  methods: {
    toggleSidebar(to) {
      this.isSidebarOpen = typeof to === "boolean" ? to : !this.isSidebarOpen;
      this.$emit("toggle-sidebar", this.isSidebarOpen);
    },

    /**
     * Routes to equivalent content based on frontmatter, matching filename,
     * or root of target version if no matching content is found.
     */
    handleVersionUpdate(version) {
      // default to target version in current docset
      let targetPath = "/" + this.$activeSet.baseDir + version + "/";

      const alternatePath = getAlternateVersion(
        this.$page,
        this.$activeVersion,
        version,
        this.$site.pages,
        true
      );

      if (alternatePath) {
        const targetPage = getPageWithRelativePath(
          this.$site.pages,
          alternatePath
        );
        targetPath = "/" + targetPage.path;
      }

      this.$router.push(fixDoubleSlashes(targetPath));
    },

    /**
     * Routes to equivalent content, based on matching filename, in target
     * language—or to root of target language if no matching content is found.
     */
    handleLanguageUpdate(language) {
      const { locales } = this.$activeSet;

      let targetPath = this.$page.relativePath;
      let setBase = this.$activeSet.baseDir;

      if (this.$activeVersion) {
        setBase += this.$activeVersion;
      }

      let currentLocaleSegment;
      let targetLocaleSegment;

      for (const [path, settings] of Object.entries(locales)) {
        if (settings.lang === this.$lang) {
          currentLocaleSegment = path;
        }

        if (settings.lang === language) {
          targetLocaleSegment = path;
        }
      }

      const currentSetBase = setBase + currentLocaleSegment;
      const targetSetBase = setBase + targetLocaleSegment;

      targetPath = targetPath.replace(currentSetBase, targetSetBase);

      // do we have the equivalent of this page in the desired language?
      const targetPage = getPageWithRelativePath(this.$site.pages, targetPath);

      if (targetPage) {
        targetPath = "/" + targetPage.path;
      } else {
        targetPath = "/" + targetSetBase;
      }

      this.$router.push(fixDoubleSlashes(targetPath));
    },

    // side swipe
    onTouchStart(e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
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
    }
  }
};
</script>
