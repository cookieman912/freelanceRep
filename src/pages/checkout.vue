<template>
  <main></main>
</template>

<script>
import gigService from "../services/gig.service.js";
export default {
  data() {
    return {
      gig: null,
    };
  },
  async created() {
    const { gigId } = this.$route.params;
    console.log("gigId", gigId);
    const gig = await gigService.getById(gigId);
    console.log("this.gig", gig);
  },
};
</script>