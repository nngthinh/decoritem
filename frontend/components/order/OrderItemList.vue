<template>
  <div>
    <b-table-simple fixed small responsive>
      <colgroup>
        <col />
        <col />
      </colgroup>
      <b-thead>
        <b-tr>
          <b-th colspan="1" class="cart-label">Sản phẩm</b-th>
          <b-th class="cart-label">Đơn giá</b-th>
          <b-th class="cart-label">Số lượng</b-th>
          <b-th class="cart-label">Thành tiền</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="item in itemList" :key="item.name">
          <b-td colspan="1"
            ><span class="ml-4">{{ item.name }}</span></b-td
          >
          <b-td class="cart-label">{{ item.price }}</b-td>
          <b-td class="cart-label">
            {{ item.quantity }}
          </b-td>
          <b-td class="cart-label">{{
            item.price * item.quantity
          }}</b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </div>
</template>
<script>
export default {
  props: {
    itemList: {
      type: Array,
      default: null,
    },
  },
  methods: {
  }
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