import { createStore } from "vuex";
import posts from "./modules/posts";
import users from "./modules/users";

export default createStore({
  modules: {
    posts,
    users,
  },
});
