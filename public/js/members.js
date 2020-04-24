const workoutForm = $("#workout-form");
const dropdownSelect = $("#workout");
// const workoutTable = $("#table");
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
      url: "/api/user_data/" + id + "/challenge",
      method: "PATCH",
      data: challenge
    })
      .then(resp => {
        console.log(resp);
      })
      .then(() => {
        $.get("/api/user_data").then(function(data) {
          console.log("Data:");
          console.log(data);
        });
      });
  });
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  var id;
  // var challengeName = data[0].challenge[0].challengeName;
  // var isComplete = data[0].challenge[1].isComplete;
  $.get("/api/user_data").then(function(data) {
    id = data[0].id;
    $(".member-name").text(data[0].email);
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
