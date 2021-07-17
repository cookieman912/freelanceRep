<template>
    <section class="hp-search-bar">
        <input class="home-page-search-bar" placeholder='Try: "building Moblie app"' autocomplete="off">
        <button @click.prevent="toExplorePage">Search</button>
    </section>
</template>
<script>
export default {
  components: {
  },
  computed: {
  
  },
  methods: {
    toExplorePage() {
      this.$router.push("/explore");
    },
  },
};
</script>

