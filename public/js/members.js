const workoutForm = $("#workout-form");
const dropdownSelect = $("#workout");
const workoutTable = $("#table");
$(document).ready(function() {
  $(workoutForm).on("submit", function handleFormSubmit(event) {
    event.preventDefault();
    var challenge = {
      challenge: [
        { challengeName: dropdownSelect.val() },
        {
          isComplete: [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ]
        }
      ]
    };
    // renderTable(challenge.challenge[1].isComplete);
    console.log(challenge);
    $.ajax({
      url: "/api/user_data/2/challenge",
      method: "PATCH",
      data: challenge
    });
  });
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page

  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });
});

// function renderTable(days) {
//   $.each(days, function(i) {
//     let li = $("<li/>")
//       .addClass("day-item w3-panel w3-card")
//       .attr("id", i)
//       .appendTo(workoutTable);
//     let divRow = $("<div/>")
//       .addClass("w3-row")
//       .appendTo(li);
//     let divCol1 = $("<div/>")
//       .addClass("w3-col s3 w3-green w3-center")
//       .appendTo(divRow);
//     $("<p>Text</p>").appendTo(divCol1);
//     let divCol2 = $("<div/>")
//       .addClass("w3-col s3 w3-green w3-center")
//       .appendTo(divRow);
//     $("<p>Text</p>").appendTo(divCol2);
//     let divCol3 = $("<div/>")
//       .addClass("w3-col s3 w3-green w3-center")
//       .appendTo(divRow);
//     $("<p>Text</p>").appendTo(divCol3);
//     let divCol4 = $("<div/>")
//       .addClass("w3-col s3 w3-green w3-center")
//       .appendTo(divRow);
//     $("<p>Text</p>").appendTo(divCol4);
//   });
// }
