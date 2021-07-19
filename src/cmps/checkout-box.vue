<template>
  <aside class="checkout-box">
    <h4>Summary</h4>
    <div class="cb-seller-price">
      <span>subtutal</span> <span>${{ gig.price }}</span>
    </div>
    <div class="cb-service-fee"><span>Service fee</span><span>$9.90</span></div>
    <div class="cb-total-price">
      <span>Total</span><span>{{ totalPrice }}</span>
    </div>
    <div class="cb-delivery-time">
      <span>Delivery Time</span
      ><span>{{ gig.deliveryDays }} {{ deliveryDays }}</span>
    </div>
    <router-link :to="'/checkout/' + gig._id">
      <button>Continue to Checkout</button>
    </router-link>
    <p class="small">You won't be charged yet</p>
  </aside>
</template>

<script>
export default {
  props: ["gig"],
  computed: {
    totalPrice() {
      return this.gig.price + 9.9;
    },
    deliveryDays() {
      const days = this.gig.deliveryDays > 1 ? "Days" : "Day";
      return days;
    },
  },
};
</script>
