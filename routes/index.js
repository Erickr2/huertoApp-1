const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const cartController = require('../controllers/cart');

module.exports = function () {
	// route for login page
	router.post('/login', authController.login);

	// route for register page
	router.post('/register', authController.registrar);

	// route for post cart
	router.post('/cart', cartController.createCart);

	// route for get cart
	router.get('/cart/:id', cartController.getOrdersByUser);

	// route for Delete cart
	router.delete('/cart/:id', cartController.deleteOrderByUser);

	return router;
};
