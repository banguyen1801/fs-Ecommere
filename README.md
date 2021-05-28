## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [APIs](#api)

## General info
This project is the Backend code for fs-ecommere-client repository
	
## Technologies
Project is created with:
* NodeJS
* ReactJS
* MongoDB(mongoosejs)
* Express

## Setup
To run this project, install it locally using npm:

```
$ cd ../fs-Ecommere
$ npm install
$ npm run start
```
## API
### User
* POST /api/register    -register and create new user
* POST /api/login       -login with email and password
* GET /api/users        -get all users from database

### Order
* GET /api/orders/all         -get all order from db
* POST /api/orders            -create an order
* GET /api/orders/advanced    -search for orders 
* GET /api/orders/:id         -get order by id

### Product
* GET /api/products/all       -get a number of products with on a specific page number that we passed in params  
* GET /api/products/initial   -get first 15 products
* GET /api/products/advanced  -get product with filter of categories, page number, and sort type(price/alphabet/etc)
* GET /api/products/:id       -get product by id
* POST /api/products/create   -create a new product
* POST /api/products/modify   -modify a product
* POST /api/products/remove   -remove a product from db
