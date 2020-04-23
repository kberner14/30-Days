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
    renderTable(challenge.challenge[1].isComplete);
    console.log(challenge);
  });
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page

  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });
});

function renderTable(days) {
  $.each(days, function(i) {
    let li = $("<li/>")
      .addClass("day-item w3-panel w3-card")
      .attr("id", i)
      .appendTo(workoutTable);
  })
}