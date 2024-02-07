// main.js
const { firebaseConfig, actionCodeSettings } = require('./config');
const firebase = require('firebase/app');
require('firebase/auth');

// Firebase initialize
firebase.initializeApp(firebaseConfig);

// Firebase Authentication
const auth = firebase.auth();

// Function to send OTP via email
function sendOTP(email) {
  auth.sendSignInLinkToEmail(email, actionCodeSettings)
    .then(() => {
      // OTP sent successfully
      console.log("OTP sent successfully");
    })
    .catch((error) => {
      // Handle errors
      console.error("Error sending OTP:", error);
    });
}
