<template>
  <div id="app">
    <SiteNav v-if="CheckLogin"></SiteNav>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>


<script>
import SiteNav from '@/components/SiteNav'

export default {
  components: {
    SiteNav,
  },
  computed: {
    CheckLogin() {
      var profile=  this.$store.getters['userModule/getUserProfile'];
      return Object.keys(profile).length > 1
    }
  },
}
</script>