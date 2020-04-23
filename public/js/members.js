var workoutForm = $("#workout-form")
var dropdownSelect = $("#workout")
$(document).ready(function() {
  $(workoutForm).on("submit", function handleFormSubmit(event){
    event.preventDefault();
    var challenge = {
      challenge: [
        {challengeName: dropdownSelect.val()},
        {isComplete:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}
      ]
    }
    console.log(challenge)
  })
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });
});
