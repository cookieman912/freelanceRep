<template>
  <main class="checkout-page">
    <div v-if="this.gig" class="package-container">
      <h1>Yout Package</h1>
      <div class="package-gig-details">
        <div class="package-info-container">
          <div class="img-container">
            <img :src="require(`../assets/images/${gigImgUrl}`)" />
          </div>
          <div>
            <h3>{{ gig.title }}</h3>
            <el-rate
              v-model="sellerRate"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            >
              <span> ({{ gig.reviews.length }} Reviews)</span>
            </el-rate>
            <div class="more-package-info">
              <button>View what's included</button>
            </div>
          </div>
        </div>
        <div class="package-gig-price">$ {{ gig.price }}</div>
      </div>
    </div>
  </main>
</template>

<script>
import { gigService } from "../services/gig.service.js";
export default {
  data() {
    return {
      gig: null,
      sellerRate: null,
    };
  },
  methods: {
    averageRate() {
      let sumRate = 0;
      this.gig.reviews.forEach((review) => {
        return (sumRate += review.rate);
      });
      return sumRate / this.gig.reviews.length;
    },
  },
  computed: {
    gigImgUrl() {
      return this.gig.imgUrls[0].substring(21);
    },
  },
  async created() {
    const { gigId } = this.$route.params;
    this.gig = await gigService.getById(gigId);
    this.sellerRate = this.averageRate();
  },
};
</script>