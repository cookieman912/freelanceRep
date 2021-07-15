<template>
    <section class="hp-category-list">
        <ul class="home-page-category-list">
            <li v-for="cat in categories" :key="cat.id">
                <hp-category-preview :cat="cat"/>
            </li>
                <!-- <li class="home-page-category-image-wrapper">
                <button class="home-page-category-before-btn">&#60;</button>
                    <div class="home-page-category-text-container">
                        <h4>Build your brand</h4>
                        <h2>Logo Design</h2>
                    </div>
                    <img src="https://graphicsfamily.com/wp-content/uploads/2020/05/Elegant-CA-letter-logo-4.jpg">
                </li> -->
                <!-- <li class="home-page-category-image-wrapper">
                    <div class="home-page-category-text-container">
                        <h4>Build your Mobile site</h4>
                        <h2>Mobile builders</h2>
                    </div>
                    <img src="https://www.ionos.co.uk/digitalguide/fileadmin/DigitalGuide/Teaser/test-driven-development-t.jpg">
                </li>
                <li class="home-page-category-image-wrapper">
                    <div class="home-page-category-text-container">
                        <h4>Learn Web development</h4>
                        <h2>Fullstack course</h2>
                    </div>
                    <img src="https://www.onlc.com/blog/wp-content/uploads/2017/12/ONLC-2017-4-637x350.png">
                </li>
                <li class="home-page-category-image-wrapper">
                    <div class="home-page-category-text-container">
                        <h4>podcast your ideas</h4>
                        <h2>Podcast experts</h2>
                    </div>
                    <img src="https://pbblogassets.s3.amazonaws.com/uploads/2020/03/02153219/podcast-DAWs.jpg">
                </li> -->
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