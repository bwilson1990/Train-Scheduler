
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBmX4_hi4OQhLdUYtZwkURFKY9HRx_374U",
    authDomain: "train-schedule-440e0.firebaseio.com",
    databaseURL: "https://train-schedule-440e0.firebaseio.com/",
    storageBucket: "train-schedule-440e0.appspot.com"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // Button for adding new Trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainTime = moment($("#time-input").val().trim(), "HH:mm").format("X");
    var trainFrequency = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      time: trainTime,
      frequency: trainFrequency
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);
  
    alert("Employee successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
  });
  
  // Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;
  
    // Train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);
  
    // Prettify the Train
    var trainTimePretty = moment.unix(trainTime).format("LT");
  

    var minutesAway = trainTime - trainFrequency;

  
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency),
      $("<td>").text(trainTimePretty),
      $("<td>").text(minutesAway),


    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
