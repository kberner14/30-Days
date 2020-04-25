const workoutForm = $("#workout-form");
const dropdownSelect = $("#workout");
const workoutTable = $("#table");
$(function() {
  $(workoutForm).on("submit", handleChallengeSelection);

  $.get("/api/user_data").then(function(data) {
    console.log(data);
    if (data[0].challenge !== null) {
      renderTable(data[0].challenge);
    } else {
      alert("No Data, Choose a challenge");
    }
  });
});

function handleChallengeSelection(event) {
  event.preventDefault();
  // alert("hi");
  const selectedChallenge = dropdownSelect.val();

  const challenge = [];
  for (let i = 0; i < 30; i++) {
    const challengeDay = {
      day: (i + 1).toString(),
      challengeName: selectedChallenge,
      reps: (i + 25).toString(),
      isComplete: "0"
    };
    challenge.push(challengeDay);
  }
  console.log(challenge);
  renderTable(challenge);
  $.ajax({
    url: "/api/user_data/challenge",
    method: "PATCH",
    data: { challenge }
  }).then(result => {
    location.reload();
    console.log(result);
  });
}

// const workoutForm = $("#workout-form");
// // const dropdownSelect = $("#workout");
// const workoutTable = $("#table");

// $(document).ready(function() {
//   $(workoutForm).on("submit", function handleFormSubmit(event) {
//     event.preventDefault();
//   });
//   // This file just does a GET request to figure out which user is logged in
//   // and updates the HTML on the page
//   $.get("/api/user_data").then(function(data) {
//     console.log(data);
//     renderTable(data.challenge);
//   });
// });

function renderTable(challengeCards) {
  console.log("Day: " + challengeCards[0].day);
  for (let i = 0; i < challengeCards.length; i++) {
    let li = $("<li/>")
      .addClass("day-item w3-panel w3-card")
      .attr("id", i)
      .appendTo(workoutTable);
    let divRow = $("<div/>")
      .addClass("w3-row")
      .appendTo(li);
    let divCol1 = $("<div/>")
      .addClass("w3-col s3 w3-green w3-center")
      .appendTo(divRow);
    $("<p>Day: " + challengeCards[i].day + "</p>").appendTo(divCol1);
    let divCol2 = $("<div/>")
      .addClass("w3-col s3 w3-green w3-center")
      .appendTo(divRow);
    $(
      "<p>Challenge Name: " + challengeCards[i].challengeName + "</p>"
    ).appendTo(divCol2);
    let divCol3 = $("<div/>")
      .addClass("w3-col s3 w3-green w3-center")
      .appendTo(divRow);
    $("<p>Reps: " + challengeCards[i].reps + "</p>").appendTo(divCol3);
    // let divCol4 = $("<div/>")
    //   .addClass("w3-col s3 w3-green w3-center")
    //   .appendTo(divRow);
    ////////////////////***********Make travis happy!! With this button!!!!!!!! */
    // $(
    //   '<button type="submit" class="btn btn-default" id="isComplete-btn"><i class="fa fa-search"></i> Complete?</button>'
    // ).appendTo(divCol4);
    // let isCompleteBtn = $("<button/>")
    //   .addClass("w3-button w3-black")
    //   .attr("complete", challengeCards[i].isComplete)
    //   .attr("id", challengeCards[i].day)
    //   .appendTo(divCol4);
  }
}
