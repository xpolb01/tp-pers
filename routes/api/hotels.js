'use strict';
const utils = require('../../public/js/utils')
const router = require('express').Router();
const Hotel = require('../../models/hotel');

router.get('/', (req, res, next) => {
  Hotel.findAll({})
  .then((hotels) => {
    res.send(hotels);
  })
  .catch(utils.logErr);
});

module.exports = router;
