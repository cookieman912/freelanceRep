<template>
  <section class="gig-package">
    <h4>
      <span>{{ gig.title }}</span> <span>${{ gig.price }}</span>
    </h4>
    <h6>{{ gig.description }}</h6>
    <p class="el-icon-time">{{ gig.deliveryDays }} Days Delivery</p>
    <ul>
      <li>package include 1</li>
      <li>package include 2</li>
      <li>package include 3</li>
    </ul>
    <p></p>
    <router-link :to="'/checkout/' + gig._id">
      <button>Hire</button>
    </router-link>
  </section>
</template>

<script>
export default {
  props: ["gig"],
};
</script>
