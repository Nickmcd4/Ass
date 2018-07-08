$(document).ready(function(){

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDNHmLGFxQc9MX34D1z1GuhPzlmVsVD6OU",
  authDomain: "train-schedule-live.firebaseapp.com",
  databaseURL: "https://train-schedule-live.firebaseio.com",
  projectId: "train-schedule-live",
  storageBucket: "train-schedule-live.appspot.com",
  messagingSenderId: "193251097588"
};
firebase.initializeApp(config);

//var to represent the database
var database = firebase.database();


$("#trainInfo").on('click', function(event){ //on click of submit button in form
event.preventDefault(); //prevent page from reloading
console.log("working"); //test debug

//create variable based on form inputs
var trainName = $('#name').val().trim();
console.log(trainName); //test debug
var destination = $('#destination').val().trim();
console.log(destination); //test debug
var firstTrain = moment($('#firstTrainTime').val().trim(), "HH:mm").format("HH:mm"); //moment time conversion to military 
console.log (firstTrain); //test debug
var frequency = $("#frequency").val().trim();
console.log(frequency); //test debug

$('#name').val("");
$('#destination').val("");
$('#firstTrainTime').val("");
$('#frequency').val("");


var theTrain = {   //create an object to store train data 
  name : trainName,
  location : destination,
  start : firstTrain,
  arrivals : frequency
}

database.ref().push(theTrain); //pushes train to database - WORKING!!!!
console.log(theTrain.name);

})



database.ref().on("child_added", function(childSnapshot){
  console.log(childSnapshot.val()); //test Debug

  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().location;
  var firstTrain = childSnapshot.val().start;
  var frequency = childSnapshot.val().arrivals;
  

  //TIME CONVERSIONS
  var firstTrainConversion = moment(firstTrain, "HH:mm");
  console.log(firstTrainConversion);
  var currentTime = moment().format("HH:mm");
  console.log(currentTime + "CURRENT TIME"); //Test debug

  var timeDifference = moment().diff(moment(firstTrainConversion), "minutes");
  console.log("Difference (min)" + timeDifference);

  var timeRemaining = timeDifference % frequency;
  console.log(timeRemaining);
  var finalMinutesTrain = frequency - timeRemaining;
  console.log(finalMinutesTrain); //numbers show larger than hours - need to convert to minutes
  var arrival = moment().add(finalMinutesTrain, "minutes").format("HH:mm");

  //everything is working, finally append everything to my table
  

  
  
  $("#infoTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrival + "</td><td>" + finalMinutesTrain + "</td><td>" + "<button id='delete'>remove</button>" + "</td></tr>");
  
  

  function update() {
     $('#currentTime').html("Current Time: " + moment().format('DD MMMM YYYY H:mm:ss'));  
  }

  setInterval(update, 1000);

});



});



