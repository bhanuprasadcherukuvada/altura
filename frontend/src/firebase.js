import * as firebase from 'firebase'


const firebaseConfig = {
  apiKey: "AIzaSyDy4dBqe5-XDwx1foDZS_KPFp-xwS_9GzI",
  authDomain: "coding-events-nmit.firebaseapp.com",
  databaseURL: "https://coding-events-nmit-default-rtdb.firebaseio.com",
  projectId: "coding-events-nmit",
  storageBucket: "coding-events-nmit.appspot.com",
  messagingSenderId: "673801774047",
  appId: "1:673801774047:web:f256c8a6b34d1eccfe9a6a",
  measurementId: "G-LPGTT2JPKW",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();