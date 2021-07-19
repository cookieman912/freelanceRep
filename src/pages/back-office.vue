<template>

    <div class="edit-seller">
      <div class="seller-details">
        <h1>update your info!</h1>
        <form @submit.prevent="updateSeller">
          <div class="form-content">
            <div class="form-option">
              <h3>what is your specialty?</h3>

              <el-select v-model="user.seller.specialty">
                <el-option value="graphic design">graphic design</el-option>
                <el-option value="web development">web development</el-option>
                <el-option value="voice acting">voice acting</el-option>
                <el-option value="podcast expertise"
                  >podcast expertise</el-option
                >
                <el-option value="translation">translation</el-option>
              </el-select>
            </div>
            <div class="form-option">
              <h3>tell us about yourself!</h3>

              <el-input
                type="textarea"
                :autosize="{ minRows: 1, maxRows: 8 }"
                v-model="user.seller.sellerInfo"
              ></el-input>
            </div>
          </div>
          <button>update</button>
        </form>

        <div class="user-gigs">
          <button
            class="toggle-button"
            v-if="addGigActive"
            @click="toggleAddGig"
          >
            -
          </button>
          <button class="toggle-button" v-else @click="toggleAddGig">+</button>

          <form @submit.prevent="addGig" v-if="addGigActive">
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
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>

            <div class="img-upload-container">
              <h1>upload images for your gig!</h1>

              <template v-if="!isLoading">
                <!-- UPLOAD IMG -->
                <label
                  for="imgUploader"
                  @drop.prevent="handleFile"
                  @dragover.prevent="isDragOver = true"
                  @dragleave="isDragOver = false"
                  :class="{ drag: isDragOver }"
                >
                  <h3>Upload here </h3>
                </label>

                <!-- HIDDEN INPUT -->
                <input
                  type="file"
                  name="img-uploader"
                  id="imgUploader"
                  @change="handleFile"
                />
              </template>

              <!-- LOADER -->
              <img
                class="loader"
                v-else
                src="https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif"
                alt=""
              />
            </div>

            <button>add gig!</button>
          </form>

          <h2>your gigs</h2>
           <gigs-list-user
            @delete="removeGig(_id)"
            :gigs="this.user.seller.gigs"
          /> 
        </div>
      </div>
    </div>
</template>

<script>
import { eventBusService } from "../services/event-bus.service";
import { uploadImg } from "@/services/img-upload.service.js";
import gigsListUser from "../cmps/gigs-list-user.vue";
export default {
 components: {
    gigsListUser,
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
        imgUrls:[],
      },
      isLoading: false,
      isDragOver: false,
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
  },

  methods: {
    async updateSeller() {
      const userToSend = this.user;
      try {
        await this.$store.dispatch({
          type: "becomeSeller",
          userToUpdate: userToSend,
        });
        this.user = this.$store.getters.loggedinUser;
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

        this.gigToAdd = await this.$store.dispatch({
          type: "addGig",
          gig: this.gigToAdd,
        });

        const miniGig = {};
        miniGig._id = this.gigToAdd._id;
        miniGig.title = this.gigToAdd.title;
        miniGig.imgUrls = this.gigToAdd.imgUrls;
        miniGig.description = this.gigToAdd.description;
        const userToUpdate = JSON.parse(JSON.stringify(this.user));

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
        const userToUpdate = JSON.parse(JSON.stringify(this.user));
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