<template>
  <div class="link-panel-wrapper">
    <RouterLink v-if="isInternal" class="link-panel" :to="link" :class="{ 'has-icon': icon }">
      <div v-if="icon" class="link-panel-icon">
        <img :src="icon" class="no-zoom" alt />
      </div>

      <span class="title">
        {{ title }}
      </span>
      <span class="subtitle">{{ subtitle }}</span>

      <div class="flags">
        <div v-if="repo" class="repo-icon">
          <Octocat />
        </div>

        <span v-if="currentVersion" v-text="currentVersion" class="version"></span>
      </div>
    </RouterLink>
    <a
      v-else
      class="link-panel"
      :href="link"
      :target="target"
      :rel="rel"
      :class="{ 'has-icon': icon }"
    >
      <div v-if="icon" class="link-panel-icon">
        <img :src="icon" class="no-zoom" alt />
      </div>

      <span class="title">
        {{ title }}
      </span>
      <span class="subtitle">{{ subtitle }}</span>

      <div class="flags">
        <div v-if="repo" class="repo-icon">
          <Octocat />
        </div>
        <span v-if="currentVersion" v-text="currentVersion" class="version"></span>
      </div>
    </a>
  </div>
</template>

<style lang="postcss">
.link-panel-wrapper {
  @apply block mb-4;
}

.link-panel {
  @apply rounded border block w-full p-4 relative;
  transition: all 500ms cubic-bezier(0.16, 1, 0.3, 1);

  .title {
    @apply leading-none text-lg font-medium block mb-1;
  }

  .subtitle {
    @apply text-sm text-slate block leading-tight;
  }

  .flags {
    @apply absolute flex flex-row-reverse;

    top: 0.9rem;
    right: 0.9rem;
  }

  .repo-icon {
    @apply ml-2;
  }

  .version {
    @apply text-xs text-light-slate font-mono ml-2;
  }

  &:hover {
    @apply no-underline !important;
    box-shadow: 0 0 36px rgba(74, 124, 246, 0.1);
    transform: translateY(-3px) translateZ(0);
  }

  &.has-icon {
    .link-panel-icon {
      @apply block w-6 h-6 absolute;
    }

    .title,
    .subtitle {
      padding-left: 2.25rem;
    }
  }
}

@screen sm {
  .link-panel-wrapper {
    @apply w-1/2 px-2 py-0;
  }
}

@screen md {
  .link-panel-wrapper {}
}

</style>

<script>
import { isExternal, isMailto, isTel, ensureExt } from "../util";
import Octocat from "../icons/Octocat";

export default {
  props: ["icon", "title", "link", "subtitle", "repo", "currentVersion"],
  components: {
    Octocat,
  },
  computed: {
    isNonHttpURI() {
      return isMailto(this.link) || isTel(this.link);
    },

    isBlankTarget() {
      return this.target === "_blank";
    },

    isInternal() {
      return !isExternal(this.link) && !this.isBlankTarget;
    },

    target() {
      if (this.isNonHttpURI) {
        return null;
      }
      return isExternal(this.link) ? "_blank" : "";
    },

    rel() {
      if (this.isNonHttpURI) {
        return null;
      }
      return this.isBlankTarget ? "noopener noreferrer" : "";
    },
  },
};
</script>
