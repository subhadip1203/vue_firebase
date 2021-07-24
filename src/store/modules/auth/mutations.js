export const SET_FIREBASE_USER_TOKEN = (state, data) => {
  if (data && data.token && data.user) {
    state.firebase_token = data.token;
    state.firebase_user = data.user;
  }
};
