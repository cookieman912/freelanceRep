<template>
  <div v-if="getGigs" class="home-page">
    <div class="home-page-top-container" v-bind:style="styleObject">
      <div class="home-page-top main-layout">
        <main class="home-page-search">
          <header class="header">
            <h1>
              <span>You need a <i>freelance</i> in a free world</span>
            </h1>
          </header>
          <form class="home-page-search-container">
            <div class="home-page-search-bar-container">
              <hp-search-bar />
            </div>
          </form>
          <hp-tag-buttons />
        </main>
        <div class="home-page-image-container">
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
import { eventBusService } from "../services/event-bus.service.js";
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
        color: null,
        backgroundColor: null
      },
      heroInterval:null,
      currHero:null,
      demoHeros:[{
        id:'1',
        fullname:'Keren Lazer',
        rate: 4.5,
        specialty:'Graphic designer',
        imgUrl:'https://res.cloudinary.com/urigross/image/upload/v1626634929/hp-hero/pngfind.com-business-woman-png-1612489_2_kn1y2b.png',
        colorSet:{backgroundColor:'#494949',color:'white'},
      },
      {
        id:'2',
        fullname:'Haim Moshe',
        rate: 4.8,
        specialty:'Full Stack Developer',
        imgUrl:'https://res.cloudinary.com/urigross/image/upload/v1626705372/hp-hero/pngfind.com-business-man-png-1144946_2_yzvnhb.png',
        colorSet:{backgroundColor:'#d1aa8b',color:'white'}
      },
      {
        id:'3',
        fullname:'Puka Bat David',
        rate: 4.7,
        specialty:'Strategic Planner',
        imgUrl:'https://res.cloudinary.com/urigross/image/upload/v1626705830/hp-hero/pngfind.com-ladies-suit-png-248538_2_ljes8n.png',
        colorSet:{backgroundColor:'#a57563',color:'white'}

      },
      {
        id:'4',
        fullname:'Shomit Bona-Suka',
        rate: 5,
        specialty:'Podcaster',
        imgUrl:'https://res.cloudinary.com/urigross/image/upload/v1626634928/hp-hero/pngfind.com-woman-png-547411_2_sx13da.png',
        colorSet:{backgroundColor:'black',color:'white'}

      },
      {
        id:'5',
        fullname:'Jon Doe',
        rate: 4.6,
        specialty:'Mobile Aplication Freelancer',
        imgUrl:'https://res.cloudinary.com/urigross/image/upload/v1626634928/hp-hero/pngaaa.com-1274196_2_pcd11d.png',
        colorSet:{backgroundColor:'#86535c',color:'white'}
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
  methods: {
    onScroll(){
      console.log('hii')
    }
  },
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
    this.styleObject.backgroundColor = this.demoHeros[0].colorSet.backgroundColor;
    this.styleObject.color = this.demoHeros[0].colorSet.color;
    // this.styleObject.backgroundColor = this.currHero.backgroundColor;
    eventBusService.$emit('headerColorChange',this.currHero.colorSet);
    this.$store.dispatch({ type: "loadGigs" });
    this.heroInterval= setInterval(() => {
      this.currHero = this.demoHeros[Math.floor(Math.random()*this.demoHeros.length)];
      this.styleObject.backgroundColor = this.currHero.colorSet.backgroundColor;
      this.styleObject.color = this.currHero.colorSet.color;
      eventBusService.$emit('headerColorChange',this.currHero.colorSet);
    }, 7000);
  },
  destroyed() {
    eventBusService.$emit('headerColorChange','white');
    clearInterval(this.heroInterval);
  },
};
</script>