<template>
  <main class="explore" v-if="gigs">
    <h2>Results for "logo"</h2>
    <h2>Category name</h2>
    <filter-by @filter="filter" />
    <gigs-list :gigs="getGigs" />
    <!-- <p>{{gigs}}</p> -->
  </main>
</template>

<script>
import gigsList from "../cmps/gigs-list.vue";
import filterBy from "../cmps/explore-filter.vue";
export default {
  components: {
    gigsList,
    filterBy,
  },
  data() {
    return {
      gigs: []
    };
  },
  methods: {
    async filter(filterBy) {
      this.filterBy = filterBy;
      try {
        this.$store.commit({ type: "setFilter", filterBy: this.filterBy });
        console.log("filterBy", this.filterBy);
      } catch (err) {
        console.log("cannot load gigs", err);
        throw err;
      }
    },
  },
  computed: {
    getGigs() {
      this.gigs = this.$store.getters.gigsToShow
      return this.$store.getters.gigsToShow;
    },
  },
  created() {
    this.$store.dispatch({ type: "loadGigs" });
  },
  destroyed() {},
};
</script>
