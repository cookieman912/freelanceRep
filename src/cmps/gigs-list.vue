<template>
  <section class="gigs-list" v-bind:style="styleObject">
    <gig-preview v-for="gig in gigs" :gig="gig" :key="gig._id" />
  </section>
</template>

<script>
import gigPreview from "../cmps/gig-preview.vue";

export default {
  components: {
    gigPreview,
  },
  props: {
    gigs: Array,
  },
  data() {
    return {
      styleObject:{
        gridTemplateColumns: null,
      }
    };
  },
  methods: {},
  computed: {},
  created() {
    if(this.$route.name === 'home'){
     this.styleObject.gridTemplateColumns ='repeat(5, 1fr)';
   }
    
  },
  destroyed() {},
};
</script>

