import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; 
import { getAnalytics } from "firebase/analytics";

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
const analytics = getAnalytics(app);

export const auth = app.auth()
export default app;