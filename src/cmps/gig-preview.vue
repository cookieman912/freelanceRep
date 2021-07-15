<template>
  <div class="gig-preview">
    <img src="../assets/images/gigs/design.jpg" alt="" />
    <!-- <img :src="require("@/assets/images/gigs/design.jpg")" /> -->
    <!-- <p><span>img:</span> {{ gig.imgUrls }}</p> -->
    <p><span>name:</span> {{ gig.title }}</p>
    <p><span>price:</span> {{ gig.price }}</p>
    <p><span>type:</span> {{ gig.description }}</p>
    <p><span>Delivery days:</span> {{ gig.deliveryDays }}</p>
    <gig-tags :tags="gig.tags" />
  </div>
</template>

<script>
import gigTags from "./gig-tags.vue";
export default {
  props: ["gig"],
  components: {
    gigTags,
  },
  data() {
    return {
      img: null,
    };
  },
  computed: {},
};
</script>
