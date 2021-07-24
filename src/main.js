import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase/app";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDTSrVMt71fy5u73Q9eo1m8MI51LjO0058",
  authDomain: "vue-firebase-a6b5e.firebaseapp.com",
  projectId: "vue-firebase-a6b5e",
  storageBucket: "vue-firebase-a6b5e.appspot.com",
  messagingSenderId: "1084136133554",
  appId: "1:1084136133554:web:3b91efccb470a03e480aab",
  measurementId: "G-ZEMR2PVHJ2",
};
firebase.initializeApp(firebaseConfig);

createApp(App).use(store).use(router).mount("#app");
