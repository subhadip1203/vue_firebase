<template>
  <div class="container">
    <div class="halfWidth">
      <div class="company">Company Name</div>
      <div class="heading">
        <div
          :class="authActive === 'login' ? 'activeDiv' : 'inactiveDiv'"
          @click="changeAuthType('login')"
        >
          LOGIN
        </div>
        <div
          :class="authActive === 'login' ? 'inactiveDiv' : 'activeDiv'"
          @click="changeAuthType('signup')"
        >
          SIGNUP
        </div>
      </div>
      <div class="login-or-signup" v-if="authActive === 'login'"><Login /></div>
      <div class="login-or-signup" v-else><Signup /></div>
    </div>
  </div>
</template>

<script>
import Login from "@/components/auth/login.vue";
import Signup from "@/components/auth/signup.vue";
export default {
  name: "Auth",
  components: {
    Login,
    Signup,
  },
  data() {
    return {
      authActive: "login",
    };
  },
  methods: {
    changeAuthType(type) {
      this.authActive = type;
    },
  },
};
</script>

<style lang="css" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 50px;
  background-color: #cccccc;
}
.halfWidth {
  width: 50%;
  height: fit-content;
  background-color: white;
}
.company {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 100%;
  border-bottom: 1px solid grey;
  background-color: azure;
}
.heading {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 40px;
  cursor: pointer;
}
.inactiveDiv {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: grey;
  color: white;
  width: 50%;
  height: 40px;
  /* border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px; */
}

.activeDiv {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 50%;
  height: 40px;
}
</style>
