const workoutForm = $("#workout-form");
const dropdownSelect = $("#workout");
const dropdownColumn = $("#mySidebar");
const workoutTable = $("#table");

$(function() {
  $(workoutForm).on("submit", handleChallengeSelection);
  motivationalPoster();
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
      makePatch(response, this.id);
    });
  });
});

function motivationalPoster() {
  var settings = {
    async: true,
    crossDomain: true,
    url:
      "https://healthruwords.p.rapidapi.com/v1/quotes/?t=Motivational&maxR=1&size=medium",
    method: "GET",
    headers: {
      "x-rapidapi-host": "healthruwords.p.rapidapi.com",
      "x-rapidapi-key": "aba3c7bdc1msh5b9a40821dbd03fp181584jsn6ee503254af2"
    }
  };

  $.ajax(settings).then(response => {
    console.log(response);
    $(`<div class="w3-panel w3-card-2"><img src="${response[0].media}" id="motivationalPoster"></div>`).appendTo(dropdownColumn);
  });
}

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
      reps: setProperTask(selectedChallenge, i),
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

function setProperTask(selectedChallenge, i) {
  const pushupArr = [
    "15 reps",
    "15 reps",
    "15 reps",
    "15 reps",
    "15 reps",
    "15 reps",
    "None, REST DAY",
    "20 reps",
    "20 reps",
    "20 reps",
    "20 reps",
    "20 reps",
    "20 reps",
    "None, REST DAY",
    "25 reps",
    "25 reps",
    "25 reps",
    "25 reps",
    "30 reps",
    "30 reps",
    "None, REST DAY",
    "30 reps",
    "30 reps",
    "30 reps",
    "35 reps",
    "35 reps",
    "40 reps",
    "None, REST DAY",
    "40 reps",
    "45 reps"
  ];
  const situpArr = [
    "25 reps",
    "25 reps",
    "25 reps",
    "25 reps",
    "25 reps",
    "25 reps",
    "None, REST DAY",
    "25 reps",
    "25 reps",
    "30 reps",
    "30 reps",
    "30 reps",
    "30 reps",
    "None, REST DAY",
    "35 reps",
    "35 reps",
    "35 reps",
    "35 reps",
    "45 reps",
    "45 reps",
    "None, REST DAY",
    "45 reps",
    "45 reps",
    "50 reps",
    "50 reps",
    "50 reps",
    "55 reps",
    "None, REST DAY",
    "55 reps",
    "60 reps"
  ];
  const jumpRopeArr = [
    "1 min",
    "1 min",
    "1 min",
    "1 min 20 sec",
    "1 min 20 sec",
    "1 min 40 sec",
    "None, REST DAY",
    "2 min",
    "2 min",
    "2 min",
    "2 min 20 sec",
    "2 min 20 sec",
    "2 min 40 sec",
    "None, REST DAY",
    "3 min",
    "3 min",
    "3 min",
    "3 min 20 sec",
    "3 min 30 sec",
    "3 min 40 sec",
    "None, REST DAY",
    "4 min",
    "4 min",
    "4 min",
    "4 min 20 sec",
    "4 min 20 sec",
    "4 min 40 sec",
    "None, REST DAY",
    "5 min",
    "5 min"
  ];
  if (selectedChallenge === "Pushups") {
    return pushupArr[i];
  } else if (selectedChallenge === "Situps") {
    return situpArr[i];
  } else if (selectedChallenge === "JumpRope") {
    return jumpRopeArr[i];
  }
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
    $("<p>Day:<strong> " + challengeCards[i].day + "</strong></p>").appendTo(
      divCol1
    );
    let divCol2 = $("<div/>")
      .addClass("w3-col s3 w3-center")
      .appendTo(divRow);
    $(
      "<p>ChallengeName:<strong> " +
        challengeCards[i].challengeName +
        "</strong></p>"
    ).appendTo(divCol2);
    let divCol3 = $("<div/>")
      .addClass("w3-col s3 w3-center")
      .appendTo(divRow);
    $("<p>Task:<strong> " + challengeCards[i].reps + "</strong></p>").appendTo(
      divCol3
    );
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

function appendQuote(response) {
  $(`<img src="${response.media}"`).appendTo(dropdownColumn);
}