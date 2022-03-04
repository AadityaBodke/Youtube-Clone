import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDqOdZHMQEXpCtiPB7O3XYu50EjF7VYgOI",
  authDomain: "yt-clone-1788f.firebaseapp.com",
  projectId: "yt-clone-1788f",
  storageBucket: "yt-clone-1788f.appspot.com",
  messagingSenderId: "685338706990",
  appId: "1:685338706990:web:03639972436b95f3240bbf",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

provider.setCustomParameters({
  prompt: "select_account",
});

export { db, auth, provider, storage };
