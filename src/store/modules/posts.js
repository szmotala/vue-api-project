import axios from "axios";

const state = {
  posts: null,
  count: 0,
  currentPage: 1,
  currentStart: 0,
  pageLimit: 10,
  filter: "",
};

const getters = {
  getPosts: (state) => state.posts,

  getCount: (state) => state.count,

  getPageLimit: (state) => state.pageLimit,

  getCurrentPage: (state) => state.currentPage,
};

const actions = {
  setListProps({ commit }, payload) {
    commit("setPostListProps", payload);
  },

  setFilter({ commit }, filter) {
    commit("setFilterProps", filter);
  },

  //Pobieranie danych wszystkich postów
  async fetchAllPosts({ commit }) {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );

      //Przekazanie danych postów do funkcji mutującej, update'ującej obiekt przechowujący dane.
      commit("setPostsList", response.data);
      commit("setDataCount", response.data.length);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    }
  },

  //Pobieranie wszystkich danych w celu obliczenia ich ilości.
  //W tym przykładzie nie ma możliwości pobrania tej wartości bezpośrednio, jednak poprzez wykorzystanie paginacji również nie ma najmniejszego sensu przechowywać wszystkich postów w pamięci.
  async fetchPostsLength({ commit }) {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?${state.filter}`
      );

      commit("setDataCount", response.data.length);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    }
  },

  async fetchPostsByOffset({ commit }) {
    try {
      //Pobranie danych zależnie od filtrowania. Jeśli brak filtrowania filter = ""
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?${state.filter}&_start=${state.currentStart}&_limit=${state.pageLimit}`
      );

      //Przekazanie danych postów do funkcji mutującej, update'ującej obiekt przechowujący dane.
      commit("setPostsList", response.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    }
  },

  async deletePost({ commit }, id) {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);

      //Po usunięciu należy zastąpić usunięty rekord nowym, pierwszym z kolejnej strony.
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_start=${
          state.currentStart + state.pageLimit
        }&_limit=1`
      );

      commit("deletePost", id);
      commit("setPostListProps", {
        start: state.currentStart + 1,
        page: state.currentPage,
      });
      if (response.data[0] !== undefined)
        commit("updatePostList", response.data[0]);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    }
  },
};

const mutations = {
  setPostsList: (state, posts) => (state.posts = posts),

  setDataCount: (state, count) => (state.count = count),

  setPostListProps: (state, payload) => {
    state.currentStart = payload.start;
    state.currentPage = payload.page;
  },

  setFilterProps: (state, filter) => {
    state.filter = filter;
  },

  deletePost: (state, id) =>
    (state.posts = state.posts.filter((post) => post.id !== id)),

  updatePostList: (state, post) => state.posts.push(post),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
