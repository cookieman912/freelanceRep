<template>
    <section class="hp-category-preview">
        <li class="home-page-category-image-wrapper">
            <button class="home-page-category-before-btn">&#60;</button>
            <div class="home-page-category-text-container">
                <h4>{{cat.txt}}</h4>
                <h2>{{cat.title}}</h2>
            </div>
            <img :src=cat.url>
        </li>
    </section>
</template>
<script>
//imports
export default {
    props:{cat:Object},
  components: {
    
  },
  data() {
      return {
          
      }
  },
  methods: {},
  computed: {},
  created() {},
  destroyed() {},
};
</script>