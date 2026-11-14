const pool = require('./pool');

const getRecords = async (tableName) => {
	if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(tableName)) {
		throw new Error('Invalid table name');
	}

	const result = await pool.query(`SELECT * FROM "${tableName}" ORDER BY "id"`);
	return result.rows;
};

const insertRecord = async (tableName, formData) => {
	// Table and column names are part of the SQL, so validate those identifiers.
	if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(tableName)) {
		throw new Error('Invalid table name');
	}

	const fields = Object.keys(formData);
	const columns = fields.map((field) => {
		if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(field)) {
			throw new Error(`Invalid column name: ${field}`);
		}

		return `"${field}"`;
	});

	const values = fields.map((field) => formData[field]);
	const placeholders = values.map((_, index) => `$${index + 1}`);
	const sql = `INSERT INTO "${tableName}" (${columns.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING *`;

	const result = await pool.query(sql, values);
	return result.rows[0];
};

module.exports = { getRecords, insertRecord };
