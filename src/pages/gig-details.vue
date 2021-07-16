<template>
  <section v-if="gig" class="gig-details-page">
    <main>
      <h2><span>title:</span> {{ gig.title }}</h2>
      <img :src="require(`../assets/images/gigs/${imgUrl}`)" />
      <p><span>type:</span> {{ gig.description }}</p>
      <p><span>price:</span> {{ gig.price }}</p>
      <router-link to="/explore/">Go back</router-link>
    </main>
    <aside class="gig-buying">
      <gig-buying-box />
    </aside>
  </section>
</template>

<script>
import { gigService } from "../services/gig.service.js";
import gigBuyingBox from "../cmps/gig-buying-box.vue";
export default {
  components: {
    gigBuyingBox,
  },
  data() {
    return {
      gig: null,
    };
  },
  created() {
    const { gigId } = this.$route.params;
    console.log("this.$route", this.$route.path);
    gigService.getById(gigId).then((gig) => {
      this.gig = gig;
    });
  },
  computed: {
    imgUrl() {
      return this.gig.imgUrls[0].substring(26);
    },
  },
};
</script>