<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col sm="4">
        <img :src="product.productImage" :alt="product.name" width="100%" />
      </b-col>
      <b-col sm="8">
        <h2>{{ product.name }}</h2>
        <p>
          Category: <b-link href="#">{{ product.category }}</b-link>
        </p>
        <b-container class="price-container">
          <h1 id="price">{{ product.price }} VND</h1>
        </b-container>
        <b-form @submit.prevent="addToCart">
          <b-container class="my-2">
            <label for="quantity"
              >Số lượng ({{ product.quantity }} sản phẩm có sẵn):
            </label>
            <b-form-spinbutton
              id="quantity"
              v-model="quantity"
              min="1"
              :max="product.quantity"
              inline
            ></b-form-spinbutton>
          </b-container>
          <b-button type="submit" variant="danger" class="submit-btn" squared>
            <i class="fa fa-shopping-cart"></i>
            Thêm vào giỏ hàng
          </b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      quantity: 1,
    }
  },
  computed: {
    product() {
      return this.$store.getters['products/getProduct'](this.$route.params.id)
    },
  },
  methods: {
    addToCart() {
      this.$store.commit('cart/addToCart', {
        id: this.$route.params.id,
        quantity: this.quantity,
      })
    },
  },
}
</script>
<style scoped>
#price {
  font-weight: bolder;
  color: red;
}
.submit-btn {
  display: block;
  margin: auto;
}
.price-container {
  background-color: #f2f2f2;
}
</style>