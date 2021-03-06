// js for clock animation ///////////////////////////////////////////
var clock = new Vue({
    el: '#clock',
    data: {
        time: '',
        date: ''
    }
});

var week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
var timerID = setInterval(updateTime, 1000);
updateTime();
function updateTime() {
    var cd = new Date();
    clock.time = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2) + ':' + zeroPadding(cd.getSeconds(), 2);
    clock.date = zeroPadding(cd.getFullYear(), 4) + '-' + zeroPadding(cd.getMonth()+1, 2) + '-' + zeroPadding(cd.getDate(), 2) + ' ' + week[cd.getDay()];
};

function zeroPadding(num, digit) {
    var zero = '';
    for(var i = 0; i < digit; i++) {
        zero += '0';
    }
    return (zero + num).slice(-digit);
}
// //////////////////////////////////////////////////////////////////


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
firstTime = moment($("#time-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
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
  var tFrequency = childSnapshot.val().Frequency;
  var tFirstTime = childSnapshot.val().firstTime;

 // calculate the frequency time
var differenceInTime = moment().diff(moment.unix(tFirstTime), "minutes");
var tRemainder = moment().diff(moment.unix(tFirstTime), "minutes") % tFrequency;
var tMinutes = tFrequency - tRemainder;

// calculate arrival time
var tArrival = moment().add(tMinutes, "m").format("hh:mm A");

console.log(tMinutes);

// add train data to html table
$("#Schedule > tbody").append("<tr><td>" + tTrain + "</td><td>" + tDestination + "</td><td>" + tFrequency + " min</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");

// Errors
// }, function(errorObject) {
//   console.log("Errors handled: " + errorObject.code);

});