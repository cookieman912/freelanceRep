<template>
  <header class="app-header">
    <nav class="nav-header">
      <div class="logo">
        <router-link to="/">freelance<span>.</span></router-link>
      </div>
      <app-header-search v-if="serachBar" />
      <div class="navigation">
        <router-link to="/">Home</router-link>
        <router-link to="/explore">Explore</router-link>
        <router-link to="/becomeSeller">Become a seller</router-link>
        <router-link :to="'/user/' + loggedInUser._id" v-if="loggedInUser">{{
          loggedInUser.fullname
        }}</router-link>

        <button v-else @click="toggleLogin">Sign In</button>
        <span v-if="loggedInUser" @click="signout">sign out</span>
        <button v-else @click="toggleSignup">
          <span class="header-join">Join</span>
        </button>
      </div>
    </nav>
  </header>
</template>
<script>
import { eventBusService } from "../services/event-bus.service.js";
import appHeaderSearch from "./app-header-search.vue";
export default {
  components: {
    appHeaderSearch,
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },

    isUserSeller() {
      if (
        this.$store.getters.loggedinUser.seller === null ||
        !this.$store.getters.loggedinUser.seller
      )
        return false;
      else return true;
    },
    serachBar() {
      return this.$route.path !== "/";
    },
  },
  methods: {
    toggleLogin() {
      eventBusService.$emit("toggle-login");
    },
    toggleSignup() {
      eventBusService.$emit("toggle-signup");
    },
    async signout() {
      await this.$store.dispatch({ type: "logout" });
      this.$router.push("/");
    },
  },
};
</script>