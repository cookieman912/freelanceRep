<template>
  <section>
    <div class="explore-filter">
      <div class="explore-choose" @click="openModal(1)">
        Category<span class="el-icon-arrow-down"></span>
        <!-- <div
          class="choose-modal category-modal"
          :class="{ active: categoryModal }"
        > -->
        <select v-model="filterByCopy.tags"  @change="filter">
            <option value="Graphic design">
              Graphic Design
            </option>
            <option value="Web development">
              Web Development
            </option>
            <option value="Voice acting">
              Voice Acting
            </option>
            <option value="Podcast expertise">
              Podcast Expertise
            </option>
            <option value="Logo">
              Logo
            </option>
            <option value="Business plan">
              Bussines Plan
            </option>
          </select>
          <!-- <ul>
            <li @click="catValFilter('graphic design')">Graphic Design</li>
            <li @click="catValFilter('web development')">Web Development</li>
            <li @click="catValFilter('voice acting')">Voice Acting</li>
            <li @click="catValFilter('podcast expertise')">
              Podcast Expertise
            </li>
            <li @click="catValFilter('translation')">Translation</li>
          </ul> -->
        <!-- </div> -->
      </div>
      <div class="explore-choose" @click="openModal(2)">
        Price<span class="el-icon-arrow-down"></span>
        <div class="choose-modal price-modal" :class="{ active: priceModal }">
          <div>
            <div>
              <label for="min">Min.</label>
              <input id="min" placeholder="Minimum Price" type="text" />
            </div>
            <div>
              <label for="max">Max.</label>
              <input id="max" placeholder="Maximum Price" type="text" />
            </div>
            <!-- v-model="filterBy.price.max"v-model="filterBy.price.min" -->
          </div>
          <div>
            <button>Clear All</button>
            <button>Apply</button>
          </div>
        </div>
      </div>
      <div class="explore-choose" @click="openModal(3)">
        Rate<span class="el-icon-arrow-down"></span>
        <!-- <div class="choose-modal rate-modal" :class="{ active: rateModal }"> -->
          
          <select v-model="filterByCopy.rate"  @change="filter">
            <option value="4">
              Above 4<span class="el-icon-star-on"></span>
            </option>
            <option value="3">
              Above 3<span class="el-icon-star-on"></span>
            </option>
            <option value="2">
              Above 2<span class="el-icon-star-on"></span>
            </option>
            <option value="1">
              Above 1<span class="el-icon-star-on"></span>
            </option>
            <option value="">Any</option>
          </select>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      categoryModal: false,
      priceModal: false,
      rateModal: false,
    };
  },
  methods: {
    openModal(num) {
      switch (num) {
        case 1:
          this.priceModal = this.rateModal = false;
          this.categoryModal = !this.categoryModal;
          break;
        case 2:
          this.categoryModal = this.rateModal = false;
          this.priceModal = !this.priceModal;
          break;
        case 3:
          this.categoryModal = this.priceModal = false;
          this.rateModal = !this.rateModal;
          break;
      }
    },
    // getFilterTxt() {
    //   console.log(this.$store.getters.filterToShow);
    //   return this.$store.getters.filterTxtToShow
    //     ? this.$store.getters.filterTxtToShow
    //     : "";
    // },
    // filter() {
    //   this.$emit("filter", JSON.parse(JSON.stringify(this.filterBy)));
    // },
    filter() {
      console.log('check', this.filterByCopy);
      this.$emit("filter", JSON.parse(JSON.stringify(this.filterByCopy)));
    },
    catValFilter(val) {
      console.log("val", val);
      this.filterBy.tags = val;
      console.log("this.category", this.filterBy);
    },
    priceValFilter(val) {
      console.log("val", val);
      this.filterBy.category = val;
      console.log("this.category", this.filterBy);
    },
    rateValFilter(val) {
      console.log("val", val);
      this.filterBy.rate = val;
      console.log("this.rate", this.filterBy);
    },
  },
  computed: {
    // getFilter() {
    //   console.log(this.$store.getters.filterToShow);
    //   return this.$store.getters.filterToShow;
    // },
    filterByCopy(){
      return JSON.parse(JSON.stringify(this.$store.getters.filterToShow));
    },
  },
  created() {
    this.filterBy = this.getFilter;
  },
};
</script>

<style>
</style>