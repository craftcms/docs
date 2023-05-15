import Vue from "vue";
import nprogress from "nprogress";
import debounce from 'lodash.debounce'

export default {
  mounted() {
    /**
     * progress bar
     */
    nprogress.configure({ showSpinner: false, parent: "#nprogress-container" });

    this.$router.beforeEach((to, from, next) => {
      if (to.path !== from.path && !Vue.component(to.name)) {
        nprogress.start();
      }
      next();
    });

    this.$router.afterEach(() => {
      nprogress.done();
      this.isSidebarOpen = false;
    });
  },

  methods: {},

  beforeDestroy () {}
};
