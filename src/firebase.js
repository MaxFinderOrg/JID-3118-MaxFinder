import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; 
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyARTQvb4b8dUXE7MhEk3-CZExNZNy3WzXA",
    authDomain: "maxfinder-3480c.firebaseapp.com",
    projectId: "maxfinder-3480c",
    storageBucket: "maxfinder-3480c.appspot.com",
    messagingSenderId: "445832441762",
    appId: "1:445832441762:web:471ee1eb87307cc6e80cfb",
    measurementId: "G-WP959WMX6E"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const messaging = getMessaging(app);

getToken(messaging, {
  vapidKey:
    "BMcI_HvBjv3CqFddPSLr09EDyFjj-7ZBUOaiC-O97SBAO81GcvKpIRiyC1nK3Lmvvxr5KLf3vra6MR43q_z7fPY",
})
  .then((currentToken) => {
    if (currentToken) {
      console.log("Firebase Token", currentToken);
    } else {
      // Show permission request UI
      console.log(
        "No registration token available. Request permission to generate one."
      );
      // ...
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
    // ...
  });

onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  // ...
});

function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      } else {
        console.log('Notification permission NOT granted.');
      }
    })
}

requestPermission();
  


const analytics = getAnalytics(app);
const db = getFirestore(app);

export const auth = app.auth()
export default app;
export const dbb = firebase.firestore(app);