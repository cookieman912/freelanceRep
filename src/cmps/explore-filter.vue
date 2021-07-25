<template>
    <section class="explore-filter">
        <div>
            <el-select
                v-model="filterByCopy.tags"
                clearable
                placeholder="Select"
                @click="closeModal"
                @change="filter"
            >
                <el-option
                    class="explore-choose"
                    v-for="item in tagsOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
            </el-select>

            <div class="explore-choose" @click.self="toggleModal">
                Price<span class="el-icon-arrow-down"></span>
                <div
                    class="choose-modal price-modal"
                    :class="{ active: priceModal }"
                >
                    <div>
                        <div>
                            <label for="min">Min.</label>
                            <input
                                id="min"
                                placeholder="Minimum Price"
                                v-model="filterByCopy.price.min"
                                type="text"
                            />
                        </div>
                        <div>
                            <label for="max">Max.</label>
                            <input
                                id="max"
                                placeholder="Maximum Price"
                                v-model="filterByCopy.price.max"
                                type="text"
                            />
                        </div>
                        <!-- v-model="filterBy.price.max"v-model="filterBy.price.min" -->
                    </div>
                    <div>
                        <button>Clear All</button>
                        <button @click="filter">Apply</button>
                    </div>
                </div>
            </div>

            <el-select
                v-model="filterByCopy.rate"
                clearable
                placeholder="Select"
                @click="closeModal"
                @change="filter"
            >
                <el-option
                    class="explore-choose"
                    v-for="item in rateOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
            </el-select>
            <!-- <div class="explore-choose" @click="openModal(3)">
        Rate<span class="el-icon-arrow-down"></span>
        <div class="choose-modal rate-modal" :class="{ active: rateModal }">
          
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
      </div> -->
        </div>
        <!-- <div>
      <el-select v-model="filterByCopy.sortBy"
        placeholder="Select"
        @click="closeModal"
        @change="filter">
        <el-option class="explore-choose"
          v-for="item in sortBy"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div> -->
    </section>
</template>

<script>
export default {
    data() {
        return {
            tagsOptions: [
                {
                    value: "Graphic design",
                    label: "Graphic design",
                },
                {
                    value: "Web development",
                    label: "Web development",
                },
                {
                    value: "Voice acting",
                    label: "Voice acting",
                },
                {
                    value: "Podcast expertise",
                    label: "Podcast expertise",
                },
                {
                    value: "Logo",
                    label: "Logo",
                },
                {
                    value: "Business Plan",
                    label: "Business Plan",
                },
                {
                    value: "Cooking",
                    label: "Cooking",
                },
                {
                    value: "",
                    label: "Category",
                },
            ],
            rateOptions: [
                {
                    value: 1,
                    label: "Above 4",
                },
                {
                    value: 2,
                    label: "Above 3",
                },
                {
                    value: 3,
                    label: "Above 2",
                },
                {
                    value: 4,
                    label: "Above 1",
                },
                {
                    value: "",
                    label: "Any",
                },
            ],
            sortBy: [
                {
                    value: "HIGH",
                    label: "High to Low",
                },
                {
                    value: "LOW",
                    label: "Low to High",
                },
                {
                    value: "",
                    label: "Sort By",
                },
            ],
            priceModal: false,
        };
    },
    methods: {
        toggleModal() {
            this.priceModal = !this.priceModal;
        },
        closeModal() {
            console.log("closemodal");
            this.priceModal = false;
        },
        // getFilterTxt() {
        //   console.log(this.$store.getters.filterToShow);
        //   return this.$store.getters.filterTxtToShow
        //     ? this.$store.getters.filterTxtToShow
        //     : "";
        // },
        filter() {
            this.$emit("filter", JSON.parse(JSON.stringify(this.filterByCopy)));
            this.priceModal = false;
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
        filterByCopy() {
            return JSON.parse(JSON.stringify(this.$store.getters.filterToShow));
        },
        // getFilter() {
        //   console.log(this.$store.getters.filterToShow);
        //   return this.$store.getters.filterToShow;
        // },
    },
    created() {
        this.filterBy = this.getFilter;
    },
};
</script>

<style>
</style>