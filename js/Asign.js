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
  document.getElementById("form-upload").addEventListener('submit',function(e){
     e.preventDefault();

          //capturing and storing users data 
     var fn = document.getElementById("fn").value;
     var ln = document.getElementById("ln").value;
     var username = document.getElementById("username").value;
     var email = document.getElementById("email").value;
     var gender = document.getElementById("gender").value;
     var password = document.getElementById("password").value;
     var conpass = document.getElementById("conpass").value;

          
     // user account to be created based on the email and password only 
     firebase.auth().createUserWithEmailAndPassword(email,password).then(
              function(response){
                console.log(response);
                alert("account created ");
             // sendVerificationEmail();

              }
      ).catch(
               function(error){
                 alert("something went wrong " + error);
                 console.log(error);
                 location.reload();
               }
      );


// transferring user details to firebase realtime database
      firebase.database().ref("Admn/").push({
            fn: fn,
            ln: ln,
            username: username,
            email: email,
            gender: gender,
            password: password

      }).then(
            function(response){
              alert("Registration Successful");
                  

                window.location.replace("../auth/Alogin.html");
            }
 
      ).catch(function(error){
          alert("something went wrong " + error);
      });


  });

//   //Function called right after the signUpWithEmailAndPassword to send verification emails
// function sendVerificationEmail() {
//     //Built in firebase function responsible for sending the verification email
//     firebase.auth().currentUser.sendEmailVerification()
//     .then(() => {
//         console.log('Verification Email Sent Successfully !');
//         //redirecting the user to the profile page once everything is done correctly
//         // window.location.assign('../profile');
//     })
//     .catch(error => {
//         console.error(error);
//     })
// }