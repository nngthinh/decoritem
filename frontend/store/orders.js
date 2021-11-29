export const state = () => ({
  orders: [],
})

export const getters = {
  getAllOrders: (state) => {
    return state.orders
  },
  getOrder: (state) => order_id => {
    return state.orders.find(order => order.client_order_code === order_id)
  },
}

export const actions = {}

export const mutations = {
  addNewOrder(state, newOrder) {
    state.orders.push(newOrder)
  },
  changeOrderInfo(state, newOrder) {
    for (let i = 0; i < state.orders.length; i++) {
      if (state.orders[i].order_id === newOrder.order_id) {
        state.orders[i] = newOrder
        break
      }
    }
  },
}
