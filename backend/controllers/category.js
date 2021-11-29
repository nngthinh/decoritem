const mongoose = require("mongoose");
const Category = require("../models/categorymodel");

exports.category_get_all = (req, res, next) => {
    Category.find()
      //.select("name price quantity _id productImage")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          category: docs.map(doc => {
            return {
              doc,
              request: {
                type: "GET",
                url: "http://localhost:3000/category/" + doc._id
              }
            };
          })
        };
        
        res.status(200).json(response);
      
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };
  
  exports.category_create = (req, res, next) => {
    const product = new Category({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
    });
    product
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Created category successfully",
          createdProduct: {
            result,
            request: {
              type: "GET",
              url: "http://localhost:3000/category/" + result._id
            }
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };