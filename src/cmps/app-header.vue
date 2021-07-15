<template>
  <header class="app-header">
    <nav class="nav-header">
      <div class="logo">
        <router-link to="/">freelance<span>.</span></router-link>
      </div>
      <div class="navigation">
        <router-link to="/">Home</router-link>
        <router-link to="/explore">Explore</router-link>
        <router-link to="/becomeSeller">Become a seller</router-link>
        <span v-if="loggedInUser">{{loggedInUser.fullname}}</span>
     
       <button v-else @click="toggleLogin">Sign In</button> 
          <span v-if="loggedInUser" @click="signout">sign out</span>
        <button v-else @click="toggleSignup">
          <span class="header-join">Join</span>
        </button>
       
      </div>
    </nav>
    <!-- <section class="loggedin-user" v-if="loggedInUser">
      <router-link :to="`/user/${loggedInUser._id}`">
        {{ loggedInUser.fullname }}
      </router-link>
      <span>{{ loggedInUser.score }}</span>
    </section> -->
  </header>
</template>
<script>
import {eventBusService} from '../services/event-bus.service.js'
export default {
  
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },
  },
  methods:{
     toggleLogin(){
    eventBusService.$emit('toggle-login')
    },
      toggleSignup(){
    eventBusService.$emit('toggle-signup')
    },
     async signout(){
        await this.$store.dispatch({ type: "logout" });
     }
  }
};


</script>