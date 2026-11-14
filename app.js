require('dotenv').config({ path: `${__dirname}/.env` });

const express = require('express');
const app = express();
const indexRouter = require('./routers/indexRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.use('/', indexRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
