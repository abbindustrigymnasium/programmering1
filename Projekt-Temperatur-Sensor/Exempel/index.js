// Your web app's Firebase configuration
// https://www.survivingwithandroid.com/esp8266-firebase-realtime-database-iot-controlled-rgb-leds/

const firebaseConfig = {
  apiKey: "AIzaSyAK8AJmJPmUrHjPvKl486i99SE_Wfk0R_4",
  authDomain: "temp-projekt-220s.firebaseapp.com",
  projectId: "temp-projekt-220s",
  storageBucket: "temp-projekt-220s.appspot.com",
  messagingSenderId: "401787728103",
  appId: "1:401787728103:web:3f9f7614f1dae5d1c13242",
  databaseURL:
    "https://temp-projekt-220s-default-rtdb.europe-west1.firebasedatabase.app",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.database();

var ledRef = db.ref("led");

var counterRef = db.ref("counter");

var personRef = db.ref("person");

ledRef.once("value").then((snapshot) => {
  if (snapshot.val()) {
    let myCheckBox = document.getElementById("checkbox");
    myCheckBox.checked = snapshot.val().led;
    if (myCheckBox.checked) {
      document.getElementById("myImage").src = "light-bulb-on.png";
    } else {
      document.getElementById("myImage").src = "light-bulb-off.png";
    }
  }
});

ledRef.on("value", (snapshot) => {
  const data = snapshot.val();
});

personRef.on("value", (nalle) => {
  const data = nalle.val();
  console.log(data);
});

function turnOnOffLight() {
  let myCheckBox = document.getElementById("checkbox");

  if (myCheckBox.checked) {
    document.getElementById("myImage").src = "light-bulb-on.png";
    ledRef.update({ led: true });
    // personRef.update({ superkrafter: "Dansa Tango" });
  } else {
    document.getElementById("myImage").src = "light-bulb-off.png";
    // database.ref("/led").update({ led: true });
    ledRef.update({ led: false });
  }
}

function changeCounter() {
  var counter = document.querySelector("#counter");
  counterRef.update({ counter: counter.value });
}
