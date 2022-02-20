<template>
  <div id="app">
    <div class="header">
      <h1>Interface obsługi API</h1>
      <a
        href="https://github.com/szmotala"
        target="_blank"
        rel="noopener noreferrer"
        >by szmotala</a
      >
    </div>

    <div class="content">
      <FilterPanel class="filter-panel" />
      <PostListComponent class="post-list" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import PostListComponent from "./components/post-list/PostListComponent.vue";
import FilterPanel from "./components/filter-panel/FilterPanelComponent.vue";

export default {
  name: "App",
  components: {
    PostListComponent,
    FilterPanel,
  },

  computed: {},

  methods: {
    ...mapActions(["fetchPostsLength", "fetchAllUsers", "setListProps"]),
  },
  created() {
    this.fetchPostsLength();
    this.fetchAllUsers();
    this.setListProps({ start: 0, page: 1 });
  },
};
</script>

<style lang="scss">
//Style poszczególnych componentów zapisane są w osobnych plikach i współdzilą stałe takie jak kolory czy rozmiary czcionek
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap");
//Load variables
@import "styles/variables";

//Breakpoints
@import "styles/breakpoints";

//Load all components styles
@import "components/page/page";
@import "components/post-list/post-list";
@import "components/pagination/pagination";
@import "components/post-details/post";
@import "components/filter-panel/filter";

*,
*::after,
*::before {
  font-family: "Poppins";
  padding: 0;
  margin: 0;
}

body {
  background-color: $light;
}

.header {
  text-align: center;
  padding: $header-margin 0;
  margin-bottom: $header-margin;
  background-color: $primary;

  h1 {
    font-size: $font-md;
    margin-bottom: $title-margin-bottom;
    color: $light;

    @include lg {
      font-size: $font-lg;
    }
  }

  a {
    text-decoration: none;
    font-size: $font-subtitle;
    color: $delete;

    &:visited,
    &:active {
      color: $delete-hover;
    }
  }
}

.content {
  display: inline-flex;
  justify-content: center;
  width: 100%;
  position: relative;
  // left: -5%;

  .filter-panel {
    // flex: 1;
    margin-right: $title-margin-bottom;
    margin-top: calc($title-margin-bottom + 3rem);
  }

  .post-list {
    // flex: 9;
  }
}
</style>
