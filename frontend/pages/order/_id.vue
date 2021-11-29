<template>
  <b-container>
    <b-row>
      <b-col cols="8">
        <h2>Thông tin đơn hàng</h2>
        <p>
          {{ order.client_order_code }}

          <span style="float: right"> {{ shippingStatus }} </span>
        </p>
        <order-item-list :itemList="order.items" />
      </b-col>
      <b-col cols="4">
        <order-summary :order="order" />
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import OrderItemList from '~/components/order/OrderItemList.vue'
import OrderSummary from '~/components/order/OrderSummary.vue'
export default {
  components: { OrderItemList, OrderSummary },
  data() {
    return {
      orderDetail: {},
    }
  },
  async fetch() {
    await this.getOrderDetail()
  },
  computed: {
    order() {
      return this.$store.getters['orders/getOrder'](this.$route.params.id)
    },
    shippingStatus() {
      switch (this.orderDetail.status) {
        case 'ready_to_pick':
          return 'Mới tạo đơn hàng'
        case 'picking':
          return 'Nhân viên đang lấy hàng'
        case 'cancel':
          return 'Huỷ đơn hàng'
        case 'money_collect_picking':
          return 'Đang thu tiền người gửi'
        case 'picked':
          return 'Nhân viên đã lấy hàng'
        case 'storing':
          return 'Hàng đang nằm ở kho'
        case 'transporting':
          return 'Đang luân chuyển hàng'
        case 'sorting':
          return 'Đang phân loại hàng hoá'
        case 'delivering':
          return 'Nhân viên đang giao cho người nhận'
        case 'money_collect_delivering':
          return 'Nhân viên đang thu tiền người nhận'
        case 'delivered':
          return 'Nhân viên đã giao hàng thành công'
        case 'delivery_fail':
          return 'Nhân viên giao hàng thất bại'
        case 'waiting_to_return':
          return 'Đang đợi trả hàng về cho người gửi hàng'
        case 'return':
          return 'Trả hàng'
        case 'return_trasporting':
          return 'Đang luân chuyển hàng trả'
        case 'return_sorting':
          return 'Đang phân loại hàng trả'
        case 'returning':
          return 'Nhân viên đang đi trả hàng'
        case 'return_fail':
          return 'Nhân viên trả hàng thất bại'
        case 'returned':
          return 'Nhân viên trả hàng thành công'
        case 'exception':
          return 'Đơn hàng ngoại lệ không nằm trong quy trình'
        case 'damage':
          return 'Hàng bị hư hỏng'
        case 'lost':
          return 'Hàng bị mất'
      }
    },
  },
  methods: {
    async getOrderDetail() {
      if (this.order.status == 'CANCELED') {
        this.orderDetail.status = 'canceled'
      } else {
        let res = await this.$axios.$get('/shipping/order-detail', {
          params: {
            order_code: this.order.shippingCode,
          },
        })
        this.orderDetail = res
      }
    },
  },
}
</script>