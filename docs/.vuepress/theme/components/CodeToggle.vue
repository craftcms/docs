<template>
  <div class="code-toggle">
    <div class="code-lang-switcher theme-default-content-override" role="tablist" v-if="!usePageToggle">
      <button
        v-for="(language, index) in languages" :key="index"
        :class="{ active: isSelectedLanguage(language) }"
        :aria-selected="isSelectedLanguage(language)"
        :id="getTabId(language)"
        role="tab"
        :aria-controls="getTabPanelId(language)"
        @click="setLanguage(language)"
        :tabindex="isSelectedLanguage(language) ? null : '-1'"
      >{{ getLanguageLabel(language) }}</button>
    </div>
    <div
      v-for="(language, index) in languages"
      :key="index"
      :id="getTabPanelId(language)"
      :hidden="!isSelectedLanguage(language)"
      :aria-labelledby="getTabId(language)"
      role="tabpanel">
      <slot :name="language" />
    </div>
  </div>
</template>

<style lang="postcss">
.code-toggle {
  @apply w-full mx-0 my-4;

  div[class*="language-"] {
    @apply rounded-t-none rounded-b my-0;

    &:before {
      @apply hidden;
    }
  }

  & > div > div[class*="language-"] {
    & > pre,
    & > pre[class*="language-"] {
      @apply m-0;
    }
  }
}

.code-lang-switcher {
  @apply flex flex-row rounded-t box-border m-0 p-2;
  background: var(--border-color);
  z-index: 2;

  button {
    @apply block py-3 px-4 font-medium text-xs tracking-wider uppercase leading-none cursor-pointer rounded;

    &:hover {
      background-color: var(--sidebar-bg-color);
    }

    &.active {
      color: var(--text-color);
      background-color: var(--bg-color);
    }
  }
}

.theme-default-content {
  .code-lang-switcher {
    @apply mb-0;
  }
}
</style>

<script>
import { v4 as uuidv4 } from 'uuid';

export default {
  props: ["languages", "labels"],

  data() {
    return {
      selectedLanguage: this.languages[0],
      uniqueId: null,
    };
  },

  mounted() {
    this.uniqueId = uuidv4();
  },

  computed: {
    usePageToggle() {
      if (this.$page === undefined) {
        return false;
      }

      return this.$page.frontmatter.split && this.$page.frontmatter.code;
    }
  },

  methods: {
    setLanguage(language) {
      this.selectedLanguage = language;
    },
    getLanguageLabel(language) {
      if (this.labels && this.labels[language]) {
        return this.labels[language];
      }

      const themeLanguages =
        this.$site !== undefined ? this.$site.themeConfig.codeLanguages : false;

      return (
        (this.labels && this.labels[language]) ||
        (themeLanguages && themeLanguages[language]) ||
        language
      );

      return language;
    },
    isSelectedLanguage(language) {
      return (
        language ==
        (this.usePageToggle
          ? this.$store.state.codeLanguage
          : this.selectedLanguage)
      );
    },
    getTabId(language) {
      return `tab-${this.uniqueId}-${language}`;
    },
    getTabPanelId(language) {
      return `tabpanel-${this.uniqueId}-${language}`;
    },
  }
};
</script>
