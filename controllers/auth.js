const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
	const { email, password } = req.body;

	// Check if email and password are present
	if (!email || !password) {
		return res
			.status(400)
			.json({ message: 'Email and password are required' });
	}
	try {
		// Check if user exists
		const findUser = await Usuario.findOne({
			where: {
				email,
			},
		});

		if (!findUser) {
			return res.status(400).json({ message: 'User does not exist' });
		}

		// Check if password is correct
		const isMatch = await bcrypt.compare(password, findUser.password);

		if (!isMatch) {
			return res.status(400).json({ message: 'Password is incorrect' });
		}

		// status 200
		res.status(200).json({ user: findUser });
	} catch (error) {
		console.log(error);
	}
};

exports.registrar = async (req, res) => {
	const { nombre, email, password } = req.body;

	// Check if email and password are present
	if (!nombre || !email || !password) {
		return res
			.status(400)
			.json({ message: 'Nombre, email and password are required' });
	}
	try {
		// Check if user exists
		const findUser = await Usuario.findOne({
			where: { email },
		});

		if (findUser) {
			return res.status(400).json({ message: 'User already exists' });
		}
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		// Create user
		const newUser = await Usuario.create({
			nombre,
			email,
			password: hash,
		});

		res.status(200).json({ user: newUser });
	} catch (error) {
		console.log(error);
	}
};
