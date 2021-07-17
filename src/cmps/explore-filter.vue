<template>
  <section class="explore-filter">
    <el-select v-model="category" placeholder="Category">
      <el-option
        class="explore-choose"
        v-for="item in catOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-select v-model="price" placeholder="Price">
      <el-option
        class="explore-choose"
        v-for="item in priceOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-select v-model="rate" placeholder="Rate">
      <el-option
        class="explore-choose"
        v-for="item in rateOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </section>
</template>

<script>
export default {
  data() {
    return {
      catOptions: [
        {
          value: "Category1",
          label: "Category1",
        },
        {
          value: "Category2",
          label: "Category2",
        },
        {
          value: "Category3",
          label: "Category3",
        },
        {
          value: "Category4",
          label: "Category4",
        },
        {
          value: "Category5",
          label: "Category5",
        },
      ],
      category: "",
      priceOptions: [
        {
          value: "price1",
          label: "price1",
        },
        {
          value: "price2",
          label: "price2",
        },
        {
          value: "price3",
          label: "price3",
        },
        {
          value: "price4",
          label: "price4",
        },
        {
          value: "price5",
          label: "price5",
        },
      ],
      price: "",
      rateOptions: [
        {
          value: "above1",
          label: "above1",
        },
        {
          value: "above2",
          label: "above2",
        },
        {
          value: "above3",
          label: "above3",
        },
        {
          value: "above4",
          label: "above4",
        },
        {
          value: "above5",
          label: "above5",
        },
      ],
      rate: "",
    };
  },
};
</script>

<style>
</style>