export const state = () => ({
  products: [
    {
      id: "1",
      name: 'Ghế ngồi',
      price: 70000,
      productImage:
        'https://th.bing.com/th/id/R.064aa39af5b1076226fee53e1643258f?rik=Jv3AyiTju7vJZg&pid=ImgRaw&r=0',
      quantity: 20,
      category: '618a74bde8d58a4355df0bfa',
      finalPrice: 20,
    },
    {
      id: "2",
      name: 'Đèn bàn',
      price: 50000,
      productImage:
        'https://www.thietbidiendgp.vn/media/products/800/td10021_01.jpg',
      quantity: 20,
      category: '618a74bde8d58a4355df0bfa',
      finalPrice: 20,
    },
    {
      id: "3",
      name: 'Đèn ngủ',
      price: 70000,
      productImage:
        'https://www.thietbidiendgp.vn/media/products/800/b-025n.jpg',
      quantity: 20,
      category: '618a74bde8d58a4355df0bfa',
      finalPrice: 20,
    },
    {
      id: "4",
      name: 'Bàn làm việc',
      price: 200000,
      productImage:
        'https://salt.tikicdn.com/ts/tmp/c9/ab/25/b8d20e434bcdbb1e3dd4ce1d9c22b713.jpg',
      quantity: 20,
      category: '618a74bde8d58a4355df0bfa',
      finalPrice: 20,
    },
    // {
    //   id: "5",
    //   name: 'Đồng hồ treo tường',
    //   price: 200000,
    //   productImage:
    //     'https://donghothanhtung.com/wp-content/uploads/2019/08/Dong-ho-treo-tuong-Weilingdun-G30299.jpg',
    //   quantity: 20,
    //   category: '618a74bde8d58a4355df0bfa',
    //   finalPrice: 20,
    // },
    {
      id: "6",
      name: 'Kệ sách 3 tầng',
      price: 300000,
      productImage:
        'https://cdn.fitin.vn/cms-ecom/thumbs/1200x1200/product-tmp/2020/06/16/ke-sach-3-tang-hb363n-2-1592289857.jpg',
      quantity: 20,
      category: '618a74bde8d58a4355df0bfa',
      finalPrice: 20,
    },
    // {
    //   id: "7",
    //   name: 'Chair 7',
    //   price: 20000,
    //   productImage:
    //     'https://th.bing.com/th/id/R.064aa39af5b1076226fee53e1643258f?rik=Jv3AyiTju7vJZg&pid=ImgRaw&r=0',
    //   quantity: 20,
    //   category: '618a74bde8d58a4355df0bfa',
    //   finalPrice: 20,
    // },
    // {
    //   id: "8",
    //   name: 'Chair 8',
    //   price: 20000,
    //   productImage:
    //     'https://th.bing.com/th/id/R.064aa39af5b1076226fee53e1643258f?rik=Jv3AyiTju7vJZg&pid=ImgRaw&r=0',
    //   quantity: 20,
    //   category: '618a74bde8d58a4355df0bfa',
    //   finalPrice: 20,
    // },
  ],
})

export const getters = {
  allProducts: (state) => {
    return state.products
  },
  getProduct: (state) => id => {
    return state.products.find(product => product.id == id)
  }
}

export const actions = {}

export const mutations = {}
