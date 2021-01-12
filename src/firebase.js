import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAV5aoEf2z31vwJecCpX2aE-IVMTCmJu2c",
  authDomain: "whatsapp-clone-12ae7.firebaseapp.com",
  projectId: "whatsapp-clone-12ae7",
  storageBucket: "whatsapp-clone-12ae7.appspot.com",
  messagingSenderId: "244056540504",
  appId: "1:244056540504:web:250ba940abe6ce6664112d",
  measurementId: "G-XC76YM99J8"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;