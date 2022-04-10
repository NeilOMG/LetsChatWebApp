var firebaseConfig = {
    apiKey: "AIzaSyAX94gNMMrEi4trTafTLocwXf5khuvraEA",
    authDomain: "letschat-1cae0.firebaseapp.com",
    databaseURL: "https://letschat-1cae0-default-rtdb.firebaseio.com",
    projectId: "letschat-1cae0",
    storageBucket: "letschat-1cae0.appspot.com",
    messagingSenderId: "372827706556",
    appId: "1:372827706556:web:0533932d14df214993ecb9"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  user_name = localStorage.getItem("user_name")
document.getElementById("name").innerHTML = "Welcome " + user_name + " !"

function add_room() {

      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({

            purpose: "creating room"
      })

      localStorage.setItem("room_name", room_name)
      window.location = "kwitter_page.html"
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
             snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  row="<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)'>#"+Room_names+"</div><hr>"
                  document.getElementById("output").innerHTML +=row
                  //End code
            });
      });
}
getData();

function redirectToRoomName(x){

console.log(x);
localStorage.setItem("room_name", x)
 window.location = "kwitter_page.html"

}

function logout(){

localStorage.removeItem("user_name")
localStorage.removeItem("room_name")
window.location="index.html"
}
