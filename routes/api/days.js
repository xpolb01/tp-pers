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

router.get('/:id', (req, res, next) => {
  Day.findOne({where: {
    number: req.params.id
  }})
  .then( specificDay => {
    res.send(specificDay);
  })
  .catch(utils.errLog);
});

router.delete('/delete/:id', (req, res, next) => {
  Day.findOne({
    where: {
      number: req.params.id
    }
  })
  // Day.findAll({})
  // .then(allDays => {
  //   if (allDays.length < 2) {
  //     throw new Error('Can\'t delete the last day');
  //   }
  //   return allDays
  // })
  // .then((allDays) => {
  //   Day.destroy({
  //     where: {
  //       number: req.params.id
  //     }
  //   });
  //   return allDays
  // })
  .then(day => {
    return day.destroy();
  //   for (var i = req.params.id + 1; i <= allDays.length; i++) {
  //     let day = allDays[i];
  //     console.log('DAY', day);
  //     day.decrement('number');
  //   }
  })
  .then(() => {
    res.send('Successfully deleted');
  })
  .catch(utils.errLog)
});


module.exports = router;
