<template>
    <section class="hp-category-preview">
        <li v-if="cat" class="home-page-category-image-wrapper">
            <div  class="home-page-category-text-container">
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
          data:{
              show:true
          }
          
      }
  },
  methods: {},
  computed: {},
  created() {},
  destroyed() {},
};
</script>