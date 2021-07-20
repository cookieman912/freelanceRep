<template>
  <!-- <header class="app-header"> -->
  <header class="app-header" v-bind:style="styleObject2">
    <nav class="nav-header">
      <div class="logo">
        <router-link to="/" @click.native="clearSearch" v-bind:style="styleObject"
          >freelance<span>.</span></router-link
        >
      </div>
      <app-header-search v-if="serachBar" @filter="filter" />
      <div class="navigation">
        <router-link to="/" @click.native="clearSearch" v-bind:style="styleObject">Home</router-link>
        <router-link to="/explore" @click.native="clearSearch" v-bind:style="styleObject">Explore</router-link
        >

        <template v-if="loggedInUser" class="user-control">
          <router-link
            v-if="!isUserSeller"
            to="/becomeSeller"
            @click.native="clearSearch"
            >Become a seller</router-link
          >
          
            <img @click="toggleMenu"
              class="avatar"
              :src="loggedInUser.imgUrl"
              alt="avatar"
            />
       

          <user-menu @clear="clearSearch" :user="loggedInUser" />
        </template>
        <template v-else>
          <button class="header-signin" @click="toggleLogin" v-bind:style="styleObject">Sign In</button>
          <!-- <button class="header-signin" @click="toggleLogin" v-bind:style="styleObject">Sign In</button> -->
            
          <!-- <span class="header-signout" v-if="loggedInUser" @click="signout" v-bind:style="styleObject">sign out</span> -->
          <!-- <button @click="toggleSignup" v-bind:style="styleObject"> -->
          <button @click="toggleSignup" v-bind:style="styleObject">
            <span class="header-join" v-bind:style="styleObject">Join</span>
          </button>
        </template>
      </div>
    </nav>
  </header>
</template>
<script>
import { eventBusService } from "../services/event-bus.service.js";
import appHeaderSearch from "./app-header-search.vue";
import userMenu from "./user-menu.vue";
export default {
  components: {
    appHeaderSearch,
    userMenu,
  },
  data() {
    return {
      styleObject: {
        color:null,
        backgroundColor: null,
      },
      styleObject2: {
        color:null,
        backgroundColor: null,
        borderBottom:null
      },
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
    imageName() {
      return this.$store.getters.loggedinUser.imgUrl.substring(27);
    },
  },
  methods: {
    toggleMenu() {
      eventBusService.$emit("toggle-menu");
    },
    toggleLogin() {
      eventBusService.$emit("toggle-login");
    },
    toggleSignup() {
      eventBusService.$emit("toggle-signup");
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
    clearHeader(){
      this.styleObject.backgroundColor = 'white';
    }
    // handleScroll(event) {
    //   console.log("scrolling");
    // },
  },
  created() {
    //window.addEventListener("scroll", this.handleScroll);
    // if(this.$route.name === "home"){
     eventBusService.$on("headerChange", (data) => {
       console.log('data',data)
       this.styleObject2 = data;
       this.styleObject.color = data.color;
       this.styleObject.backgroundColor = data.backgroundColor; 
     });
    // }
  },
  destroyed() {
     eventBusService.$off("headerChange");
   //this.styleObject.backgroundColor = 'white';
    //window.removeEventListener("scroll", this.handleScroll);
    this.clearSearch();
  },
};
</script>