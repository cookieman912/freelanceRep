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
              <hp-search-bar @filter="filter"/>
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
      filterBy: {
        txt:""
      },
      // style object for the header via eventbus
      styleObject:{
        color: null,
        backgroundColor: null,
        borderBottom: null,
      },
      // hero images demo data
      heroInterval:null,
      currHero:null,
      demoHeros:[{
        id:'1',
        fullname:'Keren Lazer',
        rate: 4.5,
        specialty:'Graphic designer',
        imgUrl:'https://res.cloudinary.com/urigross/image/upload/v1626634929/hp-hero/pngfind.com-business-woman-png-1612489_2_kn1y2b.png',
        styleSet:{backgroundColor:'#494949',color:'white'},
      },
      {
        id:'2',
        fullname:'Haim Moshe',
        rate: 4.8,
        specialty:'Full Stack Developer',
        imgUrl:'https://res.cloudinary.com/urigross/image/upload/v1626705372/hp-hero/pngfind.com-business-man-png-1144946_2_yzvnhb.png',
        styleSet:{backgroundColor:'#d1aa8b',color:'white'}
      },
      {
        id:'3',
        fullname:'Puka Bat David',
        rate: 4.7,
        specialty:'Strategic Planner',
        imgUrl:'https://res.cloudinary.com/urigross/image/upload/v1626705830/hp-hero/pngfind.com-ladies-suit-png-248538_2_ljes8n.png',
        styleSet:{backgroundColor:'#a57563',color:'white'}

      },
      {
        id:'4',
        fullname:'Shlomit Bona-Suka',
        rate: 5,
        specialty:'Podcaster',
        imgUrl:'https://res.cloudinary.com/urigross/image/upload/v1626634928/hp-hero/pngfind.com-woman-png-547411_2_sx13da.png',
        styleSet:{backgroundColor:'black',color:'white'}

      },
      {
        id:'5',
        fullname:'Jon Doe',
        rate: 4.6,
        specialty:'Mobile Aplication Freelancer',
        imgUrl:'https://res.cloudinary.com/urigross/image/upload/v1626634928/hp-hero/pngaaa.com-1274196_2_pcd11d.png',
        styleSet:{backgroundColor:'#86535c',color:'white'}
      }
      ],

      // Demo data for categories gallery
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
    async filter(filterBy){
      this.filterBy = filterBy;
      try{
        this.$store.commit({type:"setFilter", filterBy});
      }
      catch (err){
        console.log('Cannot load gigs',err);
        throw err;
      }
    }
   
  },
  created() {
    // Default hero for loading page
    this.currHero = this.demoHeros[0];
    // styleObject gets the style params of the hero.
    this.styleObject.backgroundColor = this.demoHeros[0].styleSet.backgroundColor;
    this.styleObject.color = this.demoHeros[0].styleSet.color;
    this.styleObject.borderBottom = "none";
    // Sending style params to the header becuase homepage has a different header style
    // eventBusService.$emit('headerChange',this.styleObject);
    eventBusService.$emit('headerChange',this.demoHeros[0].id);

    this.$store.dispatch({ type: "loadGigs" });
    // Interval for new hero
    this.heroInterval= setInterval(() => {
      this.currHero = this.demoHeros[Math.floor(Math.random()*this.demoHeros.length)];
      this.styleObject.backgroundColor = this.currHero.styleSet.backgroundColor;
      this.styleObject.color = this.currHero.styleSet.color;
      eventBusService.$emit('headerChange',this.currHero.id);
    }, 7000);
  },
  destroyed() {
    // clearing header to default styling params and clear hero image interval
    eventBusService.$emit('headerChange','');
    clearInterval(this.heroInterval);
  },
};
</script>