// ------ Functions ------ //

function saveSchedule(event) {
  var clickId = $(this).parent()[0].id;

  for (let k = 0; k < textAreas.length; k++) {
    if (textAreas[k].id == clickId) {
      localStorage.setItem(textAreas[k].id, textAreas[k].value);
    }
  }
}

function textChange() {
  var changeAtt = {
    id: $(this).parent()[0].id,
    value: $(this)[0].value,
  };
  var hourNum = changeAtt.id.replace("hour-", "");
  textAreas[hourNum - 9] = changeAtt;
}

// ----------------------- //


// --------- Main --------- //

var textAreas = ["", "", "", "", "", "", "", "", ""];

$(function () {
  var today = {
    date: dayjs().format("dddd, MMMM D, YYYY"),
    time24: dayjs().format("H"),
    time12: dayjs().format("h a"),
  };
  var timeBlocks = [];

  for (let i = 9; i <= 17; i++) {
    elementId = "#hour-" + i.toString();
    timeBlocks.push($(elementId));

    var index = i - 9;
    var dataNum = timeBlocks[index].data().number;
    if (dataNum < today.time24) {
      timeBlocks[index].removeClass("future");
      timeBlocks[index].addClass("past");
    } else if (dataNum == today.time24) {
      timeBlocks[index].removeClass("future");
      timeBlocks[index].addClass("present");
    } // else keep future class

    // Add listener for each hour that uses the same function on click
    var timeBlocksBttn = timeBlocks[index].children("button");
    timeBlocksBttn.on("click", saveSchedule);

    // Add on change listener for each hour's text area
    var textAreaEl = timeBlocks[index].children("textarea");
    textAreaEl.on("change", textChange);

    // Set textareas with stored input
    var storedKey = elementId.replace("#", "");
    var storedData = localStorage.getItem(storedKey);
    if (storedData !== null && storedData !== "") {
      textAreaEl.val(storedData);
    }
  }

  $("#currentDay").text(today.date);
});
