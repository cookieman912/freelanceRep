<template>
  <div id="app">
     <login-modal/>
    <user-msg/>
    <app-header />
    <router-view/>
     
   
  </div>
</template>

<script>

import appHeader from './cmps/app-header'
import userMsg from './cmps/user-msg'
import LoginModal from './cmps/login-modal.vue'

export default {
  components: {
    appHeader,
    userMsg,
    LoginModal,
  }
}
</script>

