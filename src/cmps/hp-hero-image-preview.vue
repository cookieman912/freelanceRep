<template>
    <section v-if="hero" class="hp-hero-image-list">
        <img class="hero-image" :src="hero.imgUrl" width="600px">
        <div class="hp-hero-details-container">
            <p>{{hero.fullname}}</p>
            <p>{{hero.specialty}}</p>
            <p>{{hero.rate}}</p>
        </div>
    </section>
</template>
<script>
export default {
    props:{hero:Object},
  components: {
  },
  data() {
      return {
          
      }
    return {};
  },
  methods: {},
  computed: {},
  created() {},
  destroyed() {},
};
</script>