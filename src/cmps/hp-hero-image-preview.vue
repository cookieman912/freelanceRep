<template>
    <section v-if="hero" class="hp-hero-image-list">
        <img :src="hero.imgUrl" width="600px">
        <p>{{hero.fullname}}</p>
        <p>{{hero.specialty}}</p>
        <p>{{hero.rate}}</p>
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