<template>
  <div>
    <div class="gig-details-navbar">
      <nav class="gig-details-nav">
        <a href="#overview" :class="{ 'gig-details-section-active': true }">
          <span>Overview</span>
        </a>
        <a href="#description"><span>Description</span></a>
        <a href="#about-the-seller"><span>About The Seller</span> </a>
        <a href="#reviews"><span>Reviews</span></a>
      </nav>
    </div>
    <section v-if="gig" class="gig-details-page">
      <main>
        <div class="gig-details-small">
          <button class="category">
            <small>{{ gig.tags[0] }}</small>
          </button>
        </div>
        <h2 id="overview">{{ gig.title }}</h2>
        <figure class="gig-details-seller-info">
          <img
            class="sellerPropileImg"
            :src="require(`../assets/images/${sellerImgUrl}`)"
          />
          <p>{{ gig.seller.fullname }} <span>| </span></p>
          <el-rate
            v-model="sellerRate"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          >
          </el-rate>
          <span> (number of reviews)</span>
        </figure>
        <!-- <img :src="require(`../assets/images/gigs/${imgUrl}`)" /> -->
        <el-carousel :interval="5000" arrow="always">
          <el-carousel-item v-for="item in 4" :key="item">
            <img :src="require(`../assets/images/${gigImgUrl}`)" />
          </el-carousel-item>
        </el-carousel>
        <div id="description" class="gig-details-description">
          <h2>About this gig</h2>
          <p>{{ gig.description }}</p>
        </div>
        <div id="about-the-seller" class="gig-details-about-seller">
          <h2>About this seller</h2>
          <figure class="gig-details-seller-info">
            <img
              class="sellerPropileImg"
              :src="require(`../assets/images/${sellerImgUrl}`)"
            />
            <div class="seller-name-description">
              <h5>{{ gig.seller.fullname }}</h5>
              <p>
                seller desciptionseller desciptionseller desciptionseller
                desciptionseller desciptionseller desciption
              </p>
              <el-rate
                v-model="sellerRate"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              >
              </el-rate>
              <span> (number of reviews)</span>
            </div>
          </figure>
        </div>
        <div class="gig-details-more-seller-info">more seller info</div>
        <gig-reviews id="reviews" :reviews="gig.reviews" :gigId="gig._id" />
        <router-link to="/explore/">Go back</router-link>
      </main>
      <aside class="gig-buying">
        <gig-buying-box :gig="gig" />
      </aside>
    </section>
  </div>
</template>

<script>
import { gigService } from "../services/gig.service.js";
import gigBuyingBox from "../cmps/gig-buying-box.vue";
import gigReviews from "../cmps/gig-reviews.vue";
export default {
  components: {
    gigBuyingBox,
    gigReviews,
  },
  data() {
    return {
      gig: null,
      sellerRate: 3.7,
    };
  },
  created() {
    const { gigId } = this.$route.params;
    gigService.getById(gigId).then((gig) => {
      this.gig = gig;
    });
  },
  computed: {
    gigImgUrl() {
      return this.gig.imgUrls[0].substring(21);
    },
    sellerImgUrl() {
      return this.gig.seller.imgUrl.substring(21);
    },
  },
  methods: {
    addClassToNav() {},
  },
};
</script>