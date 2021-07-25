<template>
  <div class="heading">
    Please enter details to Login
    <span style="color: red">{{ form.errors.message }}</span>
  </div>
  <div class="loginForm">
    <form @submit.prevent="onFormSubmit">
      <div class="formItems">
        <div class="label">Email</div>
        <input class="inputItem" type="email" v-model="form.data.email" />
        <span class="fileError">{{ form.errors.email }}</span>
      </div>
      <div class="formItems">
        <div class="label">Password</div>
        <div class="passDiv">
          <input
            class="inputItem"
            :type="passwordVisible ? 'text' : 'password'"
            v-model="form.data.password"
          />
          <span class="viewPassword" @click="togglePasswordView">
            <IconPasswordToggle />
          </span>
        </div>
        <span class="fileError">{{ form.errors.password }}</span>
      </div>
      <div v-if="!form.loading">
        <input class="submitButton" type="submit" value="Submit" />
      </div>
      <div v-else>
        <button class="submitButton"><IconLoading /></button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import IconPasswordToggle from "@/components/icons/Icon_passwordToggle.vue";
import IconLoading from "@/components/icons/Icon_loading.vue";

import { mapActions } from "vuex";

export default {
  name: "Login",
  components: {
    IconPasswordToggle,
    IconLoading,
  },
  data() {
    return {
      passwordVisible: false,
      form: {
        data: {
          email: "",
          password: "",
        },
        errors: {},
        loading: false,
      },
    };
  },
  methods: {
    togglePasswordView() {
      this.passwordVisible = !this.passwordVisible;
    },
    validEmail(email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    async onFormSubmit() {
      console.log("clicked");
      try {
        this.form.errors = {};
        this.form.loading = false;

        if (!this.form.data.email) {
          this.form.errors = { ...this.form.errors, email: "Email required." };
        } else if (!this.validEmail(this.form.data.email)) {
          this.form.errors = {
            ...this.form.errors,
            email: "Valid email required.",
          };
        }
        if (!this.form.data.password) {
          this.form.errors = {
            ...this.form.errors,
            password: "Password required.",
          };
        } else if (
          this.form.data.password.length < 6 ||
          this.form.data.password.length > 12
        ) {
          this.form.errors = {
            ...this.form.errors,
            password: "Password should be 6 to 12 characters long.",
          };
        }

        if (Object.keys(this.form.errors).length == 0) {
          this.form.loading = true;
          const userData = await firebase
            .auth()
            .signInWithEmailAndPassword(
              this.form.data.email,
              this.form.data.password
            );

          const firebase_token = await firebase
            .auth()
            .currentUser.getIdToken(true);

          this.form.loading = false;
          const firebase_user_token = {
            user: {
              email: userData.user.email,
              uid: userData.user.uid,
              isNewUser: userData.additionalUserInfo.isNewUser,
              emailVerified: userData.user.emailVerified,
            },
            token: {
              idToken: firebase_token,
              refreshToken: userData.user.refreshToken,
            },
          };
          this.loginAction(firebase_user_token);
        }
      } catch (err) {
        this.form.loading = false;
        if (
          err.message ===
          "There is no user record corresponding to this identifier. The user may have been deleted."
        ) {
          this.form.errors = {
            ...this.form.errors,
            message: "Email or password is wrong",
          };
        } else {
          this.form.errors = { ...this.form.errors, message: err.message };
        }
      }
    },
    ...mapActions({
      loginAction: "auth/signUpAction",
    }),
  },
};
</script>

<style scoped>
.heading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #e4e4e4;
}
.loginForm {
  width: 100%;
}
.formele {
  padding: 20px;
}
.formItems {
  display: flex;
  flex-direction: column;
  height: 60px;
  padding: 10px;
}

.label {
  text-align: left;
  margin-bottom: 6px;
}
.inputItem {
  width: 98%;
  height: 30px;
  font-size: 18px;
}
.passDiv {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.viewPassword {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -30px;
}
.submitButton {
  width: 40%;
  height: 30px;
  float: right;
  color: white;
  background-color: #50b050;
  border: 2px solid #50b050;
  margin: 10px;
  cursor: pointer;
}
.fileError {
  color: red;
  font-size: 13px;
}
</style>
