<template>
  <div>
    <h5 style="font-weight: bold">Thông tin đơn hàng</h5>
    <div>
      <span class="small-label"> Tạm tính ({{ order.items.length }} sản phẩm): </span>
      <span class="" style="float: right" >{{ order.insurance_value }} VNĐ</span>
    </div>
    <p>
      <span class="small-label"> Phí giao hàng </span>
      <span class="" style="float: right">{{ order.shippingFee }} VNĐ</span>
    </p>
    <p>
      Tổng cộng
      <span class="price" style="float: right">{{ total }} VNĐ</span>
    </p>
    <p>
      {{order.status}}
    </p>
  </div>
</template>
<script>
export default {
  props: {
    order: {
      type: Object,
      default: null,
    },
  },
  computed: {
    total() {
      return this.order.insurance_value + this.order.shippingFee
    }
  }
}
</script>
<style scoped>
.price {
  color: red;
  font-weight: bold;
  font-size: large;
}
.bordered {
  vertical-align: center;
  padding: 5px;
  border: 1px solid darkorange;
  border-radius: 8px;
  margin-bottom: 10px;
}
.borderless {
  vertical-align: center;
  padding: 5px;
  border-radius: 8px;
  margin-bottom: 10px;
}
.small-label {
  font-size: small;
  color: dimgrey;
}
</style>