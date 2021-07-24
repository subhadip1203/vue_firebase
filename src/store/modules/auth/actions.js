export const signUpAction = async (context, data) => {
  console.log(data);
  try {
    context.commit("SET_FIREBASE_USER_TOKEN", data);
  } catch (err) {
    context.commit("SET_FIREBASE_USER_TOKEN", {});
  }
};
