<template>
  <component
    class="browser-shot"
    :is="link ? 'a' : 'div'"
    :href="link ? url : null"
    :target="link ? '_blank' : null"
    rel="noopener"
  >
    <figure class="browser-shot-wrapper">
      <div class="browser-shot-content">
        <div class="browser-top"></div>
        <div class="address-bar">
          <div class="address">{{ getDisplayUrl(url) }}</div>
        </div>
        <div
          class="viewport"
          :class="{ 'limit-height': maxHeight }"
          :style="{ maxHeight: maxHeight ? `${maxHeight}px` : null }">
          <div class="image">
            <slot></slot>
            <div class="points" v-if="poi">
              <div
                class="point"
                :class="{ 'point--active': activePoi === `${id}:${name}` }"
                :style="`left: ${point[0]}%; top: ${point[1]}%;`"
                v-for="(point, name, i) in poi" :key="name">{{ point[2] || (i + 1) }}</div>
            </div>
          </div>
        </div>
      </div>
      <figcaption class="caption" v-if="caption">{{ caption }}</figcaption>
    </figure>
  </component>
</template>

<style>
.browser-shot {
  display: block;
  position: relative;
  margin-top: 2em;
  margin-bottom: 2em;
}

.browser-shot-wrapper {
  margin: 0;
}

.browser-shot-content {
  display: block;
  position: relative;
  box-shadow: 0 0 48px rgba(74, 124, 246, 0.1);
  background: transparent;
  border-radius: 6px;
}

.browser-top {
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  height: 22px;
  background: #e5edfd url("../resources/window-buttons.svg") no-repeat left
    center;
  background-size: auto 18px;
}

.address-bar {
  display: block;
  background-color: #e5edfd;
  padding: 0 0.5em 0.5em 0.5em;
}

.address {
  color: #2c3e50;
  background: rgba(255, 255, 255, 0.5);
  font-weight: normal;
  display: block;
  padding: 0.125em 0.25em;
  font-size: 0.75em;
  text-decoration: none;
}

.browser-shot:hover {
  text-decoration: none !important;
}

.browser-shot .viewport {
  position: relative;
}

.browser-shot .viewport.limit-height {
  overflow-x: hidden;
  overflow-y: auto;
}

.browser-shot .image {
  margin: 0;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  overflow: hidden;
  background-color: transparent;
  position: relative;
}

.browser-shot .image img {
  position: relative;
  display: block;
  max-width: 100%;
  height: auto;
}

.browser-shot .caption {
  text-align: center;
  margin-top: 1em;
  font-size: 0.9em;
  color: #637599;
}

/* Points of Interest */

.points {
  left: 0;
  height: 100%;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 100%;
}

.point {
  background-color: var(--craft-red);
  border-radius: 100%;
  color: theme("colors.white");
  font-weight: bold;
  font-size: 14px;
  height: 24px;
  line-height: 24px;
  margin-left: -12px;
  margin-top: -12px;
  position: absolute;
  text-align: center;
  transition: transform 0.5s cubic-bezier(0, 2, 1, 1);
  width: 24px;
}

.point--active {
  background-color: theme("colors.blue");
  transform: scale(1.25);
}
</style>

<script>
import { v4 as uuidv4 } from 'uuid';

export default {
  props: {
    // Unique ID for the screenshot, so we might reference it elsewhere
    id: {
      type: String,
      required: false,
      default: () => uuidv4(),
    },
    // URL to be shown in address bar
    url: {
      type: String,
      required: true,
      default: ""
    },
    // whether to have the entire component use an anchor and link out to URL
    link: {
      type: Boolean,
      required: false
    },
    // whether to remove `http://` or `https://` from the fake address bar
    cleanUrl: {
      type: Boolean,
      require: false,
      default: true
    },
    // caption to be displayed beneath image
    caption: {
      type: String,
      required: false,
      default: ""
    },
    // maximum height, past which any image will be forced to scroll
    maxHeight: {
      type: Number,
      required: false
    },
    poi: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  computed: {
    activePoi: {
      get() {
        return this.$store.state.activePoiId;
      }
    }
  },
  methods: {
    getDisplayUrl(url) {
      if (!this.cleanUrl) {
        return url;
      }

      // remove protocol and trailing slash
      return url
        .replace("https://", "")
        .replace("http://", "")
        .replace(/\/$/, "");
    }
  }
};
</script>
