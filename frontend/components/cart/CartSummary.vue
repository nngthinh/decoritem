<template>
  <div>
    <h2>Thông tin giỏ hàng</h2>
    <p>
      Tổng cộng ({{ cart.length }} sản phẩm):
      <span class="price ml-3">{{ total }} VNĐ</span>
    </p>
    <b-button variant="dark" squared class="mx-auto" block @click="onCheckout"
      >Checkout</b-button
    >
  </div>
</template>
<script>
export default {
  props: {
    cart: {
      type: Array,
      default: null,
    },
  },
  computed: {
    total() {
      let sum = 0
      for (let item of this.cart) {
        sum += item.quantity * item.product.price
      }
      return sum
    },
  },
  methods: {
    onCheckout() {
      this.$router.push('/checkout')
    },
  },
}
</script>
<style scoped>
.price {
  color: red;
  font-weight: bold;
  font-size: large;
}
</style>