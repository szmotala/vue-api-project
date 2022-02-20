<template>
  <div class="post-list-content">
    <PagePaginationComponent />
    <PageComponent />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import PageComponent from "../page/PageComponent.vue";
import PagePaginationComponent from "../pagination/PaginationComponent.vue";

export default {
  name: "PostListComponent",

  components: {
    PageComponent,
    PagePaginationComponent,
  },

  computed: {},

  methods: {
    ...mapActions(["fetchPostsByOffset", "setListProps"]),
  },
  created() {
    //Pobranie pierwszej listy postów
    this.fetchPostsByOffset();
  },
};
</script>
