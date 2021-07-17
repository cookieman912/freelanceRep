<template>
    <section class="hp-hero-image-list">
        <ul class="home-page-image-list">
          <li v-for="cat in categories" :key="cat.id">
            <hp-category-preview :cat="cat"/>
          </li>
        </ul>
    </section>
</template>
<script>
import hpCategoryPreview from '../cmps/hp-category-preview.vue'

export default {
    props:{heroImages:Array},
  components: {
   // hpCategoryPreview
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