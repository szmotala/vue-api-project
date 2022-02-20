<template>
  <div :class="['post-card', isDeleted ? 'ondelete' : '']">
    <h3 class="title">
      {{ postData.title }}
    </h3>
    <div class="main-content">
      <h5 class="author">Autor: {{ user.name }}</h5>
      <p :class="['text-body', isElipsis ? 'elipsis' : '']">
        {{ postData.body }}
      </p>
      <p class="read-more" @click="readMore()">
        <span v-if="isElipsis">zobacz więcej</span>
        <span v-else>zobacz mniej</span>
      </p>
    </div>
    <div class="button-wrapper">
      <div
        class="button-content"
        @click="[removePost(), deletePost(postData.id)]"
      >
        usuń
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "PostDetails",
  props: ["postData", "user"],

  data() {
    return {
      isDeleted: false,
      isElipsis: true,
    };
  },

  methods: {
    ...mapActions(["deletePost"]),
    removePost() {
      this.isDeleted = true;
    },

    readMore() {
      this.isElipsis = !this.isElipsis;
    },
  },
};
</script>
