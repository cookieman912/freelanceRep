<template>
  <header>
    <nav>
      <div class="logo">
        <router-link to="/">
          <span role="img" aria-label="logo">freelance</span>
        </router-link>
      </div>
      <div class="navigation">
        <router-link to="/explore">Explore |</router-link>
        <router-link to="/chat">Become a seller |</router-link>
        <router-link to="/login">Login / Signup</router-link>
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