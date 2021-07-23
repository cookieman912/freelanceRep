<template>
  <div class="edit-seller">
    <div class="seller-details">
      <form @submit.prevent="updateSeller">
        <img class="profile-pic" :src="this.user.imgUrl" alt="profile pic" />
        <h3>{{ user.fullname }}</h3>
        <div class="form-content">
          <div class="form-option">
            <h3>Specialty:</h3>

            <select class="form-input" v-model="userToEdit.seller.specialty">
              <option value="Graphic design">Graphic design</option>
              <option value="Web development">Web development</option>
              <option value="Voice acting">Voice acting</option>
              <option value="Podcast expertise">Podcast expertise</option>
              <option value="Translation">Translation</option>
            </select>
          </div>
          <div class="form-option">
            <h3>Description:</h3>

            <el-input
              class="form-input"
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 10 }"
              v-model="userToEdit.seller.sellerInfo"
            ></el-input>
          </div>
          <div class="form-option">
            <h3>Location:</h3>
            <input class="form input" v-model="userToEdit.seller.location" />
          </div>
        </div>
        <button>Update</button>
      </form>
    </div>
    <div class="user-gigs">
      <!-- <button
          class="el-icon-caret-top gig-add-button"
          v-if="addGigActive"
          @click="toggleAddGig"
        ></button>
        <button
          class="el-icon-caret-bottom gig-add-button"
          v-else
          @click="toggleAddGig"
        ></button>

        <form class="" @submit.prevent="addGig" v-if="addGigActive">
          <div class="gig-inputs">
            <el-input
              class="title-input"
              type="text"
              placeholder="title"
              v-model="gigToAdd.title"
            />
            <el-input
              class="number-input"
              type="number"
              placeholder="price"
              v-model="gigToAdd.price"
            />

            <el-input
              class="delivery-input"
              type="number"
              placeholder="delivery days"
              v-model="gigToAdd.deliveryDays"
            />

            <el-input
              class="desc-input"
              type="textarea"
              autosize
              placeholder="description"
              v-model="gigToAdd.description"
            >
            </el-input>
            <el-select
              class="tag-input"
              v-model="gigToAdd.tags"
              multiple
              placeholder="tags"
            >
              <el-option
                style="margin-bottom: 5px"
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>

              <el-input maxlength="25" show-word-limit
              class="package1-input"
              type="text"
              placeholder="Package 1 includes"
              v-model="gigToAdd.packages[0]"
            />
              <el-input maxlength="25" show-word-limit
              class="package2-input"
              type="text"
              placeholder="Package 2 includes"
              v-model="gigToAdd.packages[1]"
            />
              <el-input maxlength="25" show-word-limit
              class="package3-input"
              type="text"
              placeholder="Package 3 includes"
              v-model="gigToAdd.packages[2]"
            />
          </div>

          <div class="img-upload-container">
            <template v-if="!isLoading">
              <label
                class="img-upload"
                for="imgUploader"
                @drop.prevent="handleFile"
                @dragover.prevent="isDragOver = true"
                @dragleave="isDragOver = false"
                :class="{ drag: isDragOver }"
              >
                <div class="upload-call">
                  <h3>Upload images</h3>
                  <p class="el-icon-upload"></p>
                </div>
              </label>

              <input
                class="hidden"
                type="file"
                name="img-uploader"
                id="imgUploader"
                @change="handleFile"
              />
            </template>

            <img
              class="loader"
              v-else
              src="https://motiongraphicsphoebe.files.wordpress.com/2018/10/8ee212dac057d412972e0c8cc164deee.gif?w=545&h=409"
              alt=""
            />
          </div>

          <div class="img-upload-list">
            <img
              class="img-upload-preview"
              v-for="imgUrl in imgList"
              :key="imgUrl"
              :src="imgUrl"
              alt=""
            />
          </div>

          <button>Add gig</button>
        </form> -->
      <div class="gigs-container">
        <h2>Your gigs</h2>
        <gigs-list-user
          @delete="removeGig(_id)"
          :gigs="this.user.seller.gigs"
        />
      </div>
    </div>

    <!-- <p>{{this.user.seller.orders}}</p> -->
    <order-table :orders="this.user.seller.orders" @updateOrders="updateOrders"/>
    <!-- <h1>Under Construction</h1> -->
  </div>
</template>

<script>
import orderTable from "../cmps/order-table.vue";
import { eventBusService } from "../services/event-bus.service";
import { uploadImg } from "@/services/img-upload.service.js";
import gigsListUser from "../cmps/gigs-list-user.vue";
export default {
  components: {
    gigsListUser,
    orderTable,
  },

  data() {
    return {
      sellerDetails: {
        specialty: null,
        sellerInfo: "",
        location: "",
      },
      addGigActive: false,
      gigToAdd: {
        title: "",
        description: "",
        price: null,
        tags: [],
        deliveryDays: null,
        seller: {},
        imgUrls: [],
        packages: ["", "", ""],
      },
      isLoading: false,
      isDragOver: false,
      options: [
        {
          value: "Graphic design",
          label: "Graphic design",
        },
        {
          value: "Web development",
          label: "Web development",
        },
        {
          value: "Voice acting",
          label: "Voice acting",
        },
        {
          value: "Podcast expertise",
          label: "Podcast expertise",
        },
        {
          value: "Logo",
          label: "Logo",
        },
        {
          value: "Cooking",
          label: "Cooking",
        },
        {
          value: "Business plan",
          label: "Business plan",
        },
      ],
      value: "",
      userToEdit: JSON.parse(JSON.stringify(this.$store.getters.loggedinUser)),
    };
  },

  created() {
    eventBusService.$on("remove-gig", this.removeGig);
  },
  destroyed() {
    eventBusService.$off("remove-gig", this.removeGig);
  },

  computed: {
    getGigs() {
      return this.$store.getters.gigsToShow;
    },
    user() {
      return this.$store.getters.loggedinUser;
    },
    imgList() {
      return this.gigToAdd.imgUrls;
    },
  },

  methods: {
    async updateSeller() {
      const userToSend = this.userToEdit;
      try {
        await this.$store.dispatch({
          type: "becomeSeller",
          userToUpdate: userToSend,
        });
      } catch (err) {
        throw err;
      }
    },

    updateOrders(orders) {
      this.userToEdit.seller.orders = orders;
      this.$store.dispatch({ type: "updateUser", user: this.userToEdit });
    },

    toggleAddGig() {
      this.addGigActive = !this.addGigActive;
    },

    async addGig() {
      try {
        //making gig ready for save
        this.gigToAdd.seller._id = this.user._id;
        this.gigToAdd.seller.fullname = this.user.fullname;
        this.gigToAdd.seller.imgUrl = this.user.imgUrl;

        this.gigToAdd.reviews = [];
        //linking user to gig

        if (!this.gigToAdd.imgUrls || this.gigToAdd.imgUrls.length === 0)
          this.gigToAdd.imgUrls = [
            "https://res.cloudinary.com/cookiecloud/image/upload/v1626858802/hxsjfiiaireuyulffzhy.jpg",
          ];
        this.gigToAdd = await this.$store.dispatch({
          type: "addGig",
          gig: this.gigToAdd,
        });

        const miniGig = {};
        miniGig._id = this.gigToAdd._id;
        miniGig.title = this.gigToAdd.title;
        miniGig.imgUrls = this.gigToAdd.imgUrls;

        const userToUpdate = this.userToEdit;

        userToUpdate.seller.gigs.push(miniGig);

        this.gigToAdd = {
          title: "",
          description: "",
          price: null,
          tags: [],
          deliveryDays: null,
          seller: {},
          packages: ["", "", ""],
        };
        await this.$store.dispatch({ type: "updateUser", user: userToUpdate });
      } catch (err) {
        console.log("error!", err);
        throw err;
      }
    },
    async removeGig(_id) {
      try {
        const idx = this.user.seller.gigs.findIndex((gig) => gig._id === _id);
        const userToUpdate = this.userToEdit;

        console.log(userToUpdate);
        userToUpdate.seller.gigs.splice(idx, 1);
        await this.$store.dispatch({ type: "updateUser", user: userToUpdate });
        await this.$store.dispatch({ type: "removeGig", gigId: _id });
      } catch (err) {
        console.log(err);
      }
    },

    handleFile(ev) {
      let file;
      if (ev.type === "change") file = ev.target.files[0];
      else if (ev.type === "drop") file = ev.dataTransfer.files[0];
      this.onUploadImg(file);
    },

    async onUploadImg(file) {
      this.isLoading = true;
      this.isDragOver = false;
      const res = await uploadImg(file);
      this.isLoading = false;
      this.gigToAdd.imgUrls.push(res.url);
      console.log(this.gigToAdd);
    },
  },
};
</script>

<style>
</style>