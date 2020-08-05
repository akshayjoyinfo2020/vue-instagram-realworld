import * as fb from "../../Externals/firebase";
import router from "../../router";

export default {
  namespaced: true,
  state: {
    userProfile: {},
  },
  getters: {
    getUserProfile(state){
      return state.userProfile || null;
    }
  },
  mutations: {
    setUserProfile(state, data) {
      state.userProfile = data;
    },
  },
  actions: {
    async login({ dispatch }, form) {
      // sign user in
      const { user } = await fb.auth.signInWithEmailAndPassword(
        form.email,
        form.password
      );

      // fetch user profile and set in state
      dispatch("fetchUserProfile", user);
    },

    async logout ({commit}){
      await fb.auth.signOut();
      commit('setUserProfile', {});
      router.push("/login");

    },

    async signup({ dispatch }, form) {
        // sign user up
        const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)
        
        // create user profile object in userCollections
        await fb.usersCollection.doc(user.uid).set({
          name: form.name,
          title: form.title
        })
      
        // fetch user profile and set in state
        dispatch('fetchUserProfile', user)
      },

    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get();

      // set user profile in state
      var { password , ...userWithoutPassowrd } = userProfile.data();
      commit("setUserProfile", userWithoutPassowrd);

      // change route to dashboard
      router.push("/");
    },
  },
};
