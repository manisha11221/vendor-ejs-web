// Firebase initialize
const firebaseConfig = {
    apiKey: "vendor-dev-ae004",
    authDomain: "https://www.googleapis.com/oauth2/v1/certs",
    projectId: "vendor-dev-ae004",
    storageBucket: "gs://vendor-dev-ae004.appspot.com",
    messagingSenderId: "793127788652",
    appId: "vendor-dev-ae004"
  };
  

  const actionCodeSettings = {
    url: 'http://localhost:3000',
    handleCodeInApp: true,
  };

  
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
  