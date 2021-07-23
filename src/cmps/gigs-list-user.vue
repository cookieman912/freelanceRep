<template>
  <section class="gigs-list-user">
        <button class="add-button el-icon-plus"></button>
    <gig-preview-user v-for="gig in gigs" :gig="gig" :key="gig._id"/>

   
  </section>
</template>

<script>
import gigPreviewUser from "./gig-preview-user.vue";

export default {
  components: {
    gigPreviewUser,
  },
  props: {
    gigs: Array,
  },
  data() {
    return {};
  },
  methods: {

  },
  computed: {},
  created() {},
  destroyed() {},
};
</script>