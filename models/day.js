/* eslint-disable camelcase */
var Sequelize = require('sequelize');
var db = require('./_db');

var Day = db.define('day', {
  number: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
    // defaultValue: 1
  }
});

module.exports = Day;
