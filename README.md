# product-api

**Problem Statement:**
***************************

We would like you to create a REST API for managing products. The API should allow the following actions:

* Create a new product
* Get a single product
* List the most viewed products
* Delete a product

When creating a new product, the name and price of the product need to be provided. Optionally, a description can also be provided. The 
price is assumed to be in USD. The product should be saved to a SQL database.

When a single product is requested, all fields of that product are returned and the view-count for that product is incremented. The request can 
optionally specify a currency, in which case the price should be converted to the requested currency before being returned. We need to support 
the following currencies:
* USD
* CAD
* EUR
* GBP

The latest exchange rates can be retrieved from the public API https://currencylayer.com/ (or any similar API).
When a list of the most viewed products is requested, the API should return the products with the highest view-counts. By default, the top 5 
products will be returned, but the request can also specify a custom number of products to return. Only products with at least 1 view should be 
included. A specific currency can also be specified in which case all the prices should be returned in that currency.

When a product is deleted, it should no longer be included in any of the API responses but should remain in the database for audit purposes.

**Tech Stack:**
* NodeJs (Express JS)
* MySQL

