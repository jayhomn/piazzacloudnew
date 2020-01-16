import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyCntpJydqOQkXsIgTdvkgNDZSU6Hb9pfRM",
  authDomain: "pypiazza.firebaseapp.com",
  databaseURL: "https://pypiazza.firebaseio.com",
  projectId: "pypiazza",
  storageBucket: "pypiazza.appspot.com",
  messagingSenderId: "258737806333",
  appId: "1:258737806333:web:e0ab950690402ddc24d794",
  measurementId: "G-90PWKP70VM"
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();
export default firebase;
