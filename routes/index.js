var Promise = require('bluebird');
var router = require('express').Router();
var hotelsRt = require('./api/hotels');
var restaurantsRt = require('./api/restaurants');
var activitiesRt = require('./api/activities');

router.get('/', function(req, res, next) {

    res.render('index', {
      templateHotels: hotels,
      templateRestaurants: restaurants,
      templateActivities: activities
    });
});

router.use('/api/hotels', hotelsRt);
router.use('/api/restaurants', restaurantsRt);
router.use('/api/activities', activitiesRt);


module.exports = router;
