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


   //create ref to table interface 
   var tableRecords = document.getElementById("tableRecs");
   //ref to the firebase database 
   var databaseRecords = firebase.database().ref('Users/');
   //default row for my table 
   var rowIndex = 1;

   //picking values in the firebase ref node
   databaseRecords.once('value', function(snapshotRecords){
        //forEach to loop through records
        snapshotRecords.forEach(function(childSnapShotRecords){
            //key record
            var childKey = childSnapShotRecords.key;
            //data values
            var childData = childSnapShotRecords.val();
            //define row iteration
            var row = tableRecords.insertRow(rowIndex);
            //get image path
            // var image = childSnapShotRecords.val().studentImage;

            //defining the cell structure
            var cellId = row.insertCell(0);
            var cellFirstName = row.insertCell(1);
            var cellLastName= row.insertCell(2);
            var cellEmail = row.insertCell(3);
            var cellUsername = row.insertCell(4);
            var cellGender = row.insertCell(5);
            var cellSubscription = row.insertCell(6);

           

           //map the txt content to cells
           cellId.appendChild(document.createTextNode(childKey));
           cellFirstName.appendChild(document.createTextNode(childData.fn));
           cellLastName.appendChild(document.createTextNode(childData.ln));
           cellEmail.appendChild(document.createTextNode(childData.email));
           cellUsername.appendChild(document.createTextNode(childData.username));
           cellGender.appendChild(document.createTextNode(childData.gender));
           cellSubscription.appendChild(document.createTextNode(childData.sub));

           rowIndex = rowIndex + 1;

        });



   });

   //delete 
   function deleteRecordbyId(){
       //pick the id of the record being deleted 
       var deleteId = document.getElementById("deleteRecordId").value;
       // remove function to delete data in fb realtime db
       firebase.database().ref('Users/').child(deleteId).remove();
       //alert 
       alert("record deleted");
       deleteId ='';
       //reload 
       location.reload();
   }

   //update n
   function updateRecordbyId(){
      //pick id of the record 
      var updateid = document.getElementById("updateRecordId").value;
      // picking new email
      var newEmail = document.getElementById("updateEmail").value;
      var newFirstName = document.getElementById("updatefn").value;
      var newLastName = document.getElementById("updateln").value;
      //update function to update data in record node in FB 
      firebase.database().ref('Users/' + updateid).update({
          email: newEmail,
          fn: newFirstName,
          ln: newLastName

      })

      alert("update successful");
      newEmail = '';
      newFirstName = '';
      newLastName = '';
      updateid = '';
      location.reload();
   }


   //signout 
   function signOut(){
        //signOut
        firebase.auth().signOut().then(
             function(response){
                alert("logged out");
                window.location.replace("../index.html")
             }
          ).catch(function(error){
              alert(error);
              location.reload();
          })

       }