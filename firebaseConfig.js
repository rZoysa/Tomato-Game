import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAPN-4Qg0mPss_ZuZX-lLCmMoSznXZTJpI",
    authDomain: "tomato-game-d78b8.firebaseapp.com",
    databaseURL: "https://tomato-game-d78b8-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "tomato-game-d78b8",
    storageBucket: "tomato-game-d78b8.appspot.com",
    messagingSenderId: "361506034708",
    appId: "1:361506034708:web:4590ee75c2686bb7854301",
    measurementId: "G-KGBCSHVLVZ"
  };

const app = initializeApp(firebaseConfig);

export { app }; 
