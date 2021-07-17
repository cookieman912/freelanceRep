<template>
  <div class="gig-preview">
    <!-- <img src="../assets/images/gigs/design.jpg" alt="" /> -->
    <!-- <p><span>img:</span> {{ gig.imgUrls }}</p> -->
    <img :src="require(`../assets/images/gigs/${imgUrl}`)" />
    <p><span>name:</span> {{ gig.title }}</p>
    <p><span>type:</span> {{ gig.description }}</p>
    <router-link :to="'/explore/' + gig._id">view</router-link>
        <button @click="deleteClicked(gig._id)">delete</button>
  </div>
</template>

<script>
import gigTags from "./gig-tags.vue";
import {eventBusService} from "../services/event-bus.service"
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
      return this.gig.imgUrls[0].substring(26);
    },
  },
  methods:{
    deleteClicked(_id){
 eventBusService.$emit('remove-gig',_id)
    }
  },
};
</script>
