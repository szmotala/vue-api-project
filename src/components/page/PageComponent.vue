<template>
  <div>
    <div class="post-list-container" v-if="posts && usersList">
      <div class="post-container" v-for="post in posts" :key="post.id">
        <PostDetails
          :postData="post"
          :user="usersList.find((user) => user.id === post.userId)"
        />
      </div>
    </div>
    <div v-else>Loading</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PostDetails from "../post-details/PostDatailsComponent.vue";

export default {
  name: "PageComponent",
  components: { PostDetails },

  computed: {
    ...mapGetters({ usersList: "getAllUsers", posts: "getPosts" }),
  },
  methods: {},
};
</script>
