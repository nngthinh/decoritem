<template>
  <div>
    <h5 style="font-weight: bold">Chọn phương thức thanh toán:</h5>
    <div
      :class="[method == 'COD' ? 'bordered' : 'borderless']"
      style="cursor: pointer"
      @click="changePaymentMethod('COD')"
    >
      <b-img src="@/static/cash-icon.png" width="50px" />
      Thanh toán khi nhận hàng
    </div>
    <div
      :class="[method == 'MOMO' ? 'bordered' : 'borderless']"
      style="cursor: pointer"
      @click="changePaymentMethod('MOMO')"
    >
      <b-img src="@/static/momo-logo.png" width="50px" />
      Ví Momo
    </div>
    <h5 style="font-weight: bold">Thông tin đơn hàng</h5>
    <div>
      <span class="small-label"> Tạm tính ({{ cartLength }} sản phẩm): </span>
      <span class="" style="float: right" >{{ cartCost }} VNĐ</span>
    </div>
    <p>
      <span class="small-label"> Phí giao hàng </span>
      <span class="" style="float: right">{{ shippingFee }} VNĐ</span>
    </p>
    <p>
      Tổng cộng
      <span class="price" style="float: right">{{ total }} VNĐ</span>
    </p>
  </div>
</template>
<script>
export default {
  props: {
    cartCost: {
      type: Number,
      default: null,
    },
    cartLength: {
      type: Number,
      default: null,
    },
    shippingFee: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      method: 'COD',
    }
  },
  computed: {
    total() {
      return this.cartCost + this.shippingFee
    },
  },
  methods: {
    onSubmit() {},
    changePaymentMethod(method) {
      this.method = method
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