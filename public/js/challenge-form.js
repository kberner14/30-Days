/* global workoutForm, dropdownSelect */

$(function() {
  $(workoutForm).on("submit", handleChallengeSelection);
});

function handleChallengeSelection(event) {
  event.preventDefault();
  alert("hi");
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

  $.ajax({
    url: "/api/user_data/challenge",
    method: "PATCH",
    data: { challenge }
  }).then(() => {
    location.reload();
  });
}
