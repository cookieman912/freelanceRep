<template>
    <section class="hp-category-list">
        <ul class="home-page-category-list">
            <li v-for="cat in categories" :key="cat.id">
                <hp-category-preview :cat="cat"/>
            </li>
                <button class="home-page-category-next-btn">&#62;</button>
            </ul>
    </section>
</template>
<script>
import hpCategoryPreview from '../cmps/hp-category-preview.vue'

export default {
    props:{categories:Array},
  components: {
    hpCategoryPreview
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