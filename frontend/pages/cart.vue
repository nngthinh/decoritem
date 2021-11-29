<template>
  <div>
    <b-container>
      <b-row v-if="cart.length > 0">
        <b-col cols="8" sm="8">
          <cart-item-list :cartProduct="cartProduct"/>
        </b-col>
        <b-col cols="4" sm>
          <cart-summary :cart="cartProduct" />
        </b-col>
      </b-row>
      <div style="text-align: center" v-else >Empty Cart</div>
    </b-container>
  </div>
</template>
<script>
import CartItemList from '@/components/cart/CartItemList.vue'
import CartSummary from '@/components/cart/CartSummary.vue'
export default {
  components: {
    CartItemList,
    CartSummary,
  },
  computed: {
    cart() {
      return this.$store.getters['cart/getCart']
    },
    cartProduct() {
      return this.cart.map((item) => ({
        product: this.getProduct(item.id),
        quantity: item.quantity,
      }))
    },
  },
  methods: {
    getProduct(id) {
      return this.$store.getters['products/getProduct'](id)
    },
  },
}
</script>