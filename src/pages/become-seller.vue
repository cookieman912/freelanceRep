<template>
  <main class="become-seller-container">
    <h1>become seller!</h1>

    <form @submit.prevent="becomeSeller">
      <h3>what is your specialty?</h3>

      <select v-model="sellerDetails.specialty">
        <option value="graphic design">graphic design</option>
        <option value="web development">web development</option>
        <option value="voice acting">voice acting</option>
        <option value="podcast expertise">podcast expertise</option>
        <option value="translation">translation</option>
      </select>
      <h3>tell us about yourself!</h3>

      <textarea
        v-model="sellerDetails.sellerInfo"
        cols="30"
        rows="10"
      ></textarea>

      <button>become a seller!</button>
    </form>
  </main>
</template>

<script>
export default {
  data() {
    return {
      sellerDetails: {
        specialty: null,
        sellerInfo: "",
      },
      user: JSON.parse(JSON.stringify(this.$store.getters.loggedinUser))
    };
  },


  methods: {
    async becomeSeller() {
this.user.seller=this.sellerDetails
console.log(this.user);

    //   try {
        
    // //    await this.$store.dispatch({type:"becomeSeller",sellerDetails:detailsToSend});
       
    //   } catch {}
    },
  },
};
</script>