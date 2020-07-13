// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.16.0/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/7.16.0/firebase-analytics.js"></script>

import firebase from "@firebase/app";
import "@firebase/firestore";

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCZMj3gQ6G7tYbry9UVaGOIFFSnzkUx5oI",
    authDomain: "lyrix-cbb27.firebaseapp.com",
    databaseURL: "https://lyrix-cbb27.firebaseio.com",
    projectId: "lyrix-cbb27",
    storageBucket: "lyrix-cbb27.appspot.com",
    messagingSenderId: "41031982447",
    appId: "1:41031982447:web:8950e468fef17acaca9c9a",
    measurementId: "G-V175N17GRH"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();

  var db = firebase.firestore();

  export default {
    setPreferiti(valore, numero, albicocche) {
      return db
        .collection("preferiti")
        .doc()
        .collection(localStorage.getItem("username"))
        .doc()
        .set({
          id_track: valore,
          id_artist: numero,
          id_album: albicocche
        });
    }
  }
