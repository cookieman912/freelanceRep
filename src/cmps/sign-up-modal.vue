modal<template>
  <section @click="clickOutsideModal" class="log-in hidden" ref="signupModal">
    <section class="login-container">
      <header><h4>join Freelancer</h4></header>
      <form>
        <input type="text" placeholder="Choose a username" />

        <input type="password" placeholder="Choose a password" />
        <button>join</button>
      </form>
      <p>
        By joining, you agree to Fiverr’s<span> Terms of Service,</span> as well
        as to receive occasional emails from us
      </p>
      <!-- router link the the near future -->
      <footer>
        <p>
          Already a member?
          <button @click="signinClicked()">
           Sign in 
          </button>
        </p>
      </footer>
    </section>
  </section>
</template>

<script>
import { eventBusService } from "../services/event-bus.service.js";
export default {
  data() {
    return {
      isHidden: true,
    };
  },
  created() {
    eventBusService.$on("toggle-signup", this.toggleSignUp);
  },
  destroyed() {
    eventBusService.$off("toggle-signup", this.toggleSignUp);
  },
  methods: {
    toggleSignUp() {
      if (this.isHidden) this.$refs.signupModal.classList.remove("hidden");
      else this.$refs.signupModal.classList.add("hidden");
      this.isHidden = !this.isHidden;
    },
    clickOutsideModal(event) {
      console.log(event.target.classList.value);
      if (event.target.classList.value === "log-in") this.toggleSignUp();
    },
    signinClicked(){
  this.toggleSignUp();
  eventBusService.$emit('toggle-login')
    }
  },
};
</script>

<style>
</style>