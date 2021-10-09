const mysql = require("./db.js");
var Promise = require("bluebird");
const { isEmpty } = require("lodash");

const createProduct = async (name, price, description) => {
  return new Promise(function (resolve, reject) {
    let sqlQuery =
      "INSERT INTO product (name,price,description) VALUES (?,?,?)";
    mysql.query(sqlQuery, [name, price, description], (err, result) => {
      if (err) {
        console.log("error: ", err);
        reject(err);
        return;
      }
      resolve(result.insertId);
    });
  });
};

const fetchProductDetailById = async (productId) => {
  return new Promise(function (resolve, reject) {
    let sqlQuery = `SELECT name,price,description FROM product WHERE id=${productId} AND soft_delete=0`;
    mysql.query(sqlQuery, (err, result) => {
      if (err) {
        console.log("error: ", err);
        reject(err);
        return;
      } else {
        updateViewCount(productId);
        resolve(result[0]);
      }
    });
  });
};

const updateViewCount = async (productId) => {
  return new Promise(function (resolve, reject) {
    let sqlQuery = `UPDATE product SET view_count=view_count+1 WHERE id=${productId}`;
    mysql.query(sqlQuery, (err, result) => {
      if (err) {
        console.log("error: ", err);
        reject(err);
        return;
      }
      resolve(result[0]);
    });
  });
};

const fetchMostViewProduct = async (limit) => {
  return new Promise(function (resolve, reject) {
    if (isEmpty(limit)) {
      limit = 5;
    }
    let sqlQuery = `SELECT name,price,description,view_count FROM product WHERE view_count > 0 AND soft_delete=0 order by view_count desc limit ${limit}`;
    mysql.query(sqlQuery, (err, result) => {
      if (err) {
        console.log("error: ", err);
        reject(err);
        return;
      } else {
        resolve(result);
      }
    });
  });
};

const deleteProduct = async (productId) => {
  return new Promise(function (resolve, reject) {
    let sqlQuery = `UPDATE product SET soft_delete=1 WHERE id = ?`;
    mysql.query(sqlQuery, productId, (err, result) => {
      if (err) {
        console.log("error: ", err);
        reject(err);
        return;
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  createProduct,
  fetchProductDetailById,
  updateViewCount,
  fetchMostViewProduct,
  deleteProduct,
};
