   <template>
  <div class="table-container">
    <h2>Your Orders</h2>
    <table class="order-table">
      <tr>
        <td>Order from:</td>
        <td>Order for:</td>
        <td>Order date</td>
        <td>Order status</td>
      </tr>
      <!-- <p>{{orders[0]}}</p> -->
      <tr v-for="order in orders" :key="order.id">
        <td>{{ order.buyer }}</td>
        <td>{{ order.gig.name }}</td>
        <td>{{ deliveryDate() }}</td>

        <td v-if="order.status === 'pending'">
          Pending
          <div class="options">
            <span @click="handleOrder('reject', order.id)">Reject</span>

            <span @click="handleOrder('accept', order.id)">Accept</span>
          </div>
        </td>
        <td v-else>accepted!</td>
      </tr>
    </table>
  </div>
</template>

  <script>
import { socketService } from "../services/socket.service";
var moment = require("moment"); // require
moment().format();
export default {
  props: ["orders"],

  created() {
    socketService.on("user-updated", (data) => {
     this.orders=data.seller.orders
    });

    
  },

  destroyed() {
  },

  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
  },
  methods: {
    deliveryDate(order) {
      return moment(this.createdAt).format("MMM Do YY");
    },
    isPending(status) {
      return status === "pending";
    },
    handleOrder(response, id) {
      const orderIdx = this.orders.findIndex((order) => order.id === id);
      console.log(orderIdx);
      if (response === "accept") {
        this.orders[orderIdx].status = "accepted";
      } else this.orders.splice(orderIdx, 1);
      this.$emit("updateOrders", this.orders);
    },
  },
};
</script>

  <style>
</style>