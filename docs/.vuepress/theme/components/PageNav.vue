<template>
  <div v-if="prev || next || relatedItems.length" class="content-wrapper">
    <nav class="page-nav">
      <div v-if="prev || next" class="p-4">
        <span v-if="prev" class="prev float-left">
          <span class="paging-arrow inline-block" aria-hidden="true">←</span>
          <a
            v-if="prev.type === 'external'"
            class="prev"
            :href="prev.path"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ prev.title || prev.path }}
            <OutboundLink />
          </a>

          <RouterLink v-else class="prev" :to="prev.path">
            {{ prev.title || prev.path }}
          </RouterLink>
        </span>

        <span v-if="next" class="next float-right">
          <a
            v-if="next.type === 'external'"
            :href="next.path"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ next.title || next.path }}
            <OutboundLink />
          </a>

          <RouterLink v-else :to="next.path">
            {{ next.title || next.path }}
          </RouterLink>
          <span class="paging-arrow inline-block" aria-hidden="true">→</span>
        </span>

        <div class="clear-both"></div>
      </div>

      <div v-if="relatedItems.length" class="see-also p-4 border-t">
        <h4 class="font-bold mb-4">See Also</h4>
        <ul class="list-disc pl-5">
          {{ /* For raw HTML items, just output the content; URIs that appear to be external resources use an explicit label; Internal URIs will include the label of the referenced page: */ }}
          <li v-for="(item, index) in relatedItems" :key="index">
            <div v-if="item.html" v-html="item.html">{{ /* This content may have multiple links within it! */ }}</div>
            <a
              v-else-if="item.external"
              :href="item.uri"
              target="_blank">{{ item.label }} <OutboundLink /></a>
            <RouterLink v-else :to="item.uri">{{ item.label }}</RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style lang="postcss">
.page-nav {
    @apply rounded;
    border: 1px solid var(--border-color);

  .inner {
    min-height: 2rem;
    border-color: var(--border-color);
  }

  .paging-arrow {
    color: #718096;
  }
}

.see-also {
  border-top-color: var(--border-color);

  a {
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>

<script>
import { resolvePage, resolveHeaders } from "../util";
import resolveRelated from "../util/relationships";
import isString from "lodash/isString";
import isNil from "lodash/isNil";

export default {
  name: "PageNav",

  props: ["sidebarItems"],

  computed: {
    headingItems() {
      return resolveHeaders(this.$page);
    },

    relatedItems() {
      return resolveRelated(this.$page, this.$site);
    },

    prev() {
      return resolvePageLink(LINK_TYPES.PREV, this);
    },

    next() {
      return resolvePageLink(LINK_TYPES.NEXT, this);
    },
  },
};

function resolvePrev(page, items) {
  return find(page, items, -1);
}

function resolveNext(page, items) {
  return find(page, items, 1);
}

const LINK_TYPES = {
  NEXT: {
    resolveLink: resolveNext,
    getThemeLinkConfig: ({ nextLinks }) => nextLinks,
    getPageLinkConfig: ({ frontmatter }) => frontmatter.next,
  },
  PREV: {
    resolveLink: resolvePrev,
    getThemeLinkConfig: ({ prevLinks }) => prevLinks,
    getPageLinkConfig: ({ frontmatter }) => frontmatter.prev,
  },
};

function resolvePageLink(
  linkType,
  { $themeConfig, $page, $route, $site, sidebarItems }
) {
  const { resolveLink, getThemeLinkConfig, getPageLinkConfig } = linkType;

  // Get link config from theme
  const themeLinkConfig = getThemeLinkConfig($themeConfig);

  // Get link config from current page
  const pageLinkConfig = getPageLinkConfig($page);

  // Page link config will overwrite global theme link config if defined
  const link = isNil(pageLinkConfig) ? themeLinkConfig : pageLinkConfig;

  if (link === false) {
    return;
  } else if (isString(link)) {
    return resolvePage($site.pages, link, $route.path);
  } else {
    return resolveLink($page, sidebarItems);
  }
}

/**
 * Flatten page hierarchy, identify current page in the sequence, and return
 * the item at the given offset.
 */
function find(page, items, offset) {
  const res = [];
  flatten(items, res);
  for (let i = 0; i < res.length; i++) {
    const cur = res[i];
    if (cur.type === "page" && cur.path === decodeURIComponent(page.path)) {
      return res[i + offset];
    }
  }
}

function flatten(items, res) {
  for (let i = 0, l = items.length; i < l; i++) {
    if (items[i].type === "group") {
      flatten(items[i].children || [], res);
    } else {
      res.push(items[i]);
    }
  }
}
</script>
