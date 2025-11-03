<template>
  <div class="code-toggle">
    <ul class="code-language-switcher theme-default-content-override" v-if="!usePageToggle">
      <li v-for="(language, index) in languages" :key="index">
        <button
          :class="{ active: isSelectedLanguage(language) }"
          :aria-selected="isSelectedLanguage(language)"
          role="tab"
          :aria-controls="'#' + getLanguageTabId(language)"
          @click="setLanguage(language)"
        >{{ getLanguageLabel(language) }}</button>
      </li>
    </ul>
    <div
      v-for="(language, index) in languages"
      :key="index"
      :id="getLanguageTabId(language)"
      :hidden="!isSelectedLanguage(language)"
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

ul.code-language-switcher {
  @apply flex flex-row rounded-t box-border m-0 p-2;
  background: var(--border-color);
  z-index: 2;

  li {
    @apply p-0 mr-1 list-none;

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
}

.theme-default-content {
  ul.code-language-switcher {
    @apply mb-0;
  }
}
</style>

<script>
import { isStarted } from 'nprogress';

export default {
  props: ["languages", "labels"],

  data() {
    return {
      selectedLanguage: this.languages[0],
    };
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
    getLanguageTabId(language) {
      return `tab-${this._uid}-${language}`;
    }
  }
};
</script>
