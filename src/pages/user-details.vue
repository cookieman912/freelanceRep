<template>
  <main class="user-details">
    <section class="user-details-container" v-if="user">
      <div class="img-upload-container">
 

        <template v-if="!isLoading">
          <!-- UPLOAD IMG -->
          <label
            for="imgUploader"
            @drop.prevent="handleFile"
            @dragover.prevent="isDragOver = true"
            @dragleave="isDragOver = false"
            :class="{ drag: isDragOver }"
          >
   

              <template class="avatar">
        <img
          
          class="profile-pic"
          :src="this.user.imgUrl"
          alt="profile pic"
        />
      </template>
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
   
      <h1>Hello {{ user.fullname }}</h1>

      <P>Member since {{memberSince}} </P>

      <form @submit.prevent="updateUser">
        <h2>edit profile</h2>

        <h4>fullname</h4>
        <input type="text" v-model="userToEdit.fullname" placeholder="name" />

        <h4>username</h4>
        <input
          type="text"
          v-model="userToEdit.username"
          placeholder="username"
        />
        <button>update</button>
      </form>
    </section>
  </main>
</template>

<script>

var moment = require('moment'); // require
moment().format();
import { uploadImg } from "@/services/img-upload.service.js";
export default {
  watch: {
    userId: {
      handler() {
        this.$store.dispatch({ type: "loadAndWatchUser", userId: this.userId });
        // console.log(this.userToEdit.createdAt)
      },
      immediate: true,
    },
  },
  data() {
    return {
      isLoading: false,
      isDragOver: false,
    };
  },

  computed: {
    user() {
      return this.$store.getters.loggedinUser;
    },
    userToEdit() {
      return JSON.parse(JSON.stringify(this.$store.getters.loggedinUser));
    },
   memberSince(){
      return moment().format("MMM Do YY");              
   },


   
    mounted() {},
  },

  methods: {
    async updateUser() {
      const userToSend = this.userToEdit;
      try {
        await this.$store.dispatch({ type: "updateUser", user: userToSend });
      } catch (err) {
        console.log("error!", err);
        throw err;
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

      this.userToEdit.imgUrl = res.url;
      this.updateUser();
    },
  },
};
</script>

<style>

</style>