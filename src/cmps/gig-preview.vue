<template>
  <div class="gig-preview">
    <!-- <img src="../assets/images/gigs/design.jpg" alt="" /> -->
    <!-- <p><span>img:</span> {{ gig.imgUrls }}</p> -->
    <router-link :to="'/explore/' + gig._id">
      <img :src="require(`../assets/images/${gigImgUrl}`)" />
    </router-link>
    <figure class="gig-preview-seller-info">
      <img
        class="sellerPropileImg"
        :src="require(`../assets/images/${sellerImgUrl}`)"
      />
      <p>{{ gig.seller.fullname }}</p>
    </figure>
    <div class="gig-preview-gig-info">
      <router-link :to="'/explore/' + gig._id">
        <p class="gig-preview-desc">
          {{ gig.description }}
        </p>
      </router-link>
      <p class="el-icon-star-on">
        <span>{{ gig.reviews[0].rate }}</span>
      </p>
    </div>
    <div class="gig-save-and-price">
      <svg
        @click.stop="saveGig"
        ref="heart"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.4469 1.95625C12.7344 0.496875 10.1875 0.759375 8.61561 2.38125L7.99999 3.01562L7.38436 2.38125C5.81561 0.759375 3.26561 0.496875 1.55311 1.95625C-0.409388 3.63125 -0.512513 6.6375 1.24374 8.45312L7.29061 14.6969C7.68124 15.1 8.31561 15.1 8.70624 14.6969L14.7531 8.45312C16.5125 6.6375 16.4094 3.63125 14.4469 1.95625Z"
        ></path>
      </svg>
      <router-link :to="'/explore/' + gig._id">
        <p>price: {{ gig.price }}</p>
      </router-link>
    </div>
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
  methods: {
    saveGig() {
      const like = this.$refs.heart;
      if (like.style.fill === "red") {
        like.style.fill = "#d5d4d2";
        return;
      }
      like.style.fill = "red";
    },
  },
  computed: {
    gigImgUrl() {
      return this.gig.imgUrls[0].substring(21);
    },
    sellerImgUrl() {
      return this.gig.seller.imgUrl.substring(21);
    },
  },
  methods:{
    
  }
};
</script>
