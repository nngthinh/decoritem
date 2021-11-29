<template></template>
<script>
export default {
  data() {
    return {}
  },
  computed: {},
  async created() {
    const param = this.$route.query
    const redirectUrl = `/order/${param.orderId}`
    var order = this.getOrder(param.orderId)
    if (param.resultCode == 0) {
      let res = await this.createShippingOrder(order)
      order.status = "Đã thanh toán"
      order.shippingFee = res.total_fee
      order.expectedDeliveryTime = res.expected_delivery_time
      order.shippingCode = res.order_code
      this.changeOrderInfo(order)
    } else if (param.resultCode == 1 && param.payType == 'cod'){
      let res = await this.createShippingOrder(order)
      order.status = "Chưa thanh toán"
      order.shippingFee = res.total_fee
      order.expectedDeliveryTime = res.expected_delivery_time
      order.shippingCode = res.order_code
      this.changeOrderInfo(order)
    } else {
      order.status = "CANCELED"
      order.shippingFee = 0
      order.expectedDeliveryTime = null
      order.shippingCode = 0
      this.changeOrderInfo(order)
    }
    this.$router.push(redirectUrl)
  },
  methods: {
    getOrder(orderId) {
      return this.$store.getters['orders/getOrder'](orderId)
    },
    async createShippingOrder(order) {
      return await this.$axios.$post('/shipping/create-order', order)
    },
    changeOrderInfo(order) {
      this.$store.commit('orders/changeOrderInfo', order)
    }
  },
}
</script>