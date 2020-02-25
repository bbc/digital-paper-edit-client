// https://www.w3resource.com/javascript-exercises/javascript-date-exercise-44.php
function diffDateInMinutes(dt2, dt1) {
  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
 }

 module.exports = diffDateInMinutes;