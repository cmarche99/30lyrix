import firebase from "@firebase/app";
import "@firebase/firestore";

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

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

export default {
  // inserisce nel database un nuovo documento con i campi indicati
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
  // riporta dal database i documenti che includono username uguale all'username di login
  getPreferiti() {
    return db
      .collection("preferiti")
      .where("username", "==", localStorage.getItem("username"))
      .get()
  },
  // rimuove dal database il documento della canzone selezionata associata allo username
  removePreferiti(id_track) {
    return db
      .collection("preferiti")
      .where("id_track", "==", id_track)
      .where("username", "==", localStorage.getItem("username"))
      .get()
      .then(result => {
        result.forEach(doc => {
          db.collection("preferiti").doc(doc.id).delete();
        });
      });
  },
}

