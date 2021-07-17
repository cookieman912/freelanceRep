<template>
  <section>
    <article v-for="review in reviews" :key="review.id">
      {{ review }}
    </article>
  </section>
</template>

<script>
export default {
  props: ["reviews"],
};
</script>