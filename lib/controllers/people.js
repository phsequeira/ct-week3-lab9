const { Router } = require('express');
const People = require('../model/People.js');

module.exports = Router() 
.post('/', (req, res, next) => {
    People.insert(req.body)
      .then((people) => res.send(people))
      .catch(next);
})
.get('/', (req, res, next) => {
    People.find()
      .then((people) => res.send(people))
      .catch(next);
})
.delete('/:name', (req, res, next) => {
    People.delete(req.body)
      .then((people) => res.send(people))
      .catch(next);
})