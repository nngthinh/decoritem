export const state = () => ({
  cart: [],
})

export const getters = {
  getCart: (state) => {
    return state.cart
  },
}

export const actions = {}

export const mutations = {
  addToCart(state, newItem) {
    let item = state.cart.find((item) => item.id == newItem.id)
    if (item === undefined) {
      state.cart.push(newItem)
    } else {
      item.quantity += newItem.quantity
    }
  },
  removeFromCart(state, id) {
    state.cart = state.cart.filter((item) => item.id !== id)
  },
  changeQuantity(state, payload) {
    for (let item of state.cart) {
      if (item.id === payload.id) {
        item.quantity = payload.quantity
      }
    }
  },
  clearCart(state, id) {
    state.cart = []
  },
}
