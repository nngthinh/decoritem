<template>
  <div>
    <b-container>
      <b-row>
        <b-col cols="8">
          <shipping-info
            @update:fee="shippingFee = $event"
            :cartCost="cartCost"
            ref="shippingForm"
          />

          <div class="mt-5">
            <product-list :cartProduct="cartProduct" />
          </div>
        </b-col>
        <b-col cols="4">
          <payment
            :cartCost="cartCost"
            :cartLength="cart.length"
            :shippingFee="shippingFee"
            ref="payment"
          />
          <b-button
            variant="primary"
            squared
            class="mx-auto"
            block
            @click="onSubmit"
            size="lg"
            >Thanh toán</b-button
          >
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import ShippingInfo from '@/components/checkout/ShippingInfo.vue'
import ProductList from '@/components/checkout/ProductList.vue'
import Payment from '@/components/checkout/Payment.vue'
export default {
  components: {
    ShippingInfo,
    ProductList,
    Payment,
  },
  data() {
    return {
      shippingFee: 0,
    }
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
    cartCost() {
      let sum = 0
      for (let item of this.cartProduct) {
        sum += item.quantity * item.product.price
      }
      return sum
    },
  },
  methods: {
    getProduct(id) {
      return this.$store.getters['products/getProduct'](id)
    },
    async onSubmit() {
      if (this.$refs.shippingForm.isValid()) {
        console.log(this.$refs.payment.method)
        var orderId = require('crypto').randomBytes(16).toString('hex')
        var baseUrl = 'http://f7fe-27-77-189-23.ngrok.io/'
        var orderPath = `order/shipping`
        var order = this.makeShippingOrder(this.$refs.payment.method, orderId)
        if (await this.checkValidShipping(order)) {
          this.saveOrder(order)
          this.$store.commit('cart/clearCart')
          if (this.$refs.payment.method == 'MOMO') {
            let res = await this.$axios.$post('/momo', {
              amount: this.$refs.payment.total,
              orderId,
              redirectUrl: baseUrl + orderPath,
            })
            console.log(res.payUrl)
            window.location.href = res.payUrl
          } else {
            this.$router.push({
              path: orderPath,
              query: {
                resultCode: 1,
                payType: 'cod',
                orderId,
              }
            })
          }
        }
      }
    },
    async checkValidShipping(order) {
      if (this.$refs.shippingForm.isValid()) {
        let res = await this.previewOrder(order)
        if (res.code != 200) {
          if (res.code_message == 'PHONE_INVALID') {
            this.$refs.shippingForm.reportInvalidPhone()
          } else {
            console.log(res)
            return this.checkValidShipping(order)
          }
        }
        return true
      }
      return false
    },
    makeShippingOrder(paymentMethod, client_order_code) {
      var cod_amount = 0
      var payment_type_id = 1
      if (paymentMethod === 'COD') {
        cod_amount = this.$refs.payment.total
        payment_type_id = 2
      }
      var items = this.cartProduct.map((item) => ({
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      }))
      return {
        to_name: this.$refs.shippingForm.form.name,
        to_phone: this.$refs.shippingForm.form.phone,
        to_ward_code: this.$refs.shippingForm.form.wardCode,
        to_district_id: this.$refs.shippingForm.form.districtID,
        to_address: this.$refs.shippingForm.fullAddress,
        cod_amount,
        weight: 2000,
        length: 10,
        width: 10,
        height: 10,
        service_type_id: this.$refs.shippingForm.form.serviceTypeID,
        payment_type_id,
        items,
        insurance_value: this.cartCost,
        client_order_code,
      }
    },
    saveOrder(order) {
      this.$store.commit('orders/addNewOrder', order)
    },
    async createShippingOrder(order) {
      return await this.$axios.$post('/shipping/create-order', order)
    },
    async previewOrder(order) {
      return await this.$axios.$post('/shipping/preview-order', order)
    },
  },
}
</script>