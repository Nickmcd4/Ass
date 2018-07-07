var date = '2018-07-06';
var format = "LLLL";
var result = moment(date).format(format);
console.log(result);

var moment = moment();

console.log(moment);


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