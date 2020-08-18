import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../../tailwind.config.js";

const fullConfig = resolveConfig(tailwindConfig);

// [x] colors
// [ ] fonts
// [ ] font sizes
// [ ] font weights
// [ ] body content (headings, p, ul, ol, etc.)
// [ ] breakpoints
// [x] box rounding
// [x] shadows

export default {
  title: "tokens"
};

export const Color = () => ({
  components: {},
  props: {
    colors: { default: Object.entries(fullConfig.theme.colors) }
  },
  template: `
      <div class="flex flex-wrap items-center content-center justify-center p-8 h-screen">
        <div v-for="[name, value] in colors" class="color-card w-32 shadow rounded m-2">
         <div v-if="typeof(value) == 'string'" class="w-full h-24 rounded-t" :class="'bg-' + name"></div>
         <div v-else v-for="variant in Object.keys(value)" class="w-full h-3 text-xs leading-none text-right" :class="'bg-' + name + '-' + variant"><span class="opacity-25">{{ variant }}</span></div>
         <div class="p-2">
           <h3 class="text-sm py-0 my-0 leading-snug">{{ name }}</h3>
           <p class="font-mono text-xs opacity-50 my-0 leading-snug" v-if="typeof(value) == 'string'">{{ value }}</p>
         </div>
        </div>
      </div>
    `
});

export const Shadow = () => ({
  components: {},
  props: {
    boxShadow: { default: Object.entries(fullConfig.theme.boxShadow) }
  },
  template: `
      <div class="p-6 flex flex-wrap w-full h-screen items-center justify-center">
        <div v-for="[name, value] in boxShadow"
          class="w-64 h-32 m-8 p-6 rounded leading-tight"
          :class="name == 'default' ? 'shadow' : 'shadow-' + name"
        >
          <p class="text-sm font-bold p-0 m-0">{{ name }}</p>
          <code class="text-xs leading-none opacity-50">{{ value }}</code>
        </div>
      </div>
    `
});

export const BorderRadius = () => ({
  components: {},
  props: {
    borderRadius: {
      default: Object.entries(fullConfig.theme.borderRadius)
    }
  },
  template: `
    <div class="flex w-full h-screen items-center content-center justify-center flex-wrap">
      <div v-for="[name, value] in borderRadius"
        class="w-24 h-24 m-8 p-4 bg-gray-300 flex content-center justify-center items-center text-center"
        :class="name == 'default' ? 'rounded' : 'rounded-' + name"
      >
        <div>
          <p class="text-sm font-bold p-0 m-0">{{ name }}</p>
          <code class="text-xs leading-none opacity-50">{{ value }}</code>
        </div>
      </div>
    </div>
    `
});
