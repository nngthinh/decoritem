<template>
  <!-- <div class="w3-col l3 s6"> -->
  <div
    class="w3-container border"
    style="cursor: pointer"
    @click="onClick"
  >
    <img :src="product.productImage" style="max-height: 18rem" />
    <p>
      {{ product.name }}<br /><b>{{ product.price }} VND</b>
    </p>
  </div>
</template>
<script>
export default {
  props: {
    product: {
      type: Object,
      default: null,
    },
  },
  methods: {
    onClick() {
      this.$router.push('/products/' + this.product.id)
    }
  }
}
</script>