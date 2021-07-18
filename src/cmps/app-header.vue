<template>
  <header class="app-header">
    <nav class="nav-header">
      <div class="logo">
        <router-link to="/" @click.native="clearSearch"
          >freelance<span>.</span></router-link
        >
      </div>
      <app-header-search v-if="serachBar" @filter="filter" />
      <div class="navigation">
        <router-link to="/" @click.native="clearSearch">Home</router-link>
        <router-link to="/explore">Explore</router-link>
          <template v-if="loggedInUser" class="user-control">
        <router-link v-if="loggedInUser.seller" to="/becomeSeller">To Dashboard</router-link>
         <router-link v-else to="/becomeSeller">Become a seller</router-link>
         </template>
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
  data() {
    return {
      filterBy: {
        txt: "",
      },
    };
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
    async filter(filterBy) {
      this.filterBy = filterBy;
      try {
        this.$store.commit({ type: "setFilter", filterBy });
        console.log("filterBy", filterBy);
      } catch (err) {
        console.log("cannot load gigs", err);
        throw err;
      }
    },
    clearSearch() {
      try {
        this.filterBy = JSON.parse(JSON.stringify(this.filterBy));
        this.filterBy.txt = "";
        this.$store.commit({ type: "setFilter", filterBy: this.filterBy });
      } catch (err) {
        console.log("cannot load gigs", err);
        throw err;
      }
    },
  },
  destroyed() {
    this.clearSearch();
  },
};
</script>