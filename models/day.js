/* eslint-disable camelcase */
var Sequelize = require('sequelize');
var db = require('./_db');

var Day = db.define('day', {
  number: {
    type: Sequelize.INTEGER,
    // primaryKey: true,
    // autoIncrement: true
    // defaultValue: 1
  }
}, {
  hooks: {
    beforeDestroy: function (day) {
      // console.log('OUTSIDE QUERY', day);
      return Day.findAll({
        where:
          {
            number: {
              $gt: day.number
            }
          }
      })
      .then(function (days) {
        console.log('DAYS', days);
        return Promise.all(days.map(function (instance) {
          console.log('inside the promise!');
          return instance.update({ number: --instance.number });
        }));
      });
    },

    beforeValidate: function (day) {
      if (day.number) {
        return;
      } else {
        return this.count()
                .then(function (total) {
                  day.number = total + 1;
                });
      }
    }
  }
});

module.exports = Day;
