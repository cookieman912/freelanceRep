  // <template>
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
      <td v-if="order.status==='pending'">{{ order.status }} <button @click="handleOrder('reject',order.id)">x</button> 
   
      <button @click="handleOrder('accept',order.id)">v</button></td>
         <td v-else>accepted!</td>
    </tr>
  </table>
</template>

  <script>
var moment = require("moment"); // require
moment().format();
export default {
  props: ["orders"],

  computed: {
   
  },
  methods: {
    deliveryDate(order) {
      return moment(this.createdAt).format("MMM Do YY");
    },
  isPending(status){
      return (status==='pending')
    },
    handleOrder(response,id){
      const orderIdx=this.orders.findIndex(order => order.id===id)
      console.log(orderIdx)
      if(response==='accept'){
        this.orders[orderIdx].status="accepted"
      }
      else this.orders.splice(orderIdx,1)
      this.$emit('updateOrders',this.orders)

    }
   
  },
};
</script>

  <style>
</style>