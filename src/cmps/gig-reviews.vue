<template>
  <section class="gig-review">
    <p class="review-container-header">
      <span>{{ reviews.length }} </span><span>Reviews</span>
    </p>
    <article v-for="review in reviews" :key="review.id">
      <img src="../assets/images/users/default.png" class="user-propile-img" />
      <div class="user-review">
        <div class="user-info-and-rate">
          <p>{{ review.by.fullname }}</p>
          <p class="el-icon-star-on">
            <span>{{ review.rate }}</span>
          </p>
        </div>
        <p class="review-txt">{{ review.txt }}</p>
      </div>
    </article>
    <!-- <div class="add-review">
      <form @submit.prevent="addReview">
        <input type="text" placeholder="Full Name" v-model="review.fullname" />
        <textarea
          name=""
          placeholder="Tell us what do you think... "
          v-model="review.txt"
        >
        </textarea>
        <div class="block">
          <span class="demonstration">Rate:</span>
          <el-rate v-model="review.rate" @click.native="print"></el-rate>
        </div>
        <button @submit.prevent="addReview">Send</button>
      </form>
    </div> -->
  </section>
</template>

<script>
export default {
  props: {
    reviews: Array,
    gigId: String,
  },
  data() {
    return {
      // review: {
      //   fullname: "",
      //   txt: "",
      //   rate: null,
      // },
    };
  },
  // methods: {
  //   print() {
  //     console.log("rateValue", this.review);
  //   },
  //   addReview() {
  //     try {
  //       this.$store.dispatch({
  //         type: "addReview",
  //         review: this.review,
  //         gigId: this.gigId,
  //       });
  //     } catch (err) {
  //       console.log("error!", err);
  //       throw err;
  //     }
  //   },
  // },
  created() {},
};
</script>