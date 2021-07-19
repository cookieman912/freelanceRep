<template>
  <main class="user-details">
    <section class="user-details-container" v-if="user">
      <div class="img-upload-container">
        <h1>Let's Upload Some Images!</h1>

        <template v-if="!isLoading">
          <!-- UPLOAD IMG -->
          <label
            for="imgUploader"
            @drop.prevent="handleFile"
            @dragover.prevent="isDragOver = true"
            @dragleave="isDragOver = false"
            :class="{ drag: isDragOver }"
          >
            <img
              v-if="!isDragOver"
              src="https://www.lifewire.com/thmb/P856-0hi4lmA2xinYWyaEpRIckw=/1920x1326/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg"
              alt=""
            />

            <h3 v-else>Drop image here</h3>
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
      <template class="avatar">
        <img
          v-if="imgNotDefault"
          class="profile-pic"
          :src="this.user.imgUrl"
          alt="profile pic"
        />
        <img
          v-else
          class="profile-pic"
          :src="require(`../assets/images/users/${defaultImageName}`)"
          alt="profile pic"
        />
      </template>
      <h1>hello {{ user.fullname }}</h1>

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
import { uploadImg } from "@/services/img-upload.service.js";
export default {
  watch: {
    userId: {
      handler() {
        this.$store.dispatch({ type: "loadAndWatchUser", userId: this.userId });
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
    userId() {
      return this.$route.params.id;
    },

    defaultImageName() {
      return this.$store.getters.loggedinUser.imgUrl.substring(27);
    },
    imageName() {
      return this.$store.getters.loggedinUser.imgUrl.substring(27);
    },
    imgNotDefault() {
      if (
        this.$store.getters.loggedinUser.imgUrl !=
        "../src/assets/images/users/default.png"
      )
        return true;
      else return false;
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
.loader {
  height: 150px;
}

label img {
  height: 100px;
  cursor: pointer;
  transition: height 0.6s;
}

input {
  width: 0;
  height: 0;
}
.drag {
  color: grey;
  display: inline-block;
  padding: 30px 5px;
  width: 220px;
  border: 1px dashed gray;
  border-radius: 8px;
}
</style>