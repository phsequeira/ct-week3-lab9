const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/v1/peoples', require('./controllers/people.js'));
app.use('/api/v1/events', require('./controllers/event.js'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
