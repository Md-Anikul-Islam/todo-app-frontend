<template>
  <div class="hold-transition login-page">
    <div class="login-box">
      <div class="card card-outline card-primary">
        <div class="card-header text-center">
          <a href="/" class="h1"><b>Admin</b></a>
        </div>
        <div class="card-body">
          <p class="login-box-msg">Sign in to start your session</p>
          <form @submit.prevent="adminLogin">
            <div v-if="errors.loginField">
              <div class="alert alert-danger" role="alert">
                <span>{{errors.loginField}}</span>
              </div>

            </div>

            <span class="text-danger" v-if="errors.email">{{errors.email[0]}}</span>
            <div class="input-group mb-3">
              <input type="email" v-model="form.email" class="form-control" placeholder="Email">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-envelope"></span>
                </div>
              </div>
            </div>

            <span class="text-danger" v-if="errors.password">{{errors.password[0]}}</span>
            <div class="input-group mb-3">
              <input type="password" v-model="form.password" class="form-control" placeholder="Password">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>

            <div class="row">

              <div class="col-4">
                <button type="submit" class="btn btn-primary btn-block">Sign In</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import axios from 'axios';
export default {
  name: "LoginPage",
  data(){
    return{
      form:{
        email:null,
        password:null
      },
      errors:{}
    }
  },
  methods:{
    adminLogin(){
      this.$store.dispatch("LOGIN",this.form)
          .then((res) => {
            console.log(res.data)
            this.$router.push({ path: '/dashboard' });
          }).catch((err) => {
        console.log(err.response.data.errors)
        this.errors = err.response.data.errors
      });
    }
  }
}
</script>
<style scoped>
</style>