<template>
  <header>
    <section>
      <div class="col1">
        <router-link to="/">
          <h3>Vuegram</h3>
        </router-link>
        <ul class="inline">
          <li>
            <router-link to="/">Dashboard</router-link>
          </li>
          <li>
            <router-link to="/settings">Settings</router-link>
          </li>
          <li @click="logout()"><a>logout</a></li>
        </ul>
      </div>
    </section>
  </header>
</template>

<script>

import NProgress from  'nprogress'

export default {
    methods: {
        logout() {
            NProgress.start();
            this.$store.dispatch("userModule/logout").then((result) => {
                NProgress.done();
            }).catch((err) => {
                NProgress.done();
            });;
        }
    },
}
</script>