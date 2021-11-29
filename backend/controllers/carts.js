const mongoose = require("mongoose");

const Cart = require("../models/cartmodel");
const Order = require("../models/ordermodel");
const Product = require("../models/productmodel");

// exports.orders_get_all = (req, res, next) => {
//   Order.find()
//     .select("product quantity _id")
//     .populate("product", "name")
//     .exec()
//     .then(docs => {
//       res.status(200).json({
//         count: docs.length,
//         orders: docs.map(doc => {
//           return {
//             _id: doc._id,
//             product: doc.product,
//             quantity: doc.quantity,
//             request: {
//               type: "GET",
//               url: "http://localhost:3000/orders/" + doc._id
//             }
//           };
//         })
//       });
//     })
//     .catch(err => {
//       res.status(500).json({
//         error: err
//       });
//     });
// };

exports.create_cart = async (req, res, next) => {
    const isCurrentCart = await Cart.exists(
        {"user": mongoose.Types.ObjectId(req.user.userId), "status": "Current"}
        )
    if (isCurrentCart) {
        return res.status(400).json({
            message: "Cart is existed"
        });
    }
    let data = {
        _id: mongoose.Types.ObjectId(),
        user: mongoose.Types.ObjectId(req.user.userId),
        status: "Current"
    }
    const cart = new Cart(data)
    await cart.save()
    return res.status(201).json({
        message: "Cart stored",
        createdCart: {
          _id: data._id,
          user: data.user,
          status: data.status
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/carts/" + data._id
        }
      });
};

exports.cartAddProduct = async (req, res, next) => {
    const userId = req.user.userId
    const { productId, quantity } = req.body
    console.log(req.body);
    const isCurrentCart = await Cart.exists(
        {"user": mongoose.Types.ObjectId(req.user.userId), "status": "Current"}
        )
    if (!isCurrentCart) {
        return res.status(400).json({
            message: "Cart is not found"
        });
    }
    
    let product = await Product.findOne({_id: mongoose.Types.ObjectId(productId)})
    const productPrice = product.finalPrice
    const price = parseInt(productPrice) * parseInt(quantity)
    console.log("price",price);
    
    const updated = await Cart.updateOne(
        {  user: mongoose.Types.ObjectId(userId),
           status: "Current"
        },
        {$push: { product: { product:productId, quantity: quantity } } } ,
        {$inc: { totalItems: parseInt(quantity), totalCost: parseInt(price) } } 
    )
    console.log("updated",updated);

    const cart = await Cart.findOne(
        {  user: mongoose.Types.ObjectId(userId),
           status: "Current"
        })
    console.log("cart",cart);
    //comment

    return res.status(201).json({
        message: "Cart updated",
        createdCart: cart,
        request: {
          type: "GET",
          url: "http://localhost:3000/carts/" + cart._id
        }
      });
};

exports.cartRemoveProduct = async (req, res, next) => {
    const userId = req.user.userId
    const { productId, quantity } = req.body
    const isCurrentCart = await Cart.exists(
        {"user": mongoose.Types.ObjectId(req.user.userId), "status": "Current"}
        )
    if (!isCurrentCart) {
        return res.status(400).json({
            message: "Cart is not found"
        });
    }
    
    let product = await Product.findOne({_id: mongoose.Types.ObjectId(productId)})
    const productPrice = product.finalPrice
    const price = parseInt(productPrice) * parseInt(quantity)
    
    const updated = await Cart.updateOne(
        {  user: mongoose.Types.ObjectId(userId),
           status: "Current"
        },
        {$pull: { product: { product:productId, quantity: quantity } } } ,
        {$inc: { totalItems: -parseInt(quantity), totalCost: -parseInt(price) } } 
    )
    console.log("updated",updated);

    const cart = await Cart.findOne(
        {  user: mongoose.Types.ObjectId(userId),
           status: "Current"
        })
    console.log("cart",cart);

    return res.status(201).json({
        message: "Cart updated",
        createdCart: cart,
        request: {
          type: "GET",
          url: "http://localhost:3000/carts/" + cart._id
        }
      });
};

exports.getCart = (req, res, next) => {
  Cart.findOne(
    {  user: mongoose.Types.ObjectId(req.user.userId),
       status: "Current"
    })
    //.populate("product")
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: "Cart not found"
        });
      }
      res.status(200).json({
        order: order,
        request: {
          type: "GET",
          url: "http://localhost:3000/carts"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

// exports.orders_delete_order = (req, res, next) => {
//   Order.remove({ _id: req.params.orderId })
//     .exec()
//     .then(result => {
//       res.status(200).json({
//         message: "Order deleted",
//         request: {
//           type: "POST",
//           url: "http://localhost:3000/orders",
//           body: { productId: "ID", quantity: "Number" }
//         }
//       });
//     })
//     .catch(err => {
//       res.status(500).json({
//         error: err
//       });
//     });
// };
