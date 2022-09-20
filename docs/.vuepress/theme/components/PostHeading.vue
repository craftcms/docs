<template>
  <div class="post-heading">
    <div
      v-if="$activeSet.abandoned"
      class="version-warning"
      v-html="$activeSet.deprecationMessage"></div>
    <div
      v-else-if="$activeVersionInfo && $activeVersionInfo.isEol"
      class="version-warning">
      This document is for a version of {{ $activeSet.setTitle }} that is no longer supported. Please refer to the <RouterLink :to="suggestedPath">latest version →</RouterLink>
    </div>
    <div
      v-else-if="isSearchReferral && suggestedPath"
      class="version-warning"
    >
      This document is for an older version of {{ $activeSet.setTitle }}.
      <RouterLink :to="suggestedPath">View latest version →</RouterLink>
    </div>
    <div
      class="auto-toc block xl:hidden"
      v-if="headingItems.length && headingItems[0].children.length"
    >
      <SidebarLinks :depth="0" :items="headingItems" fixed-heading="On this Page" />
    </div>
  </div>
</template>

<style lang="postcss">
.theme-default-content {
  .post-heading {
    .auto-toc {
      @apply w-full mt-3 mb-6 border-t border-b;
      border-color: var(--border-color);
    }
    .sidebar-links {
      @apply list-none p-0 mx-0 mb-3;
      li {
        @apply list-none;
        a {
          @apply text-blue px-0;
        }
      }
    }

    .sidebar-heading {
      @apply p-0 text-xs mx-0 mb-2 tracking-wide uppercase;
    }
  }
}

.version-warning {
  @apply block w-full mt-2 px-5 py-4 rounded border border-yellow-300;

  background-image: repeating-linear-gradient(-45deg, transparent 0px, var(--sidebar-bg-color) 0px, var(--sidebar-bg-color) 4px, transparent 4px, transparent 8px);
}
</style>

<script>
import { resolveHeaders, getSameContentForVersion } from "../util";
import SidebarLinks from "./SidebarLinks";

export default {
  components: {
    SidebarLinks,
  },
  mounted() {
    const searchMatch = [
      /google\.com/,
      /yahoo\.com/,
      /bing\.com/,
      /duckduckgo\.com/,
    ];

    // Does it look like the visitor came from a search engine?
    this.isSearchReferral = searchMatch.some((item) =>
      item.test(document.referrer)
    );
  },
  data() {
    return {
      isSearchReferral: false,
    };
  },
  computed: {
    headingItems() {
      return resolveHeaders(this.$page);
    },
    suggestedPath() {
      if (
        !this.$activeSet ||
        !this.$activeSet.versions ||
        !this.$activeVersion
      ) {
        // nothing to do; only set content should generate suggestions
        return;
      }

      const isDefaultVersion =
        this.$activeSet.defaultVersion === this.$activeVersion;
      const isNewestVersion =
        this.$activeVersion === this.$activeSet.versions[0][0];

      if (isDefaultVersion || isNewestVersion) {
        // only make suggestions for past versions
        return;
      }

      return getSameContentForVersion(
        this.$activeSet.defaultVersion,
        this.$activeSet,
        this.$activeVersion,
        this.$page,
        this.$site.pages,
        false
      );
    },
  },
};
</script>
