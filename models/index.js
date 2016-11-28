var db = require('./_db');

var Place = require('./place');
var Hotel = require('./hotel');
var Restaurant = require('./restaurant');
var Activity = require('./activity');
var Day = require('./day');

Hotel.belongsTo(Place);
Restaurant.belongsTo(Place);
Activity.belongsTo(Place);
Day.belongsTo(Hotel);

Restaurant.belongsToMany(Day, {through: 'RestaurantOnDay'});
Day.belongsToMany(Restaurant, {through: 'RestaurantOnDay'});

Activity.belongsToMany(Day, {through: 'ActivityOnDay'});
Day.belongsToMany(Activity, {through: 'ActivityOnDay'});

module.exports = db;
