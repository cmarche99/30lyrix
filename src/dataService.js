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
    setPreferiti(id_track, track, id_artist, artist, id_album, cover) {
      return db
        .collection("preferiti")
        .add({
          id_track: id_track,
          track: track,
          id_artist: id_artist,
          artist: artist,
          id_album: id_album,
          cover: cover,         
          username: localStorage.getItem("username")
        });
    },
    getPreferiti() {
      return db
        .collection("preferiti")
        .where("username", "==", localStorage.getItem("username"))
        .get()
    },
    removePreferiti(id_track){
      return db
      .collection("preferiti")
      .where("traccia", "==", id_track)
      .where("username", "==", localStorage.getItem("username"))
      .get()
      .then(result =>{
        result.forEach(doc =>{
          db.collection("preferiti").doc(doc.id).delete();
          });
      });
    },
    // removePreferiti() {
    //   return db
    //     .collection("preferiti")
    //     .where("username", "==", localStorage.getItem("username"))
    //     .where("traccia", "==", id_track)
    //     .get()
    // },
    // getID (id_track){
    //   db.collection("preferiti")
    //   .where("username", "==", localStorage.getItem("username"))
    //   .where("traccia", "==", id_track)
    //   .id
    // }
  }

