const express = require('express');
const cors = require('cors');

const app = express();

// ==> Rotas da API:
const index = require('./routes/index');
const accRoute = require('./routes/acc.routes');
const spendingRoute = require('./routes/spending.routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());

app.use(index);
app.use('/api/', accRoute);
app.use('/api/', spendingRoute);

module.exports = app;