<template>
    <div class="home-page">
        <div class="home-page-top-container">
            <div class="home-page-top layout">
                <main class="home-page-search">
                        <header class="header">
                            <h1><span>You need a <i>free lance</i> in a free world</span></h1>
                        </header>
                        <form class="home-page-search-container">
                            <div class="home-page-search-bar-container">
                                <hp-search-bar/>
                            </div>
                        </form>
                        <hp-tag-buttons/>                        
                </main>
                <div class="home-page-image-container">
                    <picture>
                        <img src="https://st.depositphotos.com/1008939/i/600/depositphotos_18807295-stock-photo-portrait-of-handsome-man.jpg">
                    </picture>
                </div>
            </div>
        </div>
        <div class="home-page-bottom-container layout">
            <h1>Popular professional services</h1>
            <hp-category-list :categories="getCategories"/>
        </div>
    </div>
</template>
<script>
import hpSearchBar from "../cmps/hp-search-bar.vue";
import hpTagButtons from "../cmps/hp-tag-buttons.vue";
import hpCategoryList from "../cmps/hp-category-list.vue";

export default {
  components: {
    hpSearchBar,
    hpTagButtons,
    hpCategoryList
  },
  data() {
    return {
        demoCategories:[
            {
                id:1,
            catName:'logo',
            txt:'Build your brand',
            title:'Logo Design',
            url:'https://graphicsfamily.com/wp-content/uploads/2020/05/Elegant-CA-letter-logo-4.jpg'
        },{
            id:2,
            catName:'mobile',
            txt:'Build your mobile site',
            title:'Mobile Builders',
            url:'https://www.ionos.co.uk/digitalguide/fileadmin/DigitalGuide/Teaser/test-driven-development-t.jpg'
        },{
            id:3,
            catName:'fullstack',
            txt:'learn web development',
            title:'Fullstack Course',
            url:'https://www.onlc.com/blog/wp-content/uploads/2017/12/ONLC-2017-4-637x350.png'
        },{
            id:4,
            catName:'podcast',
            txt:'Podcast your ideas',
            title:'Podcast Experts',
            url:'https://pbblogassets.s3.amazonaws.com/uploads/2020/03/02153219/podcast-DAWs.jpg'
        },
        ]
    };
  },
  methods: {},
  computed: {
      getCategories(){
          return this.demoCategories;
      }
  },
  created() {},
  destroyed() {},
};
</script>