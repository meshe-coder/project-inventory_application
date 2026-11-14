const { getRecords } = require('../db/query');

const indexController = {
	index: async (req, res, next) => {
		try {
			const items = await getRecords('car_parts');
			res.render('index', { items });
		} catch (error) {
			next(error);
		}
	},
};

module.exports = { indexController };