// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyARTQvb4b8dUXE7MhEk3-CZExNZNy3WzXA",
    authDomain: "maxfinder-3480c.firebaseapp.com",
    projectId: "maxfinder-3480c",
    storageBucket: "maxfinder-3480c.appspot.com",
    messagingSenderId: "445832441762",
    appId: "1:445832441762:web:471ee1eb87307cc6e80cfb",
    measurementId: "G-WP959WMX6E"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});