const { Router } = require('express');
const Event = require('../model/Event.js');

module.exports = Router() 
.post('/', (req, res, next) => {
    Event.insert(req.body)
      .then((event) => res.send(event))
      .catch(next);
})
.get('/', (req, res, next) => {
    Event.find(req.body)
      .then((event) => res.send(event))
      .catch(next);
})
.delete('/:id', (req, res, next) => {
    Event.delete(req.body)
      .then((event) => res.send(event))
      .catch(next);
})