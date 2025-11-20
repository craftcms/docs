<template>
  <div class="code-toggle">
    <div class="code-lang-switcher theme-default-content-override" role="tablist" v-if="!usePageToggle">
      <button
        v-for="(language, index) in languages"
        :key="language"
        :class="{ active: isSelectedTab(language) }"
        :aria-selected="isSelectedTab(language)"
        :id="getTabId(language)"
        :data-language="language"
        role="tab"
        :aria-controls="getTabPanelId(language)"
        @click="setLanguage(language)"
        :tabindex="isSelectedTab(language) ? null : '-1'"
        v-on:keyup="handleKeyup"
      >{{ getLanguageLabel(language) }}</button>
    </div>
    <div
      v-for="(language, index) in languages"
      tabindex="0"
      :key="index"
      :id="getTabPanelId(language)"
      :hidden="!isSelectedTab(language)"
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
  gap: .3rem;

  button {
    @apply block py-3 px-4 font-medium text-xs tracking-wider uppercase leading-none cursor-pointer rounded;
    border: 1px solid transparent;
    &:hover {
      background-color: var(--sidebar-bg-color);
    }

    &:focus-visible {
      outline: var(--custom-focus-outline);
      outline-offset: 2px;
    }

    &.active {
      border-color: var(--active-tab-border-color);
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
      focusedTabIndex: null,
    };
  },

  mounted() {
    this.uniqueId = uuidv4();
  },

  watch: {
    selectedLanguage(newLanguage) {
      this.$el.querySelector(`button[data-language="${newLanguage}"]`).focus();
    },
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
    getLanguageFromIndex(index) {
      return this.languages[index];
    },
    getIndexFromLanguage(language) {
      return this.languages.indexOf(language);
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
    },
    isSelectedTab(language) {
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
    getNextIndex(index) {
      return index + 1 <= this.languages.length - 1 ? index + 1 : 0;
    },
    getPrevIndex(index) {
      return index - 1 >= 0 ? index - 1 : this.languages.length - 1;
    },
    handleKeyup(event) {
      const {keyCode, target} = event;
      let indexToFocus;
      const currentIndex = this.getIndexFromLanguage(target.getAttribute('data-language'));

      switch (keyCode) {
        case 37:
          indexToFocus = this.getPrevIndex(currentIndex);
          break;
        case 39:
          indexToFocus = this.getNextIndex(currentIndex);
          break;
        case 36:
          indexToFocus = 0;
          break;
        case 35:
          indexToFocus = this.languages.length - 1;
          break;
        default:
          return;
      }

      if (indexToFocus !== undefined) {
        this.setLanguage(this.getLanguageFromIndex(indexToFocus));
      }
    },
  }
};
</script>
