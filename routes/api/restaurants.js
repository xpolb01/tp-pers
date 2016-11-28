'use strict';
const utils = require('../../public/js/utils')
const router = require('express').Router();
const Restaurant = require('../../models/restaurant');

router.get('/', (req, res, next) => {
  Restaurant.findAll({})
  .then((restaurants) => {
    res.send(restaurants);
  })
  .catch(utils.logErr);
});

module.exports = router;
