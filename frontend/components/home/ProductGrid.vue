<template>
  <!-- <div class="w3-row"> -->
  <!-- <div> -->

  <!-- <div v-for="product in products" :key="product.id" class="grid">
      <product-card :product="product" />
    </div>
    </div> -->
  <!-- </div> -->
  <div>
    <b-table-simple borderless small responsive>
      <b-tbody>
        <b-tr v-for="i in Math.ceil(products.length / 5)" :key="i">
          <b-td v-for="ii in 5" :key="ii" style="min-width: 15rem;">
            <product-card
              v-if="5 * i + ii - 6 < products.length"
              :product="products[5 * i + ii - 6]"
            />
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </div>
</template>

<script>
import ProductCard from '~/components/home/ProductCard.vue'
export default {
  components: {
    ProductCard,
  },
  data() {
    return {}
  },
  computed: {
    products() {
      return this.$store.getters['products/allProducts']
    },
  },
}
</script>
<style scoped>
.grid {
  min-width: 20rem;
}
</style>