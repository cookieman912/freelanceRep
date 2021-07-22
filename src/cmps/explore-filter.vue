<template>
  <section>
    <div class="explore-filter">
      <div class="explore-choose" @click="openModal(1)">
        Category<span class="el-icon-arrow-down"></span>
        <div
          class="choose-modal category-modal"
          :class="{ active: categoryModal }"
        >
          <ul>
            <li @click="catValFilter('graphic design')">Graphic Design</li>
            <li @click="catValFilter('web development')">Web Development</li>
            <li @click="catValFilter('voice acting')">Voice Acting</li>
            <li @click="catValFilter('podcast expertise')">
              Podcast Expertise
            </li>
            <li @click="catValFilter('translation')">Translation</li>
          </ul>
        </div>
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
        <div class="choose-modal rate-modal" :class="{ active: rateModal }">
          <ul>
            <li @click="rateValFilter(4)">
              Above 4<span class="el-icon-star-on"></span>
            </li>
            <li @click="rateValFilter(3)">
              Above 3<span class="el-icon-star-on"></span>
            </li>
            <li @click="rateValFilter(2)">
              Above 2<span class="el-icon-star-on"></span>
            </li>
            <li @click="rateValFilter(1)">
              Above 1<span class="el-icon-star-on"></span>
            </li>
            <li @click="rateValFilter">Any</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      filterBy: {
        txt: "",
        tags: "",
        price: {
          min: null,
          max: null,
        },
        rate: null,
      },
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
    filter() {
      this.$emit("filter", JSON.parse(JSON.stringify(this.filterBy)));
    },
    catValFilter(val) {
      console.log("val", val);
      this.filterBy.category = val;
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
    getFilter() {
      console.log(this.$store.getters.filterToShow);
      return this.$store.getters.filterToShow;
    },
  },
  created() {
    this.filterBy = this.getFilter;
  },
};
</script>

<style>
</style>