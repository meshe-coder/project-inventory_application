const { insertRecord } = require('../db/query');

const createController = {
	form: (req, res) => {
		res.render('form');
	},
	create: async (req, res, next) => {
		try {
			await insertRecord('car_parts', req.body);
			res.redirect(303, '/');
		} catch (error) {
			next(error);
		}
	},
};

module.exports = { createController };