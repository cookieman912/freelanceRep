<template>
  <div>
    <div class="gig-details-navbar">
      <nav class="gig-details-nav">
        <a
          href="#overview"
          :class="{ 'gig-details-section-active': navOverview }"
        >
          <span>Overview</span>
        </a>
        <a
          href="#description"
          :class="{ 'gig-details-section-active': navDescription }"
          ><span>Description</span></a
        >
        <a
          href="#about-the-seller"
          :class="{ 'gig-details-section-active': navAboutTheSeller }"
          ><span>About The Seller</span>
        </a>
        <a href="#reviews" :class="{ 'gig-details-section-active': navReviews }"
          ><span>Reviews</span></a
        >
      </nav>
    </div>

    <section v-if="gig" class="gig-details-page">
      <main>
        <div class="gig-details-small">
          <button class="category">
            <small>{{ gig.tags[0] }}</small>
          </button>
        </div>
        <h2 ref="overview" @click.stop="pageNavigationClass" id="overview">
          {{ gig.title }}
        </h2>
        <figure class="gig-details-seller-info">
          <!-- seller picture -->
          <img
            v-if="isSellerCloudinary"
            class="sellerPropileImg"
            :src="gig.seller.imgUrl"
          />
          <img
            v-else
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

        <el-carousel :interval="5000" arrow="always">
          <el-carousel-item v-for="item in 4" :key="item">
            <img v-if="isGigCloudinary" :src="gig.imgUrls[0]" />
            <img v-else :src="require(`../assets/images/${gigImgUrl}`)" />
          </el-carousel-item>
        </el-carousel>

        <div
          ref="description"
          @click.stop="pageNavigationClass"
          id="description"
          class="gig-details-description"
        >
          <h2>About this gig</h2>
          <p>{{ gig.description }}</p>
        </div>
        <div
          ref="aboutTheSeller"
          @click.stop="pageNavigationClass"
          id="about-the-seller"
          class="gig-details-about-seller"
        >
          <h2>About this seller</h2>
          <figure class="gig-details-seller-info">
             <img v-if="isSellerCloudinary"
              class="sellerPropileImg"
              :src="gig.seller.imgUrl"
            />
            <img v-else
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
        <gig-reviews
          ref="reviews"
          @click.stop="pageNavigationClass"
          id="reviews"
          :reviews="gig.reviews"
          :gigId="gig._id"
        />
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
      navOverview: true,
      navDescription: false,
      navAboutTheSeller: false,
      navReviews: false,
    };
  },
  created() {
    const { gigId } = this.$route.params;
    gigService.getById(gigId).then((gig) => {
      this.gig = gig;
    });
    document.addEventListener("scroll", this.pageNavigationClass);
  },
  destroyed() {
    document.removeEventListener("scroll", this.pageNavigationClass);
  },
  computed: {
    gigImgUrl() {
      return this.gig.imgUrls[0].substring(21);
    },
    sellerImgUrl() {
      return this.gig.seller.imgUrl.substring(21);
    },

    isGigCloudinary() {
      return this.gig.imgUrls[0].includes("cloud");
    },

    isSellerCloudinary() {
      return this.gig.seller.imgUrl.includes("cloud");
    },
  },
  methods: {
    addClassToNav() {},
    pageNavigationClass() {
      const overview = this.$refs.overview;
      console.log(overview)
      const description = this.$refs.description;
      const aboutTheSeller = this.$refs.aboutTheSeller;
      const reviews = this.$refs.reviews;
      if (0 < overview.getBoundingClientRect().top) {
        this.navOverview =
          this.navDescription =
          this.navAboutTheSeller =
          this.navReviews =
            false;
        return (this.navOverview = true);
      }
      if (0 < description.getBoundingClientRect().top) {
        this.navOverview =
          this.navDescription =
          this.navAboutTheSeller =
          this.navReviews =
            false;
        return (this.navDescription = true);
      }
      if (0 < aboutTheSeller.getBoundingClientRect().top) {
        this.navOverview =
          this.navDescription =
          this.navAboutTheSeller =
          this.navReviews =
            false;
        return (this.navAboutTheSeller = true);
      }
      if (0 > aboutTheSeller.getBoundingClientRect().top) {
        this.navOverview =
          this.navDescription =
          this.navAboutTheSeller =
          this.navReviews =
            false;
        return (this.navReviews = true);
      }
    },
  },
};
</script>