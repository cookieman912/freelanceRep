<template>
  <main class="become-seller-container">
    <div class="edit-seller" v-if="isUserSeller">
      <div class="seller-details">
        <h1>update your info!</h1>
        <form @submit.prevent="updateSeller">
          <h3>what is your specialty?</h3>

          <el-select v-model="user.seller.specialty">
            <el-option value="graphic design">graphic design</el-option>
            <el-option value="web development">web development</el-option>
            <el-option value="voice acting">voice acting</el-option>
            <el-option value="podcast expertise">podcast expertise</el-option>
            <el-option value="translation">translation</el-option>
          </el-select>
          <h3>tell us about yourself!</h3>

          <el-input type="textarea"
            v-model="user.seller.sellerInfo"
            cols="30"
            rows="10"
          ></el-input>

          <button>update</button>
        </form>

 <button class="toggle-button"  v-if="addGigActive" @click="toggleAddGig">-</button>
   <button class="toggle-button" v-else @click="toggleAddGig">+</button>
    

        <form @submit.prevent="addGig" v-if="addGigActive">
          <input type="text" placeholder="title" v-model="gigToAdd.title" />
          <input type="number" placeholder="price" v-model="gigToAdd.price" />

          <input
            type="number"
            placeholder="delivery days"
            v-model="gigToAdd.deliveryDays"
          />

          <el-input
            type="textarea"
            autosize
            placeholder="description"
            v-model="gigToAdd.description"
          >
          </el-input>

          <el-select v-model="gigToAdd.tags" multiple placeholder="Select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          
          <button>add gig!</button>
        </form>

        <h2>your gigs</h2>

        <gigs-list-user @delete="removeGig(_id)" :gigs="this.user.seller.gigs" />

     
      </div>
    </div>
    <div v-else class="become-seller">
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
    </div>
  </main>
</template>

<script>
import gigsListUser from "../cmps/gigs-list-user.vue";

export default {
  data() {
    return {
      sellerDetails: {
        specialty: null,
        sellerInfo: "",
      },
      user: JSON.parse(JSON.stringify(this.$store.getters.loggedinUser)),
      addGigActive: false,
      gigToAdd: {
        title: "",
        description: "",
        price: null,
        tags: [],
        deliveryDays: null,
        seller: {},
      },
      options: [
        {
          value: "graphic design",
          label: "graphic design",
        },
        {
          value: "web development",
          label: "web development",
        },
        {
          value: "voice acting",
          label: "voice acting",
        },
        {
          value: "podcast expertise",
          label: "podcast expertise",
        },
        {
          value: "translation",
          label: "translation",
        },
      ],
      value: "",
    };
  },

  components: {
    gigsListUser,
  },

  computed: {
    isUserSeller() {
      if (
        this.$store.getters.loggedinUser.seller === null ||
        !this.$store.getters.loggedinUser.seller
      )
        return false;
      else return true;
    },
    getGigs() {
      return this.$store.getters.gigsToShow;
    },
  },

  methods: {
    async becomeSeller() {
      this.user.seller = this.sellerDetails;
      this.user.seller.reviews = [];
      this.user.seller.gigs = [];
      this.user.seller.orders = [];
      const userToSend = this.user;
      try {
        await this.$store.dispatch({
          type: "becomeSeller",
          userToUpdate: userToSend,
        });
        this.user = JSON.parse(
          JSON.stringify(this.$store.getters.loggedinUser)
        );
      } catch (err) {
        throw err;
      }
    },

    async updateSeller() {
      const userToSend = this.user;
      try {
        await this.$store.dispatch({
          type: "becomeSeller",
          userToUpdate: userToSend,
        });
        this.user = JSON.parse(
          JSON.stringify(this.$store.getters.loggedinUser)
        );
      } catch (err) {
        throw err;
      }
    },

    toggleAddGig() {
      this.addGigActive = !this.addGigActive;
    },

    async addGig() {
      this.gigToAdd.imgUrls = ["../src/assets/images/gigs/design.jpg"];
      //making gig ready for save
      this.gigToAdd.seller._id = this.user._id;
      this.gigToAdd.seller.fullname = this.user.fullname;
      this.gigToAdd.seller.imageUrl = this.user.imageUrl;
      this.gigToAdd.reviews = [];
      //linking user to gig

     this.gigToAdd= await this.$store.dispatch({ type: "addGig", gig: this.gigToAdd });
     console.log('after await')
     const miniGig={};
     miniGig._id=this.gigToAdd._id
     miniGig.title=this.gigToAdd.title
     miniGig.imgUrls=this.gigToAdd.imgUrls
     miniGig.description=this.gigToAdd.description
     console.log(this.user)
     this.user.seller.gigs.push(miniGig);

     try{await this.$store.dispatch({type:"updateUser",user:this.user})
      }
      catch(err){
        console.log('error!',err)
        throw err
      }
    
    },
    removeGig(_id){
      console.log('delete',_id)
    }
  },
};
</script>