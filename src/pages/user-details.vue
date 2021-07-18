<template>
<main class="user-details">
  <section class="user-details-container" v-if="user">
  
<img class= "profile-pic" :src="require(`../assets/images/users/${imageName}`)" alt="profile pic">

    <h1>hello {{user.fullname }}</h1>
    
  
   <form @submit.prevent="updateUser">
     <h2>edit profile</h2>

    <h4>fullname</h4>
<input type="text" v-model="userToEdit.fullname" placeholder="name">

    <h4>username</h4>
<input type="text" v-model="userToEdit.username" placeholder="username">
<button>update</button>

   </form>
   
  </section>
  </main>
</template>

<script>

export default {
  watch: {
    userId: {
      handler() {
        this.$store.dispatch({ type: "loadAndWatchUser", userId: this.userId });
      },
      immediate: true,
    },
  },

  computed: {
    
    user() {
      return this.$store.getters.loggedinUser
    },
    userToEdit(){
         return JSON.parse(JSON.stringify(this.$store.getters.loggedinUser))
    },
    userId() {
      return this.$route.params.id;
    },
       imageName(){
  return this.$store.getters.loggedinUser.imgUrl.substring(27);
},

mounted(){
 
},
  },

  methods:{
    async updateUser(){
    const userToSend= this.userToEdit
      try{await this.$store.dispatch({type:"updateUser",user:userToSend})
      }
      catch(err){
        console.log('error!',err)
        throw err
      }
    }
  }
};
</script>