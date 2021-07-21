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
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
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
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
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
      category: "",
      price: null,
      rate: null,
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
  },
};
</script>

<style>
</style>