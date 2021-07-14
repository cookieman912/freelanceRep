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
        <router-link to="/login">Sign In</router-link>
        <router-link to="/login">
          <span class="header-join">Join</span>
        </router-link>
      </div>
    </nav>
    <section class="loggedin-user" v-if="loggedInUser">
      <router-link :to="`/user/${loggedInUser._id}`">
        {{ loggedInUser.fullname }}
      </router-link>
      <span>{{ loggedInUser.score }}</span>
    </section>
  </header>
</template>
<script>
export default {
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },
  },
};
</script>