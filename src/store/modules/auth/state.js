export default {
  firebase_token: localStorage.getItem("firebase_token") || null,
  firebase_user: localStorage.getItem("firebase_user")
    ? JSON.parse(localStorage.getItem("firebase_user"))
    : null,
};
