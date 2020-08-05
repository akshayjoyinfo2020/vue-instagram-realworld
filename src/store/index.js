import Vue from "vue";
import Vuex from "vuex";
import userModule from './modules/userModule';
import postModule from './modules/postModule';
import createPersistedState from "vuex-persistedstate";
import * as fb from '../Externals/firebase';

Vue.use(Vuex);
fb.postsCollection.orderBy('createdOn', 'desc').onSnapshot(snapshot => {
  let postsArray = []

  snapshot.forEach(doc => {
    let post = doc.data()
    post.id = doc.id

    postsArray.push(post)
  })

  store.commit('postModule/setPosts', postsArray);
})

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { userModule, postModule },
  plugins: [
    createPersistedState()
  ]
});

export default store;
