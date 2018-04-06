  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCxdo5hNhyhefbiuBsdQ8LumCJj_p_DXnQ",
    authDomain: "traindata-8ec85.firebaseapp.com",
    databaseURL: "https://traindata-8ec85.firebaseio.com",
    projectId: "traindata-8ec85",
    storageBucket: "traindata-8ec85.appspot.com",
    messagingSenderId: "734217204305"
  };

firebase.initializeApp(config);

var dataRef = firebase.database();

// Initial Values
var Train = "";
var Destination = "";
var firstTime = "";
var Frequency = "";

// Capture Button Click
$("#add-train").on("click", function() {

Train = $("#train-input").val().trim();
Destination = $("#destination-input").val().trim();
firstTime = $("#time-input").val().trim();
Frequency = $("#frequency-input").val().trim();

	// Push
  dataRef.ref().push({

    Train: Train,
    Destination: Destination,
    firstTime: firstTime,
    Frequency: Frequency,
    // dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

// console.log successful add
console.log("train added");

// clear text
$("#train-input").val("");
$("#destination-input").val("");
$("#time-input").val("");
$("#frequency-input").val("");

   // No refresh
  return false;
  });

// firebase event for when user add train data
  dataRef.ref().on("child_added", function(childSnapshot, prevChildKey) {


  // storing into variables
  var tTrain = childSnapshot.val().Train;
  var tDestination = childSnapshot.val().Destination;
  var tFirstTime = childSnapshot.val().firstTime;
  var tFrequency = childSnapshot.val().Frequency;
 
 // calculate the frequency time
var differenceInTime = moment().diff(moment.unix(tFirstTime), "minutes");
var tRemainder = moment().diff(moment.unix(tFirstTime), "minutes") % tFrequency;
var tMinutes = tFrequency - tRemainder;

// calculate arrival time
var tArrival = moment().add(tMinutes, "m").format("hh:mm A");

console.log(tMinutes);

// add train data to html table
$("#Schedule > tbody").append("<tr><td>" + tTrain + "</td><td>" + tDestination + "</td><td>" + tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td><td>");

// Errors
// }, function(errorObject) {
//   console.log("Errors handled: " + errorObject.code);

});