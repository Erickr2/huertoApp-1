const Orden = require('../models/Orden');
const Producto = require('../models/Producto');
const Usuario = require('../models/Usuario');
const Sequelize = require('sequelize');
const sequelize = require('sequelize');

exports.createCart = async (req, res) => {
	const { idUsuario, productos, total } = req.body;

	// Check if idUsuario and idProducto are present
	if (!idUsuario || !productos || !total) {
		return res
			.status(400)
			.json({ message: 'idUsuario and idProducto are required' });
	}

	try {
		// Check if user exists
		const findUser = await Usuario.findOne({
			where: {
				id_usuario: idUsuario,
			},
		});

		if (!findUser) {
			return res.status(400).json({ message: 'User does not exist' });
		}

		// create a date
		const date = new Date();
		const fecha = `${date.getDate()}/${
			date.getMonth() + 1
		}/${date.getFullYear()}`;

		// create order
		const order = await Orden.create({
			UsuarioIdUsuario: idUsuario,
			fecha: fecha,
			total: total,
		});

		insertProducts = [];

		// insert products
		for (let i = 0; i < productos.length; i++) {
			const { nombre, precio, cantidad } = productos[i];

			// insert product
			const insertProduct = await Producto.create({
				OrdenIdOrden: order.id_orden,
				nombre: nombre,
				precio,
				cantidad: cantidad,
			});

			insertProducts.push(insertProduct);
		}

		// return order
		res.json({
			order,
			insertProducts,
		});
	} catch (error) {
		console.log(error);

		res.status(500).json({ message: 'Something went wrong' });
	}
};

exports.getOrdersByUser = async (req, res) => {
	const { id } = req.params;

	// Check if idUsuario and idProducto are present
	if (!id) {
		return res.status(400).json({ message: 'idUsuario is required' });
	}

	try {
		// Check if user exists
		const findUser = await Usuario.findOne({
			where: {
				id_usuario: id,
			},
		});

		if (!findUser) {
			return res.status(400).json({ message: 'User does not exist' });
		}
		// sql para obtener las ordenes de un usuario
		const sqlOrderDetail = `SELECT * FROM ordens o INNER JOIN usuarios u ON o.UsuarioIdUsuario = u.id_usuario WHERE u.id_usuario = ${id}`;

		// ejecutar sql
		const OrderDetail = await Orden.sequelize.query(sqlOrderDetail, {
			type: sequelize.QueryTypes.SELECT,
		});

		if (OrderDetail.length === 0) {
			return res
				.status(400)
				.json({ message: 'User does not have orders' });
		}

		const { id_orden, fecha, total } = OrderDetail[0];

		// SQL para obtener las ordenes y productos de un usuario
		const sql = `SELECT * FROM ordens o INNER JOIN peoductos p ON o.id_orden = p.OrdenIdOrden WHERE o.UsuarioIdUsuario = ${id}`;

		// Ejecutar SQL
		const orders = await Orden.sequelize.query(sql, {
			type: sequelize.QueryTypes.SELECT,
		});

		if (orders.length === 0) {
			return res
				.status(400)
				.json({ message: 'User does not have orders' });
		}

		// return orders
		res.json({
			detail: {
				id_orden,
				fecha,
				total,
			},
			orders,
		});
	} catch (error) {
		console.log(error);
	}
};

exports.deleteOrderByUser = async (req, res) => {
	const { id } = req.params;

	// Check if idUsuario and idProducto are present
	if (!id) {
		return res.status(400).json({ message: 'idUsuario is required' });
	}

	try {
		// Check if user exists
		const findUser = await Usuario.findOne({
			where: {
				id_usuario: id,
			},
		});

		if (!findUser) {
			return res.status(400).json({ message: 'User does not exist' });
		}

		// find order
		const findOrder = await Orden.findOne({
			where: {
				UsuarioIdUsuario: id,
			},
		});

		//delete products of order
		const deleteProducts = await Producto.destroy({
			where: {
				OrdenIdOrden: findOrder.id_orden,
			},
		});

		// delete order
		const deleteOrder = await Orden.destroy({
			where: {
				UsuarioIdUsuario: id,
			},
		});

		// return success
		res.json({
			message: 'Order deleted',
			deleteOrder,
		});
	} catch (error) {
		console.log(error);
	}
};
