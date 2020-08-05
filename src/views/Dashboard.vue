<template>
  <div id="dashboard">
    <transition name="fade">
      <CommentModal v-if="showCommentModal" :post="selectedPost" @close="toggleCommentModal()"></CommentModal>
    </transition>
    <section>
      <div class="col1">
        <div class="profile">
          <h5>{{ getUserProfile.name }}</h5>
          <p>{{ getUserProfile.title }}</p>
          <div class="create-post">
            <p>create a post</p>
            <form @submit.prevent>
              <textarea v-model.trim="post.content"></textarea>
              <button @click="createPost()" :disabled="post.content === ''" class="button">post</button>
            </form>
          </div>
        </div>
      </div>
      <div class="col2">
        <div v-if="getPosts.length">
          <div v-for="post in getPosts" :key="post.id" class="post">
            <h5>{{ post.userName }}</h5>
            <span>{{ post.createdOn | formatDate }}</span>
            <p>{{ post.content | trimLength }}</p>
            <ul>
              <li>
                <a @click="toggleCommentModal(post)">comments {{ post.comments }}</a>
              </li>
              <li>
                <a>likes {{ post.likes }}</a>
              </li>
              <li>
                <a>view full post</a>
              </li>
            </ul>
          </div>
        </div>
        <div v-else>
          <p class="no-results">There are currently no posts</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NProgress from "nprogress";
import moment from "moment";
import CommentModal from '@/components/CommentModal';


export default {
  components: {
    CommentModal,
  },
  data() {
    return {
      post: {
        content: ""
      },
      showCommentModal: false,
      selectedPost: {}
    };
  },
  methods: {
    createPost() {
      NProgress.start();
      this.$store
        .dispatch("postModule/createPost", {
          content: this.post.content,
          createdBy: this.getUserProfile.name
        })
        .then(result => {
          this.post.content = "";
          NProgress.done();
        })
        .catch(err => {
          this.post.content = "";
          NProgress.done();
        });
    },
    toggleCommentModal(post) {
      this.showCommentModal = !this.showCommentModal;

      // if opening modal set selectedPost, else clear
      if (this.showCommentModal) {
        this.selectedPost = post;
      } else {
        this.selectedPost = {};
      }
    }
  },
  computed: {
    getUserProfile() {
      return this.$store.getters["userModule/getUserProfile"];
    },
    getPosts() {
      return this.$store.getters["postModule/getPosts"];
    }
  },
  filters: {
    formatDate(val) {
      if (!val) {
        return "-";
      }
      let date = val.toDate();
      return moment(date).fromNow();
    },
    trimLength(val) {
      if (val.length < 200) {
        return val;
      }
      return `${val.substring(0, 200)}...`;
    }
  }
};
</script>

<style lang="scss" scoped>

</style>