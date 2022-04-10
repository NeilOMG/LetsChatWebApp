var firebaseConfig = {
    apiKey: "AIzaSyCSUZEW3xCrGiGP0gJGmKxFkfWVU6uJtfw",
    authDomain: "kwitter-24ae6.firebaseapp.com",
    databaseURL: "https://kwitter-24ae6-default-rtdb.firebaseio.com",
    projectId: "kwitter-24ae6",
    storageBucket: "kwitter-24ae6.appspot.com",
    messagingSenderId: "727764159544",
    appId: "1:727764159544:web:65cbccb1922ef37e566acd"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name")
room_name = localStorage.getItem("room_name")

function send() {

    msg = document.getElementById("sendmsg").value;
    firebase.database().ref(room_name).push({

          name: user_name,
          message: msg,
          likes: 0

    })
    document.getElementById("sendmsg").value = ""

}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
          document.getElementById("output").innerHTML = "";
          snapshot.forEach(function (childSnapshot) {
                childKey = childSnapshot.key;
                childData = childSnapshot.val();
                console.log(childKey)
                console.log(childData)
                if (childKey != "purpose") {
                      firebase_message_id = childKey;
                      message_data = childData;
                      //Start code
                      console.log(firebase_message_id);
                      console.log(message_data);
                      name1 = message_data["name"]
                      message = message_data["message"]
                      likes = message_data["likes"]
                      name_tag = "<h4>" + name1 +"</h4>"
                      message_tag = "<h4 class='message_h4'>" + message + "</h4>"
                      button_tag = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + likes + " onclick='updateLike(this.id)'>"
                      span_tag = "<span class='glyphicon glyphicon-thumbs-up'>like: " + likes + "</span></button><hr>"
                      row = name_tag + message_tag + button_tag + span_tag
                      document.getElementById("output").innerHTML += row

                      //End code
                }
          });
    });
}
getData();

function logout() {

    localStorage.removeItem("user_name")
    localStorage.removeItem("room_name")
    window.location = "index.html"
}

function updateLike(button_id) {

like=document.getElementById(button_id).value;
updatedLikes=Number(like)+1;
firebase.database().ref(room_name).child(button_id).update({

likes:updatedLikes

})

}
