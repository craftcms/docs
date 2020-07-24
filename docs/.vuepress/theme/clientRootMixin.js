import Vue from "vue";
import nprogress from "nprogress";

export default {
  mounted() {
    // configure progress bar
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
  }
};
