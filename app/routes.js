"use strict";

const express = require("express");
const products = require("../app/controllers/productController");
module.exports = (app) => {
  const router = express.Router();
  router.route("/products/create").post(products.createProduct);
  router.route("/products/getProductDetail").get(products.getProductDetail);
  router.route("/products/list").get(products.listMostViewProduct);
  router.route("/products/deleteProduct").delete(products.deleteProduct);
  return router;
};
