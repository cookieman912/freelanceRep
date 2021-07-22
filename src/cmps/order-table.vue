  // <template>
  <table>
  <tr>
    <td>order from:</td>
    <td> order for:</td>
    <td> days to deliver</td>
    <td>order status</td>
  </tr>
  <!-- <p>{{orders[0]}}</p> -->
  <tr v-for="order in orders" :key="order.id">
    <td>{{order.buyer}}</td>
    <td>{{order.gig.name}}</td>
    <td>{{deliveryDate(order)}}</td>
  </tr>
  </table>
  </template>

  <script>
  export default {
    props:["orders"],

    methods:{
      deliveryDate(order){
        return order
      }
    }
  }


  </script>

  <style>

  </style>