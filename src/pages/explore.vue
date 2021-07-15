<template>
  <main class="explore">
    <filter-by />
    <gigs-list :gigs="getGigs" />
  </main>
</template>

<script>
import gigsList from "../cmps/gigs-list.vue";
import filterBy from "../cmps/filter.vue";
export default {
  components: {
    gigsList,
    filterBy,
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    getGigs() {
      return this.$store.getters.gigsToShow;
    },
  },
  created() {
    this.$store.dispatch({ type: "loadGigs" });
  },
  destroyed() {},
};
</script>
