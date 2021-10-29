<template>
  <div>
    <div class="search">
      <div class="w-full shadow rounded">
        <vue-autosuggest
          v-model="query"
          :suggestions="suggestions"
          :input-props="{
            placeholder: 'Select an event...',
            onInputChange: onInputChange,
            class: 'border rounded py-1 px-2 m-3',
            style: 'width: calc(100% - 1.5rem);'
          }"
          :get-suggestion-value="getSuggestionValue"
          @selected="onSelected"
        >
        </vue-autosuggest>
      </div>
    </div>
    <div v-if="currentEvent" class="detail">
      <h2>{{ currentEvent.class }}::{{ currentEvent.name }}</h2>
      <p v-if="currentEvent.desc">{{ currentEvent.desc }}</p>

      <div class="example">
        <h3>Example</h3>

        <fieldset v-if="filterOptions" class="filters shadow rounded px-4 pb-2">
          <legend class="text-light-slate bg-white px-2 rounded -mx-2">
            <b>Filter Options:</b> toggle to update the example below.
          </legend>
          <div
            v-for="(filterData, filterType, index) in filterOptions"
            :key="filterType"
            class="flex w-full py-2"
            :class="{ 'border-t': index !== 0 }"
          >
            <div class="w-4/5 flex items-center content-center">
              <!-- <span class="block">{{ filterType }}</span> -->
              <span v-if="filterData.label" class="block">
                {{ filterData.label }}
              </span>
            </div>
            <div class="w-1/5 text-right">
              <div class="flex">
                <label
                  class="w-1/3 text-red bg-gray-300 py-2 rounded-l text-center flex items-center justify-center px-1 cursor-pointer"
                  title="Example should exclude this condition."
                  :for="filterType + '-off'"
                  :class="{
                    'bg-gray-400 shadow-inner':
                      filterSelections[filterType] == 'off'
                  }"
                >
                  <input
                    type="radio"
                    v-model="filterSelections[filterType]"
                    value="off"
                    :id="filterType + '-off'"
                    class="hidden"
                  />
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="times"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 352 512"
                    class="w-4 h-4"
                  >
                    <path
                      fill="currentColor"
                      d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                      class=""
                    ></path>
                  </svg>
                </label>
                <label
                  class="w-1/3 text-gray-500 py-2 bg-gray-300 text-center border-l-2 border-r-2 border-white flex items-center justify-center cursor-pointer"
                  :for="filterType + '-unset'"
                  :class="{
                    'bg-gray-400 shadow-inner':
                      filterSelections[filterType] == ''
                  }"
                  title="Example should not account for this condition."
                >
                  <input
                    type="radio"
                    v-model="filterSelections[filterType]"
                    value=""
                    :id="filterType + '-unset'"
                    class="hidden"
                  />
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="circle"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    class="w-4 h-4"
                  >
                    <path
                      fill="currentColor"
                      d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200z"
                      class=""
                    ></path>
                  </svg>
                </label>
                <label
                  class="w-1/3 text-green bg-gray-300 py-2 rounded-r text-center flex items-center justify-center cursor-pointer"
                  :for="filterType + '-on'"
                  :class="{
                    'bg-gray-400 shadow-inner':
                      filterSelections[filterType] == 'on'
                  }"
                  title="Example should include this condition."
                >
                  <input
                    type="radio"
                    v-model="filterSelections[filterType]"
                    value="on"
                    :id="filterType + '-on'"
                    class="hidden"
                  />
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="check"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    class="w-4 h-4"
                  >
                    <path
                      fill="currentColor"
                      d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
                      class=""
                    ></path>
                  </svg>
                </label>
              </div>
            </div>
          </div>
        </fieldset>

        <pre class="language-php"><code v-html="exampleCode"></code></pre>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.theme-default-content .autosuggest__results ul {
  @apply m-0 p-0 overflow-y-scroll;
  max-height: 300px;
}

.autosuggest__results .autosuggest__results-item {
  @apply list-none font-mono text-sm py-1 px-4;
}

.autosuggest__results .autosuggest__results-item:hover {
  @apply bg-gray-300;
}
</style>

<script>
import { VueAutosuggest } from "vue-autosuggest";
import EventData from "../../../3.x/event-data/events.json";
import Prism from "prismjs";
import "prismjs/components/prism-php";
import "prismjs/components/prism-markup-templating";

export default {
  components: {
    VueAutosuggest
  },
  data() {
    return {
      query: "",
      eventData: EventData,
      eventOptions: [],
      eventSearchKeyword: "",
      currentEvent: "",
      filterSelections: {}
    };
  },
  mounted() {
    let options = this.eventData;

    options.forEach(option => {
      option.text = option.class + "::" + option.name;
      option.value = option;
    });

    this.eventOptions = options;
  },
  methods: {
    onInputChange(q) {
      this.query = (q || "").toLowerCase();
    },
    getClassName(fullClass) {
      return fullClass.split("\\").pop();
    },
    onSelected(item) {
      let itemValue = this.getSuggestionValue(item);

      if (itemValue && itemValue.value) {
        this.currentEvent = itemValue.value;
      }
    },
    getSuggestionValue(suggestion) {
      this.eventData.forEach(option => {
        let optionLabel = option.class + "::" + option.name;

        if (optionLabel === suggestion.item.replace("//", "/")) {
          this.currentEvent = option.value;
          return option.value;
        }
      });
    }
  },
  watch: {
    currentEvent(event) {
      let filterSelections = {};

      Object.keys(event.filters).forEach(label => {
        filterSelections[label] = "";
      });

      this.filterSelections = filterSelections;
    }
  },
  computed: {
    suggestions() {
      return [
        {
          data: this.eventData
            .filter(item => {
              let itemName = item.class + "::" + item.name;
              return (
                itemName.toLowerCase().indexOf(this.query.toLowerCase()) !== -1
              );
            })
            .map(item => {
              return item.class + "::" + item.name;
            })
        }
      ];
    },
    exampleCode() {
      let classImports = [
        "yii\\base\\Event",
        this.currentEvent.class,
        this.currentEvent.type
      ];
      // TODO: add imports specified by filter selection
      // TODO: honor filter `excludes` options for latest selection
      let html = "";

      // remove any duplicate imports
      classImports = classImports.filter((item, index, inputArray) => {
        return inputArray.indexOf(item) == index;
      });

      /**
       * Imports
       */
      classImports.forEach(classImport => {
        html += `use ${classImport};\n`;
      });

      html += "\n";

      /**
       * Listener
       */
      html += `Event::on(\n`;

      let className = this.getClassName(this.currentEvent.class);
      let typeClassName = this.getClassName(this.currentEvent.type);

      html += `    ${className}::class,\n`;
      html += `    ${className}::${this.currentEvent.name},\n`;
      html += `    function (${typeClassName} $event) {\n`;

      if (!this.activeFilters.length) {
        html += `        // ...\n`;
      } else {
        html += `        if (\n`;

        const filters = Object.entries(this.activeFilters);
        const numFilters = filters.length;

        filters.forEach(([key, value], index) => {
          let label = value[0];
          let setting = value[1];
          let filter = this.filterOptions[label];
          let posNeg = setting === "off" ? "!" : "";
          html += `            ${posNeg}${filter.conditionsPhp}`;
          html += index < numFilters - 1 ? ` &&\n` : `\n`;
        });

        html += `        ) {\n`;
        html += `            // ...\n`;
        html += `        }\n`;
      }

      html += `    }\n`;
      html += `);`;

      return Prism.highlight(html, Prism.languages.php, "php");
      return html;
    },
    filterOptions() {
      return this.currentEvent.filters;
    },
    activeFilters() {
      return Object.entries(this.filterSelections).filter(([key, value]) => {
        return value !== "";
      });
    }
  }
};
</script>
