<template>
  <div>
    <div class="filter-menu-btn" @click="openMenu()">
      <img src="../../assets/filter-icon.svg" alt="" />
    </div>

    <div :class="['filter-content', isOpen ? 'active' : '']">
      <div class="close-menu-btn" @click="openMenu()">
        <img src="../../assets/close-icon.svg" alt="" />
      </div>

      <div class="search-box">
        <img src="../../assets/search-icon.svg" alt="Search Icon" />
        <input
          name="searchTxtBox"
          type="text"
          v-model="searchPhrase"
          :placeholder="'Wyszukaj w tekście'"
        />
      </div>

      <div class="filter-box">
        <label for="authorFilter">Autor: </label>
        <select id="authorFilter" v-model="authorFilter">
          <option :value="''">wszyscy</option>
          <option v-for="item in users" :key="item.id" :value="item.id">
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="filter-box">
        <label for="sortFilter">Filtruj: </label>
        <select id="sortFilter" v-model="sortFilter">
          <option :value="''">reset</option>
          <option :value="'title&_order=desc'">tytył malejąco</option>
          <option :value="'title&_order=asc'">tytuł rosnąco</option>
        </select>
      </div>

      <div class="reset-btn-box">
        <button @click="resetValues()">reset</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "FilterPanel",

  data() {
    return {
      searchPhrase: "",
      authorFilter: null,
      sortFilter: null,
      isOpen: false,
    };
  },

  computed: {
    ...mapGetters({ users: "getAllUsers" }),
  },

  methods: {
    ...mapActions([
      "setFilter",
      "fetchPostsByOffset",
      "fetchPostsLength",
      "setListProps",
    ]),

    openMenu() {
      console.log("działa");
      this.isOpen = !this.isOpen;
    },

    resetValues() {
      this.searchPhrase = "";
      this.authorFilter = null;
      this.sortFilter = null;
      this.applyFilters();
    },

    applyFilters() {
      let filter = `body_like=${this.searchPhrase}`;

      //Filtrowanie po autorach tekstu
      if (this.authorFilter && this.authorFilter !== "")
        filter = filter.concat(`&userId=${this.authorFilter}`);

      if (this.sortFilter && this.sortFilter !== "")
        filter = filter.concat(`&_sort=${this.sortFilter}`);

      console.log(filter);
      this.setFilter(filter);
      this.setListProps({ start: 0, page: 1 });
      this.fetchPostsLength();
      this.fetchPostsByOffset();
    },
  },

  watch: {
    searchPhrase() {
      this.applyFilters();
    },

    authorFilter() {
      this.applyFilters();
    },

    sortFilter() {
      this.applyFilters();
    },
  },
};
</script>
