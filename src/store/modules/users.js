import axios from "axios";

const state = {
  users: null,
};

const getters = {
  getAllUsers: (state) => state.users,
};

const actions = {
  //Pobieranie listy użytkowników/autorów postów
  async fetchAllUsers({ commit }) {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );

      //Mapowanie tablicy z użytkownikami.
      //Ponieważ potrzebujemy jedynie imię i nazwisko autora tekstu, pozostałe dane są zbędne
      const users = response.data.map((obj) => {
        return { id: obj.id, name: obj.name };
      });

      //Przekazanie nowej tablicy użytkowników do funckji mutującej
      commit("setUsersList", users);
    } catch (error) {
      //Rozpatrywanie błędów
      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error);
    }
  },
};

const mutations = {
  setUsersList: (state, users) => (state.users = users),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
