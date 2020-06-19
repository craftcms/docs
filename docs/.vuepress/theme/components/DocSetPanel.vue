<template>
  <div class="doc-set-panel">
    <div class="doc-sets">
      <RouterLink :to="`/`" class="doc-set home" :class="{ active: $activeSet === false }">
        <span class="back">
          <svg
            width="7"
            height="12"
            viewBox="0 0 7 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.15625 5.75L4.75 1.125C4.9375 0.9375 5.11458 0.9375 5.28125 1.125L5.90625 1.71875C6.07292 1.90625 6.07292 2.08333 5.90625 2.25L2.1875 6L5.90625 9.75C6.07292 9.91667 6.07292 10.0938 5.90625 10.2812L5.28125 10.875C5.11458 11.0625 4.9375 11.0625 4.75 10.875L0.15625 6.25C-0.0104167 6.08333 -0.0104167 5.91667 0.15625 5.75Z"
              fill="#718096"
            />
          </svg>
        </span>

        <span class="mr-2 inline-block relative home-icon" style="top: 2px; left: -1px;">
          <svg
            width="18"
            height="16"
            viewBox="0 0 20 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.3633 7.32617C19.4961 7.43685 19.5625 7.58073 19.5625 7.75781C19.5625 7.89062 19.5182 8.0013 19.4297 8.08984L19.0977 8.48828C18.987 8.62109 18.8542 8.6875 18.6992 8.6875C18.5664 8.6875 18.4557 8.64323 18.3672 8.55469L17.4375 7.82422V14C17.4375 14.2878 17.3268 14.5312 17.1055 14.7305C16.9062 14.9518 16.6628 15.0625 16.375 15.0625H12.125C11.8372 15.0625 11.5827 14.9518 11.3613 14.7305C11.1621 14.5312 11.0625 14.2878 11.0625 14V10.5469H8.9375V14C8.9375 14.2878 8.82682 14.5312 8.60547 14.7305C8.40625 14.9518 8.16276 15.0625 7.875 15.0625H3.625C3.33724 15.0625 3.08268 14.9518 2.86133 14.7305C2.66211 14.5312 2.5625 14.2878 2.5625 14V7.82422L1.66602 8.55469C1.55534 8.64323 1.43359 8.6875 1.30078 8.6875C1.14583 8.6875 1.01302 8.62109 0.902344 8.48828L0.570312 8.08984C0.481771 7.97917 0.4375 7.86849 0.4375 7.75781C0.4375 7.58073 0.503906 7.43685 0.636719 7.32617L8.80469 0.619141C9.15885 0.33138 9.55729 0.1875 10 0.1875C10.4427 0.1875 10.8411 0.33138 11.1953 0.619141L19.3633 7.32617ZM15.8438 13.4688V6.49609L10 1.71484L4.15625 6.49609V13.4688H7.34375V10.0156C7.34375 9.72786 7.44336 9.48438 7.64258 9.28516C7.86393 9.0638 8.11849 8.95312 8.40625 8.95312H11.5938C11.8815 8.95312 12.125 9.0638 12.3242 9.28516C12.5456 9.48438 12.6562 9.72786 12.6562 10.0156V13.4688H15.8438Z"
              fill="#4A7CF6"
            />
          </svg>
        </span>

        <span class="home-title">Home</span>
      </RouterLink>
      <RouterLink
        v-if="$page.frontmatter.home && set.primarySet"
        v-for="(set, index) in $site.themeConfig.docSets"
        :to="defaultUri(set)"
        class="doc-set"
      >
        <span class="mr-2 inline-block relative" style="top: 2px;">
          <img
            :src="set.icon"
            width="16"
            height="16"
            alt
            style="filter: grayscale(100%); opacity: 0.85;"
          />
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
        <select
          name
          class="doc-set-version border pr-5 py-1 rounded-md leading-none block flex content-center items-center version-select appearance-none font-medium text-sm bg-transparent cursor-pointer"
          @change="handleVersionSelect($event)"
        >
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
}

.doc-sets {
  @apply py-1;
}

.doc-set {
  @apply block px-4  mt-2 text-slate font-medium text-lg;
}

.doc-set-version {
  padding-left: 0.375rem;
}

.doc-set-current {
  @apply px-4 mt-2 pb-5 flex w-full justify-between items-center;

  .title {
    font-size: 1.125rem;
  }
}

.home {
  @apply text-sm relative;
  color: #718096;

  .back {
    @apply inline-block absolute mr-1 opacity-100;
    top: 8px;
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

.version-arrow {
  @apply pointer-events-none;
  top: 0.55rem;
  right: 0.385rem;
}
</style>

<script>
import { getDocSetDefaultUri } from "../util";

export default {
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