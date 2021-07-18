<template>
  <div v-if="getGigs" class="home-page">
    <div class="home-page-top-container" v-bind:style="styleObject">
      <div class="home-page-top main-layout">
        <main class="home-page-search">
          <header class="header">
            <h1>
              <span>You need a <i>free lance</i> in a free world</span>
            </h1>
          </header>
          <form class="home-page-search-container">
            <div class="home-page-search-bar-container">
              <hp-search-bar />
            </div>
          </form>
          <hp-tag-buttons />
        </main>
        <div ref="imgContainer" class="home-page-image-container">
          <hp-hero-image-preview :hero="currHero"/>
        </div>
      </div>
    </div>
    <div class="home-page-bottom-container main-layout">
        <h1>Popular professional services</h1>
        <hp-category-list :categories="getCategories"/>
        <div class="hp-buttom-header-container">
            <h1>Top rated Gigs</h1>
            <span>
              <button @click.prevent="toExplorePage">See all</button>
            </span>
        </div>
        <gigs-list :gigs="getGigs" />
        <div class="hp-buttom-header-container">
          <h1>Discover Web development</h1>
          <span>
            <button @click.prevent="toExplorePage">See all</button>
          </span>
        </div>
        <gigs-list :gigs="getGigs" />
        <div class="hp-buttom-header-container">
          <h1>Discover Business</h1>
          <span>
            <button @click.prevent="toExplorePage">See all</button>
          </span>
        </div>
        <gigs-list :gigs="getGigs" />
    </div>
  </div>
</template>
<script>
import hpSearchBar from "../cmps/hp-search-bar.vue";
import hpTagButtons from "../cmps/hp-tag-buttons.vue";
import hpCategoryList from "../cmps/hp-category-list.vue";
import gigsList from "../cmps/gigs-list.vue";
import hpHeroImagePreview from "../cmps/hp-hero-image-preview.vue"
export default {
  components: {
    hpSearchBar,
    hpTagButtons,
    hpCategoryList,
    gigsList,
    hpHeroImagePreview
  },
  data() {
    return {
      styleObject:{
        backgroundColor: null
      },
      heroInterval:null,
      currHero:null,
      demoHeros:[{
        id:'1',
        fullname:'Keren Lazer',
        rate: 5,
        specialty:'Graphic designer',
        imgUrl:'https://res.cloudinary.com/urigross/image/upload/v1626523420/hp-hero/hero-woman1_1596x1592_ytwxwk.jpg',
        bgColor:'#494949',
      },
      {
        id:'2',
        fullname:'Haim Moshe',
        rate: 5,
        specialty:'Full Stack Developer',
        imgUrl:'https://res.cloudinary.com/urigross/image/upload/v1626521987/hp-hero/depositphotos_18807295-stock-photo-portrait-of-handsome-man_wtcsv2.jpg',
        bgColor:'#d1aa8b'

      },
      {
        id:'3',
        fullname:'Puki Ben David',
        rate: 5,
        specialty:'Strategic Planner',
        imgUrl:'https://res.cloudinary.com/urigross/image/upload/v1626523758/hp-hero/leo_photo_tvqzuq.jpg',
        bgColor:'#a57563'

      },
      {
        id:'4',
        fullname:'Avshalom Kor',
        rate: 5,
        specialty:'Podcaster',
        imgUrl:'https://res.cloudinary.com/urigross/image/upload/v1626524482/hp-hero/breaking_bad_hwhrxl.jpg',
        bgColor:'black'

      },
      {
        id:'5',
        fullname:'Steve Props',
        rate: 5,
        specialty:'Mobile Aplication Freelancer',
        imgUrl:'https://res.cloudinary.com/urigross/image/upload/v1626533012/hp-hero/dvir-yahalom_o9hbr0.jpg',
        bgColor:'#86535c'

      }
      ],
      demoCategories: [
        {
          id: "1",
          catName: "logo",
          txt: "Build your brand",
          title: "Logo Design",
          url: "https://res.cloudinary.com/urigross/image/upload/v1626521677/categories/Elegant-CA-letter-logo-4_kh7yqc.jpg",
          
        },
        {
          id: "2",
          catName: "mobile",
          txt: "Build your mobile site",
          title: "Mobile Builders",
          url: "https://res.cloudinary.com/urigross/image/upload/v1626521677/categories/test-driven-development-t_yr6mzs.jpg",
        },
        {
          id: "3",
          catName: "fullstack",
          txt: "learn web development",
          title: "Fullstack Course",
          url: "https://res.cloudinary.com/urigross/image/upload/v1626521677/categories/ONLC-2017-4-637x350_sgkf3v.png",
        },
        {
          id: "4",
          catName: "podcast",
          txt: "Podcast your ideas",
          title: "Podcast Experts",
          url: "https://res.cloudinary.com/urigross/image/upload/v1626521677/categories/podcast-DAWs_zczltb.jpg",
        },
        {
          id: "5",
          catName: "Business",
          txt: "Business Plan",
          title: "Plan your Business",
          url: "https://res.cloudinary.com/urigross/image/upload/v1626521677/categories/https___blogs-images.forbes.com_forbesfinancecouncil_files_2018_07_pexels-photo-990818-3-1200x730_guamp5.jpg",
        },
      ],
    };
  },
  methods: {},
  computed: {
    getCategories() {
      return this.demoCategories;
    },
    getGigs() {
      return this.$store.getters.gigsToShow;
    },
    
  },
  methods: {
    toExplorePage() {
      this.$router.push("/explore");
    },
  },
  created() {
    this.currHero = this.demoHeros[0];
    this.styleObject.backgroundColor = this.demoHeros[0].bgColor;
    this.$store.dispatch({ type: "loadGigs" });
    this.heroInterval= setInterval(() => {
     // this.$refs.imgContainer
      this.currHero = this.demoHeros[Math.floor(Math.random()*this.demoHeros.length)];
      this.styleObject.backgroundColor = this.currHero.bgColor;
    }, 7000);
  },
  destroyed() {
    clearInterval(this.heroInterval);
  },
};
</script>