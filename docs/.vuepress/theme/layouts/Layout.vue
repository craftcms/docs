<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <LeftBar
      :set="activeSet"
      :version="activeVersion"
      :items="sidebarItems"
      @toggle-sidebar="toggleSidebar"
      @selectVersion="handleVersionUpdate"
      @selectLanguage="handleLanguageUpdate"
    />
    <div id="main" class="relative ml-64">
      <div id="top-bar" class="block h-12 w-full content-center relative">
        <div id="search" class="block max-w-screen-md h-full flex items-center px-10">
          <SearchBox
            v-if="
              $site.themeConfig.search !== false &&
                $page.frontmatter.search !== false
            "
          />
        </div>
      </div>
      <Page :sidebar-items="sidebarItems">
        <template #top>
          <slot name="page-top" />
        </template>
        <template #bottom>
          <slot name="page-bottom" />
        </template>
      </Page>
    </div>
  </div>
</template>

<style lang="postcss">
.theme-container {
  @apply relative max-w-screen-xl mx-auto;
}

.right-nav {
  .sidebar-heading {
    @apply text-xs mx-0 tracking-wide uppercase;
    padding: 0.35rem 0;
    border-left: none;
  }

  .sidebar-group:not(.collapsable) .sidebar-heading:not(.clickable) {
    color: #a0aec0;
  }

  .sidebar-links {
    @apply ml-0 pl-0 overflow-y-auto;
    max-height: 94vh;

    .sidebar-link {
      @apply mx-0 px-0 text-slate border-0 pr-4;
      opacity: 0.6;

      &.active {
        @apply opacity-100 text-slate;
      }
    }
  }
}
</style>

<script>
import "../styles/index.pcss";
import "prismjs/themes/prism-solarizedlight.css";

import Page from "../components/Page";
import Sidebar from "../components/Sidebar";
import SidebarLinks from "../components/SidebarLinks";
import LeftBar from "../components/LeftBar";
import SearchBox from "../components/SearchBox";

import { resolveMatchingConfig, resolveItem } from "../util";

export default {
  name: "Layout",

  components: {
    Page,
    Sidebar,
    SidebarLinks,
    LeftBar,
    SearchBox
  },

  data() {
    return {
      isSidebarOpen: true,
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
        this.sidebarItems.length
      );
    },

    pageClasses() {
      const userPageClass = this.$page.frontmatter.pageClass;
      return [
        {
          "no-navbar": !this.shouldShowNavbar,
          "sidebar-open": this.isSidebarOpen
          //"no-sidebar": !this.shouldShowSidebar
        },
        userPageClass
      ];
    },

    activeSet() {
      const { themeConfig } = this.$site;

      for (let index = 0; index < themeConfig.docSets.length; index++) {
        const set = themeConfig.docSets[index];
        if (set.versions) {
          for (let [key, value] of Object.entries(set.versions)) {
            const setVersionBase =
              (set.baseDir ? "/" + set.baseDir : "") + "/" + key;
            const searchPattern = new RegExp("^" + setVersionBase, "i");

            if (searchPattern.test(this.$page.path)) {
              this.version = key;
              return set;
            }
          }
        } else {
          const setVersionBase = set.baseDir ? "/" + set.baseDir : "";
          const searchPattern = new RegExp("^" + setVersionBase, "i");

          if (searchPattern.test(this.$page.path)) {
            return set;
          }
        }
      }

      return false;
    },

    activeVersion() {
      if (this.activeSet && !this.activeSet.versions) {
        console.log("no versions in set");
        return;
      }

      if (this.version) {
        console.log("version: " + this.version);
        return this.version;
      }

      if (this.activeSet && !this.version && this.activeSet.defaultVersion) {
        console.log("default version: " + this.activeSet.defaultVersion);
        return this.activeSet.defaultVersion;
      }
    },

    sidebarItems() {
      return this.resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      );
    }
  },

  mounted() {
    this.$router.afterEach(() => {
      this.isSidebarOpen = false;
    });
  },

  methods: {
    toggleSidebar(to) {
      this.isSidebarOpen = typeof to === "boolean" ? to : !this.isSidebarOpen;
      this.$emit("toggle-sidebar", this.isSidebarOpen);
    },

    focusSearch() {
      this.$refs.searchInput.focus();
    },

    resolveSidebarItems(page, regularPath, site, localePath) {
      const { pages, themeConfig } = site;

      //console.log("resolveSidebarItems()", page, regularPath, site, localePath);

      // no set, no sidebar items (just list sets)
      if (!this.activeSet) {
        console.log("no sidebar set available");
        return [];
      }

      // get the active set locale config if it exists, otherwise the set config
      const localeConfig =
        localePath && this.activeSet.locales
          ? this.activeSet.locales[localePath].config
          : this.activeSet;

      let sidebarConfig =
        page.frontmatter.sidebar || localeConfig.sidebar || themeConfig.sidebar;

      if (this.activeVersion) {
        sidebarConfig = sidebarConfig[this.activeVersion];
      } else {
        sidebarConfig = sidebarConfig;
      }

      console.log("localePath", localePath);
      console.log("sidebarConfig()", sidebarConfig);

      if (!sidebarConfig) {
        return [];
      } else {
        let setRegularPath = this.activeSet.baseDir;

        if (this.activeVersion) {
          setRegularPath += "/" + this.activeVersion + "/";
        } else {
          setRegularPath += "/";
        }

        let { base, config } = resolveMatchingConfig(
          regularPath,
          sidebarConfig
        );

        if (!config) {
          console.log("didn’t resolve config");
          return [];
        }

        const resolved = config.map(item => {
          return resolveItem(item, pages, setRegularPath);
        });

        return resolved;
      }
    },

    handleVersionUpdate(version) {
      const set = this.activeSet;
      const setVersionBase =
        (set.baseDir ? "/" + set.baseDir : "") + "/" + version;

      window.location = setVersionBase;
    },

    handleLanguageUpdate() {},

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
