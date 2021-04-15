// firebase sdk
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyATII6zkLkCyo9f3RFerrrEmgD1rhfLgVk",
    authDomain: "nakuhitajiwebapp.firebaseapp.com",
    databaseURL: "https://nakuhitajiwebapp-default-rtdb.firebaseio.com/",
    projectId: "nakuhitajiwebapp",
    storageBucket: "nakuhitajiwebapp.appspot.com",
    messagingSenderId: "357106987827",
    appId: "1:357106987827:web:906c50784b039f34b70446",
    measurementId: "G-CR0P9RTJJM"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //listening if the submit button has been clicked 
  document.getElementById("login-upload").addEventListener('submit',function(e){
     e.preventDefault();

  //capturing and storing users data 
     var email = document.getElementById("email").value;
     var password = document.getElementById("password").value;

       
  // Firebase verification of users when they login
              firebase.auth().signInWithEmailAndPassword(email,password).then(
                    function(response){
                      alert("Login Successful ");
                      window.location.replace("../private/activity.html");
                    }

                ).catch(function(error){
                      var errorCode = error.code;
                      if (errorCode == "auth/wrong-password") {
                         alert("wrong password entry");
                         location.reload();
                      } else {
                        alert(error);
                      }

                      alert("something went wrong , try again " + error);
                      location.reload();

                })

});

//reset 

document.getElementById("resetPass").addEventListener('submit', function(e){
  e.preventDefault();

  //capture user reset email 
  var resetEmail = document.getElementById("emailReset").value;

  //firebase code to reset email : sendPasswordResetEmail
  firebase.auth().sendPasswordResetEmail(resetEmail).then(function(response){
       console.log(response);
       alert("password reset link sent to email");
  }).catch(function(error){
       console.log(error);
       alert("reset link not sent " + error);
  });
});


//reset password via firebase 
//listen for form event 
document.getElementById("resetForm").addEventListener('submit', function(e){
     e.preventDefault();

     //capture user email 
     var resetEmail = document.getElementById("resetEmail").value;

     //use firebase method sendPasswordResetEmail to send a reset link
     firebase.auth().sendPasswordResetEmail(resetEmail).then(
      function(response){
          console.log(response);
          alert("password reset link sent");
      }).catch(function(error){
        console.log(error);
          alert("Failed " + error.code); 
      });
});


//google sign in
function googleLogin(){
    //intializing google sign up 
    var base_provider = new firebase.auth.GoogleAuthProvider();

    //signin using the google firebase method signInWithPopUP from firebase 
    firebase.auth().signInWithPopup(base_provider).then(function(response){
             console.log(response);
             alert("sign in success");
             //redirect screen
             window.location.replace("../private/activity.html");


    }).catch(function(error){
         console.log(error);
         alert("sign in with google failed " + error.code);
    })
}