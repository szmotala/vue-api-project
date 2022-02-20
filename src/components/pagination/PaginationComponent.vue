<template>
  <div>
    <div class="pagination-container">
      <p>Strona:</p>
      <!-- Paginacja dla rozmiaru większego niż 960px -->
      <div v-if="mediaLarge" class="pagination-buttons-container">
        <div
          class="pagination-button-container"
          v-for="(_, index) in new Array(pageCount)"
          :key="index"
        >
          <button
            :class="[currentPage === index + 1 ? 'active' : '']"
            @click="currentPage = index + 1"
          >
            {{ index + 1 }}
          </button>
        </div>
      </div>
      <!-- Paginacja dla wersji mobilnej -->
      <div v-else>
        <select class="pagination-select" v-model="currentPage">
          <option
            v-for="(_, index) in new Array(pageCount)"
            :key="index + 1"
            :value="index + 1"
          >
            {{ index + 1 }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PagePaginationComponent",

  data() {
    return {
      //Aktualna strona
      currentPage: 1,
      mediaLarge: false,
    };
  },

  computed: {
    //Pobieranie wartości potrzebnych do wyliczenia ilości stron
    ...mapGetters({
      count: "getCount",
      pageLimit: "getPageLimit",
    }),
    //Wyliczanie ilości stron
    pageCount() {
      let pageCountValue = this.count / this.pageLimit;
      console.log(Math.round(pageCountValue));
      return Math.ceil(pageCountValue);
    },
  },
  methods: {
    ...mapActions(["fetchPostsByOffset", "setListProps"]),
    onResize() {
      if (window.innerWidth > 960) {
        this.mediaLarge = true;
      } else {
        this.mediaLarge = false;
      }
    },
  },

  created() {
    window.addEventListener("resize", this.onResize);
    this.onResize();
  },

  beforeMounted() {
    window.removeEventListener("resize", this.onResize);
  },

  watch: {
    //Obserwacja zmiany strony przez użytkownika.
    //Z każdą zmianą następuje pobranie nowej listy postów.
    currentPage() {
      //Ustawianie właściwości, według których pobierana jest lista postów.
      //Początkowy indeks oraz aktualna strona.
      this.setListProps({
        start: this.pageLimit * (this.currentPage - 1),
        page: this.currentPage,
      });
      //Pobranie postów według wcześniej ustalonych właściwości
      this.fetchPostsByOffset();
    },
  },
};
</script>
