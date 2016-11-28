'use strict';
/* global $ dayModule */

/**
 * A module for managing multiple days & application state.
 * Days are held in a `days` array, with a reference to the `currentDay`.
 * Clicking the "add" (+) button builds a new day object (see `day.js`)
 * and switches to displaying it. Clicking the "remove" button (x) performs
 * the relatively involved logic of reassigning all day numbers and splicing
 * the day out of the collection.
 *
 * This module has four public methods: `.load()`, which currently just
 * adds a single day (assuming a priori no days); `switchTo`, which manages
 * hiding and showing the proper days; and `addToCurrent`/`removeFromCurrent`,
 * which take `attraction` objects and pass them to `currentDay`.
 */

var tripModule = (function () {

  // application state

    let days = $.get('/api/days')
    .then( days => {
      console.log(days);
      days.forEach( day => {
        dayModule.create(day);
      });
      return days;
    });


    var  currentDay;

  // jQuery selections

  var $addButton, $removeButton;
  $(function () {
    $addButton = $('#day-add');
    $removeButton = $('#day-title > button.remove');
  });

  // method used both internally and externally

  function switchTo (newCurrentDay) {
    if (currentDay) currentDay.hide();
    currentDay = newCurrentDay;
    currentDay.show();
  }

  // jQuery event binding

  $(function () {
    $addButton.on('click', addDay);
    $removeButton.on('click', deleteCurrentDay);
  });

  function addDay () {
    $.post('/api/days/addDay')
    .then( addedDay => {
      console.log('I just created a new')
      if (this && this.blur) this.blur(); // removes focus box from buttons
        var newDay = dayModule.create(addedDay); // dayModule
        switchTo(newDay);
    });
  }

  function deleteCurrentDay () {
    // prevent deleting last day
    $.ajax({
      url: '/api/days/delete/' + days.indexOf(currentDay),
      type: 'DELETE'
    })
    .then( deletedDay => {
        console.log(deletedDay);
        console.log(days);
        if (days.length < 2 || !currentDay) return;
        // remove from the collection
        var index = days.indexOf(currentDay),
          previousDay = days.splice(index, 1)[0],
          newCurrent = days[index] || days[index - 1];
        // fix the remaining day numbers
        days.forEach(function (day, i) {
          day.setNumber(i + 1);
        });
        switchTo(newCurrent);
        previousDay.hideButton();
    });
  }

  // globally accessible module methods

  var publicAPI = {

    load: function () {
      if (days.length === 0){
        $(addDay);
      }
    },

    switchTo: switchTo,

    addToCurrent: function (attraction) {
      currentDay.addAttraction(attraction);
    },

    removeFromCurrent: function (attraction) {
      currentDay.removeAttraction(attraction);
    }

  };

  return publicAPI;

}());
