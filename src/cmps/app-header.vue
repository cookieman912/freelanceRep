<template>
  <!-- <header class="app-header"> -->
  <!-- <header class="app-header" v-bind:style="styleObject2"> -->
  <header class="app-header" :class="[homePageColorSetClass]">
    <nav class="nav-header">
      <div class="logo" :class="[homePageColorSetClass]">
        <!-- <router-link to="/" @click.native="clearSearch" v-bind:style="styleObject"
          >freelance<span>.</span></router-link
        > -->
        <router-link to="/" @click.native="clearSearch">freelance<span>.</span></router-link>
      </div>
      <app-header-search v-if="serachBar" @filter="filter" />
      <div class="navigation">
        <router-link to="/" @click.native="clearSearch" class="header-nav-a" :class="[homePageColorSetClass]">Home</router-link>
        <!-- <router-link to="/" @click.native="clearSearch" v-bind:style="styleObject">Home</router-link> -->
        <router-link to="/explore" @click.native="clearSearch" class="header-nav-a" :class="[homePageColorSetClass]">Explore</router-link>
        <!-- <router-link to="/explore" @click.native="clearSearch" v-bind:style="styleObject">Explore</router-link> -->


        <template v-if="loggedInUser" class="user-control">
          <router-link class="header-nav-a" :class="[homePageColorSetClass]"
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
          <button class="header-signin" @click="toggleLogin" :class="[homePageColorSetClass]">Sign In</button>
          <!-- <button class="header-signin" @click="toggleLogin" v-bind:style="styleObject">Sign In</button> -->
          <!-- <button @click="toggleSignup" v-bind:style="styleObject"> -->
          <button @click="toggleSignup">
            <!-- <span class="header-join" v-bind:style="styleObject">Join</span> -->
            <span class="header-join "  :class="[homePageColorSetClass]">Join</span>
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
      // homePageColorSetClass:'home-page-header3',
      homePageColorSetClass:'',

      // Dynamic styling for buttons on homepage route
      styleObject: {
        color:null,
        backgroundColor: null,
      },
      // Dynamic styling for header on homepage route
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
  },
  created() {
  // Gets styling params from homepage hero demo data
     eventBusService.$on("headerChange", (data) => {
       if (data===''){
         this.homePageColorSetClass = data;
       }
       else{
         this.homePageColorSetClass = `home-page-header${data}`;
       }
      //  this.styleObject2 = data;
      //  this.styleObject.color = data.color;
      //  this.styleObject.backgroundColor = data.backgroundColor;
     });
  },
  destroyed() {
     eventBusService.$off("headerChange");
    this.clearSearch();
  },
};
</script>