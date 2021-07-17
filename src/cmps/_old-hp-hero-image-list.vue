<template>
    <section class="hp-hero-image-list">
        <ul class="home-page-image-list">
          <li v-for="hero in heros" :key="hero.id">
              <!-- <pre>{{hero}}</pre> -->
            <hp-hero-image-preview :hero="hero"/>
          </li>
        </ul>
    </section>
</template>
<script>
import hpHeroImagePreview from './hp-hero-image-preview.vue'

export default {
    props:{heros:Array},
  components: {
   hpHeroImagePreview
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