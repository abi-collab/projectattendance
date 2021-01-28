<template>
  <div id="app" style="background-color:white;">


    <!-- <div id="nav"> -->
      <!-- <router-link to="/">Home</router-link> | -->
      <!-- <router-link to="/about">About</router-link> | -->

      <!-- <router-link to="/login">Login</router-link>  -->

      <!-- <router-link to="ward">ward</router-link> -->
    <!-- </div> -->

       <ward v-if="showNav"></ward>

    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ward from './components/ward'

export default {
  components: {
   ward
  },
  computed: {
    ...mapState(['userProfile']),
    showNav() {
      return Object.keys(this.userProfile).length > 1
    }
  }
  
}
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
router-link {
  font-size: 50px;
}
</style>
