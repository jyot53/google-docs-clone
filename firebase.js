// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyCP9FNbNRYEVCuHGUCc1GQh3-qQUuh_qJI",
    authDomain: "docs-clone-ab183.firebaseapp.com",
    projectId: "docs-clone-ab183",
    storageBucket: "docs-clone-ab183.appspot.com",
    messagingSenderId: "626304056561",
    appId: "1:626304056561:web:730d66f6b445385448bd50",
    measurementId: "G-6H6MXWBP1M"
  };

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore()

export {db};