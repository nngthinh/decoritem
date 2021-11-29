<template>
  <div>
    <h2>Danh sách giỏ hàng</h2>
    <b-table-simple small responsive>
      <colgroup><col><col></colgroup>
      <b-thead>
        <b-tr>
          <b-th colspan="2" class="cart-label">Sản phẩm</b-th>
          <b-th class="cart-label">Đơn giá</b-th>
          <b-th class="cart-label">Số lượng</b-th>
          <b-th class="cart-label">Thành tiền</b-th>
          <b-th class="cart-label"></b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="item in cartProduct" :key="item.id">
          <b-td colspan="2"
            ><img
              :src="item.product.productImage"
              width="100px"
              height="100px"
            /><span class="ml-4">{{ item.product.name }}</span></b-td
          >
          <b-td class="cart-label">{{ item.product.price }}</b-td>
          <b-td class="cart-label">
            <b-form-spinbutton
              id="quantity"
              v-model="item.quantity"
              min="1"
              inline
              @change="changeQuantity(item.product.id, item.quantity)"
            ></b-form-spinbutton>
          </b-td>
          <b-td class="cart-label">{{
            item.product.price * item.quantity
          }}</b-td>
          <b-td class="cart-label"
            ><i
              class="fa fa-trash"
              style="cursor: pointer; color: red"
              @click="removeFromCart(item.product.id)"
            ></i
          ></b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </div>
</template>
<script>
export default {
  props: {
    cartProduct: {
      type: Array,
      default: null,
    },
  },
  methods: {
    changeQuantity(id, quantity) {
      this.$store.commit('cart/changeQuantity', { id, quantity })
    },
    removeFromCart(id) {
      this.$store.commit('cart/removeFromCart', id)
    },
  },
}
</script>
<style scoped>
.cart-label {
  text-align: center;
  margin-top: auto;
  margin-bottom: auto;
  vertical-align: middle;
}
.cart-row {
  min-width: 15rem;
}
</style>