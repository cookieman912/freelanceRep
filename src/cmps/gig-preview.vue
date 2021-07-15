<template>
  <div class="gig-preview">
    <!-- <img src="../assets/images/gigs/design.jpg" alt="" /> -->
    <!-- <p><span>img:</span> {{ gig.imgUrls }}</p> -->
    <img :src="require(`../assets/images/gigs/${imgUrl}`)" />
    <p><span>name:</span> {{ gig.title }}</p>
    <p><span>price:</span> {{ gig.price }}</p>
    <p><span>type:</span> {{ gig.description }}</p>
    <p><span>Delivery days:</span> {{ gig.deliveryDays }}</p>
    <gig-tags :tags="gig.tags" />
    <router-link :to="'/explore/' + gig._id">view</router-link>
  </div>
</template>

<script>
import gigTags from "./gig-tags.vue";
export default {
  props: {
    gig: Object,
  },
  components: {
    gigTags,
  },
  data() {
    return {
      img: null,
    };
  },
  computed: {
    imgUrl() {
      console.log("this.gig.imgUrls[0]", this.gig.imgUrls[0].substring(26));
      return this.gig.imgUrls[0].substring(26);
    },
  },
};
</script>
