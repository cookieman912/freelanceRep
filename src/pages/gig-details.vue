<template>
  <section v-if="gig">
    <p><span>name:</span> {{ gig.title }}</p>
    <p><span>type:</span> {{ gig.description }}</p>
    <p><span>price:</span> {{ gig.price }}</p>
    <router-link to="/explore/">Go back</router-link>
  </section>
</template>

<script>
import { gigService } from "../services/gig.service.js";
export default {
  data() {
    return {
      gig: null,
    };
  },
  created() {
    const { gigId } = this.$route.params;
    gigService.getById(gigId).then((gig) => {
      this.gig = gig;
    });
  },
};
</script>