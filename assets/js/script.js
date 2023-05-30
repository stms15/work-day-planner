// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  
  var today = {
    date: dayjs().format('dddd, MMMM D, YYYY'),
    time24: dayjs().format('H'),
    time12: dayjs().format('h a')
  };
  var timeBlocks = [];

  for (let i=9; i<=17; i++) {
    elementId = "#hour-" + i.toString();
    timeBlocks.push($(elementId));

    var index = i-9;
    var dataNum = timeBlocks[index].data().number;
    if (dataNum < today.time24) {
      timeBlocks[index].removeClass('future');
      timeBlocks[index].addClass('past');
    } else if (dataNum == today.time24) {
      timeBlocks[index].removeClass('future');
      timeBlocks[index].addClass('present');
    } 
    // else keep future class
  }
  
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

  $('#currentDay').text(today.date);
});
