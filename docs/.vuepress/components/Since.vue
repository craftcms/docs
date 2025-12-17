<template>
  <span :class="{ 'since': true, 'since--with-highlight': $slots.default }">
    <mark v-if="$slots.default" class="since__highlight">
      <slot></slot>
    </mark>

    <a
      class="since__label" 
      :href="releaseUrl"
      :title="parsedDescription"
      target="_blank">
      {{ ver }}<span class="plus">+</span>
    </a>
  </span>
</template>

<script>
const GITHUB_URL = "https://github.com";
const GITHUB_CHANGELOG_FILENAME = "CHANGELOG.md";

export default {
  components: {},
  props: {
    ver: String,
    product: {
      type: String,
      default: 'Craft',
    },
    useChangelog: {
      type: Boolean,
      default: true,
    },
    repo: {
      type: String,
      default: 'craftcms/cms',
    },
    feature: {
      type: String,
      default: 'This feature',
    },
    description: {
      type: String,
      default:  '{feature} was first available in version {ver} of {product}.',
    }
  },
  computed: {
    releaseUrl() {
      // We started supporting GitHub releases in 4.4.6 and 3.8.7. This doesn't validate the incoming version number. Check your references for dead URLs!
      if (this.useChangelog) {
        return `${GITHUB_URL}/${this.repo}/blob/${this.ver}/${GITHUB_CHANGELOG_FILENAME}`;
      }

      return `${GITHUB_URL}/${this.repo}/releases/tag/${this.ver}`;
    },
    parsedDescription() {
      return this.description
        .replace('{feature}', this.feature)
        .replace('{ver}', this.ver)
        .replace('{product}', this.product);
    }
  },
};
</script>

<style lang="postcss" scoped>
.since {
  &--with-highlight {}
}

.since__label {
  @apply inline-block rounded-md py-1 px-1;
  background-color: var(--custom-block-bg-color);
  border-color: var(--border-color);
  font-size: 13px;
  vertical-align: super;
  line-height: 12px;
  text-decoration: none !important;

  &:hover {
    background-color: var(--code-bg-color);
  }

  .since--with-highlight & {}
}

.since__highlight {
    text-decoration: underline;
    text-decoration-style: dotted;
    text-decoration-thickness: 1px;
    text-underline-offset: 2px;
    color: currentColor;
    background-color: transparent;

    /*
    &::before,
    &::after {
      display: inline-block;
      height: 1.3em;
      width: 4px;
      border-width: 1px 0;
      border-radius: 3px;
      border-color: currentColor;
      opacity: 0.25;
      position: relative;
      bottom: -0.3em;
      vertical-align: baseline;
    }

    &::before {
      content: '';
      border-left-width: 1px;
      margin-right: 0.15em;
    }

    &::after {
      content: '';
      border-right-width: 1px;
      margin-left: 0.15em;
    }
    */
}
</style>
