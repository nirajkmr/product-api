const productModel = require("../models/product");
const { isEmpty } = require("lodash");
const {
  validateCharacter,
  validateNumber,
  currencyConverter,
} = require("../utils");

const createProduct = async (req, res) => {
  try {
    const postProduct = req.body;
    let { name, price, description } = postProduct;
    if (isEmpty(name) || !isEmpty(price)) {
      return res.status(400).json({ message: "Missing data points" });
    }
    if (!validateCharacter(name)) {
      return res.status(400).json({ message: "Please enter valid name" });
    }
    if (!validateNumber(price)) {
      return res.status(400).json({ message: "Please enter valid price" });
    }
    await productModel
      .createProduct(name, price, description)
      .then(function (next) {
        if (next > 0) {
          return res.json({
            message: "product detail inserted successfully",
            productId: next,
          });
        } else {
          return res.json({ message: "No record inserted" });
        }
      });
  } catch (error) {
    return res.status(500).json({ message: error.stack });
  }
};

const getProductDetail = async (req, res) => {
  try {
    const productId = req.query.productId;
    const preferredCurrency = req.query.currency;
    if (isEmpty(productId)) {
      return res.status(400).json({ message: "please provide the productId" });
    }
    await productModel
      .fetchProductDetailById(productId)
      .then(function (data, err) {
        if (err) {
          console.log(err);
          return;
        } else {
          productName = data.name;
          productPrice = data.price;
          productDescription = data.description;
        }
      });
    if (!isEmpty(preferredCurrency) && preferredCurrency !== "USD") {
      productPrice = await currencyConverter(productPrice, preferredCurrency);
    }
    const productDetail = {
      productName: productName,
      productPrice: productPrice,
      productDescription: productDescription,
    };
    return res.json({ message: "success", productDetail: productDetail });
  } catch (error) {
    return res.status(500).json({ message: error.stack });
  }
};

const listMostViewProduct = async (req, res) => {
  try {
    const mostviewedList = [];
    const limit = req.query.limit;
    const preferredCurrency = req.query.currency;
    await productModel.fetchMostViewProduct(limit).then(function (data, err) {
      if (err) {
        console.log(err);
        return;
      } else {
        let reformatResponse = JSON.parse(JSON.stringify(data));
        reformatResponse.forEach(async (item) => {
          let productPrice = 0;
          if (!isEmpty(preferredCurrency) && preferredCurrency !== "USD") {
            productPrice = currencyConverter(item.price, preferredCurrency);
          }
          let finalprice = productPrice ? productPrice : item.price;
          let updateData = {
            productName: item.name,
            productPrice: finalprice,
            productDescription: item.description,
            viewCount: item.view_count,
          };
          mostviewedList.push(updateData);
        });
      }
    });
    return res.json({ message: "success", productDetail: mostviewedList });
  } catch (error) {
    return res.status(500).json({ message: error.stack });
  }
};

const deleteProduct = (req, res) => {
  try {
    const productId = req.query.productId;
    productModel.deleteProduct(productId).then(function (data, err) {
      if (err) {
        console.log("error" + err);
        return;
      }
      if (data.changedRows && data.affectedRows) {
        return res.json({
          message: "record deleted successfully",
          productId: productId,
        });
      } else {
        if (data.affectedRows) {
          return res.json({
            message: "record already deleted",
            productId: productId,
          });
        } else {
          return res.json({
            message: "No record deleted",
            productId: productId,
          });
        }
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.stack });
  }
};
module.exports = {
  createProduct,
  getProductDetail,
  listMostViewProduct,
  deleteProduct,
};
