<template>
  <section class="gig-review">
    <p>
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
      <!-- {{ review }} -->
    </article>
  </section>
</template>

<script>
export default {
  props: {
    reviews: Array,
  },
};
</script>