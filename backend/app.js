const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const errorWithoutStatus = require('./errors/error-without-status');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(bodyParser.json());

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb').then(() => {
  console.log('connected to db');
});

app.use(requestLogger);
app.use(router);
app.use(errorLogger);

app.use(errors());
app.use(errorWithoutStatus);

app.listen(PORT, () => {
  console.log(`server is on the ${PORT}`);
});
