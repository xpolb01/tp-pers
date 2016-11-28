'use strict';

const utils = require('../../public/js/utils')
const router = require('express').Router();
const Day = require('../../models/day');

router.get('/', (req, res, next) => {
  Day.findAll({})
  .then((days) => {
    res.send(days);
  })
  .catch(utils.logErr);
});

router.post('/addDay', (req, res, next) => {
  Day.create()
  .then(function (day) {
    res.send(day);
  })
  .catch(utils.errLog);
});

module.exports = router;
