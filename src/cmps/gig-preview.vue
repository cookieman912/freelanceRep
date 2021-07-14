<template>
  <div class="gig-preview">
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
};
</script>
