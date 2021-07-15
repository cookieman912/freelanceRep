<template>
  <section @click="clickOutsideModal" class="log-in hidden" ref="loginModal">
    <section class="login-container">
      <header> <h4>sign in to freelancer</h4></header>
      <form>
        <input type="text" placeholder="username">

          <input type="password" placeholder="password">
          <button>continue</button>
      </form>

      <!-- router link the the near future -->
      <p>not a member yet? <button @click="signupClicked()"> join now! </button></p> 
      </section>
  </section>
</template>

<script>
import {eventBusService} from '../services/event-bus.service.js'
export default {

data(){
  return {
    isHidden:true,
  }
},
created(){
       eventBusService.$on('toggle-login', this.toggleLogin);
    },
    destroyed() {
        eventBusService.$off('toggle-login', this.toggleLogin);
    },
  methods:{
    toggleLogin()
    { 
      if( this.isHidden)
     this.$refs.loginModal.classList.remove('hidden');
     else 
     this.$refs.loginModal.classList.add('hidden');
       this.isHidden= !this.isHidden
     
    },
    clickOutsideModal(event){
     console.log(event.target.classList.value)
    if(event.target.classList.value==='log-in')
    this.toggleLogin()

    },

    signupClicked(){
      this.toggleLogin();
      eventBusService.$emit('toggle-signup')
    }
  }

}
</script>

<style>

</style>