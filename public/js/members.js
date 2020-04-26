const workoutForm = $("#workout-form");
const dropdownSelect = $("#workout");
const workoutTable = $("#table");

$(function() {
  $(workoutForm).on("submit", handleChallengeSelection);
  $.get("/api/user_data").then(function(response) {
    console.log(response);
    $(".member-name").text(response[0].email);
    if (response[0].challenge !== null) {
      renderTable(response[0].challenge);
    } else {
      appendNoDataCard();
    }
    const completeBtn = $(".completeBtn");
    completeBtn.click(function() {
<<<<<<< HEAD
      // const challengeTest = [];
      // for (let i = 0; i < 30; i++) {
      //   const challengeDay = {
      //     day: (i + 1).toString(),
      //     challengeName: "Pushup",
      //     reps: (i + 25).toString(),
      //     isComplete: "0"
      //   };
      //   challenge.push(challengeDay);
      // }
      // console.log(challengeTest);
      // if (JSON.stringify(challengeTest) === JSON.stringify(response)) {
      //   console.log("They are equal!");
      // }
      alert(response[0].challenge[this.id].isComplete);
      response[0].challenge[this.id].isComplete = "1";
      alert(response[0].challenge[this.id].isComplete);
      console.log(response[0].challenge);
      const newData = response[0].challenge;
      $.ajax({
        url: "/api/user_data/challenge",
        method: "PATCH",
        data: { challenge: newData }
      }).then(result => {
        location.reload();
        console.log(result);
      });
=======
      makePatch(response, this.id);
>>>>>>> b762dd81b368ee0261580f9e9bc7c12a232dacb4
    });
  });
});

function makePatch(response, id) {
  console.log("Response in makePatch");
  console.log(response);
  response[0].challenge[id].isComplete = "1";
  const newData = response[0].challenge;
  $.ajax({
    url: "/api/user_data/challenge",
    method: "PATCH",
    data: { challenge: newData }
  }).then(result => {
    location.reload();
    console.log(result);
  });
}

function handleChallengeSelection(event) {
  event.preventDefault();
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

function renderTable(challengeCards) {
  let colorIndex = 0;
  const colorArr = [
    "w3-theme-l5",
    "w3-theme-l4",
    "w3-theme-l3",
    "w3-theme-l2",
    "w3-theme-l1",
    "w3-theme",
    "w3-theme-d1"
  ];
  for (let i = 0; i < challengeCards.length; i++) {
    if (colorIndex > 6) {
      colorIndex = 0;
    }
    let li = $("<li/>")
      .addClass(`${colorArr[colorIndex++]}`)
      .attr("id", i)
      .appendTo(workoutTable);
    let divRow = $("<div/>")
      .addClass("w3-row")
      .appendTo(li);
    let divCol1 = $("<div/>")
      .addClass("w3-col s3 w3-center")
      .appendTo(divRow);
    $("<p>Day: " + challengeCards[i].day + "</p>").appendTo(divCol1);
    let divCol2 = $("<div/>")
      .addClass("w3-col s3 w3-center")
      .appendTo(divRow);
    $("<p>ChallengeName: " + challengeCards[i].challengeName + "</p>").appendTo(
      divCol2
    );
    let divCol3 = $("<div/>")
      .addClass("w3-col s3 w3-center")
      .appendTo(divRow);
    $("<p>Reps: " + challengeCards[i].reps + "</p>").appendTo(divCol3);
    let divCol4 = $("<div/>")
      .addClass("w3-col s3 w3-center")
      .appendTo(divRow);
    if (challengeCards[i].isComplete === "1") {
      $(
        `<button type="submit" class="btn btn-default completeBtn" id="${i}" disabled>Finished</button>`
      ).appendTo(divCol4);
    } else {
      $(
        `<button type="submit" class="btn btn-default completeBtn" id="${i}">Complete?</button>`
      ).appendTo(divCol4);
    }
  }
}

function appendNoDataCard() {
  $(
    `<div class="w3-panel w3-card-2"><p>No Data Available, Select a Workout to Begin!</p></div>`
  ).appendTo(workoutTable);
}
