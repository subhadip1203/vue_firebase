<template>
  <div class="heading">Please enter details to Login</div>
  <div class="loginForm">
    <form>
      <div class="formItems">
        <div class="label">Email</div>
        <input class="inputItem" type="text" />
      </div>
      <div class="formItems">
        <div class="label">Password</div>
        <div class="passDiv">
          <input
            class="inputItem"
            :type="passwordVisible ? 'text' : 'password'"
          />
          <span class="viewPassword" @click="togglePasswordView">
            <IconPasswordToggle />
          </span>
        </div>
      </div>
      <div>
        <button class="submitButton" type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import IconPasswordToggle from "./Icon_passwordToggle.vue";
export default {
  name: "Login",
  components: {
    IconPasswordToggle,
  },
  data() {
    return {
      passwordVisible: false,
    };
  },
  methods: {
    togglePasswordView() {
      this.passwordVisible = !this.passwordVisible;
    },
  },
};
</script>

<style scoped>
.heading {
  display: flex;
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
</style>
