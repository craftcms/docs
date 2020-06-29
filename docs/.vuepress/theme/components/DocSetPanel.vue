<template>
  <div class="doc-set-panel">
    <div class="primary-sets">
      <RouterLink :to="`/`" class="doc-set home" :class="{ active: $activeSet === false }">
        <span class="back">
          <BackChevron />
        </span>

        <span class="mr-2 inline-block relative home-icon">
          <Home />
        </span>

        <span class="home-title">Home</span>
      </RouterLink>
      <RouterLink
        v-if="$page.frontmatter.home && set.primarySet"
        v-for="(set, index) in $site.themeConfig.docSets"
        :to="defaultUri(set)"
        class="doc-set"
      >
        <span class="mr-2 inline-block relative set-icon">
          <img :src="set.icon" width="16" height="16" alt />
        </span>

        <span>{{ set.setTitle ? set.setTitle : set.title }}</span>
      </RouterLink>
    </div>
    <div v-if="$activeSet" class="doc-set-current">
      <RouterLink :to="defaultUri($activeSet)" class="flex items-center">
        <span class="icon mr-3 inline-block">
          <img :src="$activeSet.icon" width="28" height="28" alt />
        </span>
        <div
          class="title text-slate leading-none font-medium"
        >{{ $activeSet.setTitle ? $activeSet.setTitle : $activeSet.title }}</div>
      </RouterLink>
      <div v-if="$activeSet.versions" class="relative">
        <select name class="doc-set-version" @change="handleVersionSelect($event)">
          <option
            v-for="version in $activeSet.versions"
            :value="version[0]"
            :selected="version[0] == $activeVersion"
          >{{ version[0] }}</option>
        </select>

        <svg
          class="version-arrow absolute"
          width="11"
          height="7"
          viewBox="0 0 11 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.07812 6.07031L0.742188 1.76367C0.566406 1.58789 0.566406 1.42188 0.742188 1.26562L1.29883 0.679688C1.47461 0.523438 1.64062 0.523438 1.79688 0.679688L5.3125 4.16602L8.82812 0.679688C8.98438 0.523438 9.15039 0.523438 9.32617 0.679688L9.88281 1.26562C10.0586 1.42188 10.0586 1.58789 9.88281 1.76367L5.54688 6.07031C5.39062 6.22656 5.23438 6.22656 5.07812 6.07031Z"
            fill="#718096"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.doc-set-panel {
  .primary-sets {
    @apply py-1;

    .set-icon {
      top: 2px;

      img {
        filter: grayscale(100%);
        opacity: 0.85;
      }
    }
  }

  .doc-set {
    @apply block px-4 mt-2 text-slate font-medium text-lg;
  }

  .home {
    @apply text-sm relative;
    color: #718096;

    .back {
      @apply inline-block absolute mr-1 opacity-100;
      top: 4px;
      left: 15px;
      transition: all 100ms ease-out;
      transform: translateX(0);
      width: auto;
    }

    .home-icon {
      @apply hidden;
    }

    .home-title {
      padding-left: 15px;
    }

    &.active {
      @apply text-blue text-lg;

      .home-icon {
        @apply inline-block;
        top: 2px;
        left: -1px;
      }

      .back {
        @apply opacity-0 mr-0;
        transform: translateX(-5px);
      }

      .home-title {
        @apply relative pl-0;
        left: -2px;
      }
    }
  }

  .doc-set-version {
    @apply border pr-5 py-1 rounded-md leading-none block flex content-center items-center appearance-none font-medium text-sm bg-transparent cursor-pointer;
    padding-left: 0.375rem;
  }

  .doc-set-current {
    @apply px-4 mt-2 pb-5 flex w-full justify-between items-center;

    .title {
      font-size: 1.125rem;
    }
  }

  .version-arrow {
    @apply pointer-events-none;
    top: 0.55rem;
    right: 0.385rem;
  }
}
</style>

<script>
import BackChevron from "../icons/BackChevron";
import Home from "../icons/Home";
import { getDocSetDefaultUri } from "../util";

export default {
  components: {
    BackChevron,
    Home
  },
  data() {
    return {
      currentVersion: this.version
    };
  },
  methods: {
    handleVersionSelect(event) {
      const selected = event.target.value;
      this.currentVersion = selected;
      this.$emit("selectVersion", selected);
    },
    defaultUri(set) {
      return getDocSetDefaultUri(set);
    }
  }
};
</script>