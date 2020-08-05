import * as fb from "../../Externals/firebase";



export default {
    namespaced: true,
    state: {
        posts:[]
    },
    getters: {
        getPosts(state){
          return state.posts || [];
        }
    },
    mutations: {
        setPosts(state, val){
            state.posts = val;
        }
    },
    actions: {
        async createPost({ state, commit }, post) {
            // create post in firebase
            await fb.postsCollection.add({
              createdOn: new Date(),
              content: post.content,
              userId: fb.auth.currentUser.uid,
              userName: post.createdBy,
              comments: 0,
              likes: 0
            })
          }
    }
}