<template>
  <div class="edit-seller">
    <div class="seller-details">
      <form @submit.prevent="updateSeller">
        <div class="form-content">
          <h1>Update</h1>
          <div class="form-option">
            <h3>Specialty</h3>

            <el-select class="form-input" v-model="userToEdit.seller.specialty">
              <el-option value="Graphic design">Graphic design</el-option>
              <el-option value="Web development">Web development</el-option>
              <el-option value="Voice acting">Voice acting</el-option>
              <el-option value="Podcast expertise">Podcast expertise</el-option>
              <el-option value="Translation">Translation</el-option>
            </el-select>
          </div>
          <div class="form-option">
            <h3>description</h3>

            <el-input
              class="form-input"
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 5 }"
              v-model="userToEdit.seller.sellerInfo"
            ></el-input>
          </div>
        </div>
        <button>Update</button>
      </form>

      <div class="user-gigs">
        <button
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
          </div>

          <div class="img-upload-container">
            <template v-if="!isLoading">
          
              <label class=img-upload
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
              src="https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif"
              alt=""
            />
          </div>

          
          <div class="img-upload-list" >
          <img class="img-upload-preview" v-for="imgUrl in imgList" :key="imgUrl" :src="imgUrl" alt="">
          </div>

          <button>Add gig</button>
        </form>

        <h2>Your gigs</h2>
        <gigs-list-user
          @delete="removeGig(_id)"
          :gigs="this.user.seller.gigs"
        />
      </div>
      <h2>Your orders</h2>
      <order-table/>
    </div>
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
          value: "Translation",
          label: "Translation",
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
    imgList(){
      return this.gigToAdd.imgUrls
    }
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