<template>
  <div class="hold-transition login-page">
    <div class="login-box">
      <div class="card card-outline card-primary">
        <div class="card-header text-center">
          <a href="" class="h1"><b>Admin</b></a>
        </div>
        <div class="card-body">
          <p class="login-box-msg">Sign UP</p>

          <!-- General error message -->
          <div v-if="errorMessage" class="alert alert-danger">
            {{ errorMessage }}
          </div>

          <form @submit.prevent="adminRegister">
            <!-- Name Field -->
            <span class="text-danger" v-if="hasError('name')">
              {{ getFirstError('name') }}
            </span>
            <div class="input-group mb-3">
              <input type="text" v-model="form.name" class="form-control" placeholder="Name">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-user"></span>
                </div>
              </div>
            </div>

            <!-- Email Field -->
            <span class="text-danger" v-if="hasError('email')">
              {{ getFirstError('email') }}
            </span>
            <div class="input-group mb-3">
              <input type="email" v-model="form.email" class="form-control" placeholder="Email">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-envelope"></span>
                </div>
              </div>
            </div>

            <!-- Phone Field -->
            <span class="text-danger" v-if="hasError('phone')">
              {{ getFirstError('phone') }}
            </span>
            <div class="input-group mb-3">
              <input type="text" v-model="form.phone" class="form-control" placeholder="Phone">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-phone"></span>
                </div>
              </div>
            </div>

            <!-- Password Field -->
            <span class="text-danger" v-if="hasError('password')">
              {{ getFirstError('password') }}
            </span>
            <div class="input-group mb-3">
              <input type="password" v-model="form.password" class="form-control" placeholder="Password">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>

            <!-- Confirm Password Field -->
            <span class="text-danger" v-if="hasError('password_confirmation')">
              {{ getFirstError('password_confirmation') }}
            </span>
            <div class="input-group mb-3">
              <input type="password" v-model="form.password_confirmation" class="form-control" placeholder="Confirm Password">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-8">
                <div class="icheck-primary">
                  <input type="checkbox" id="remember">
                  <label for="remember">Remember Me</label>
                </div>
              </div>
              <div class="col-4">
                <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
                  <span v-if="loading" class="spinner-border spinner-border-sm"></span>
                  {{ loading ? 'Processing...' : 'Sign Up' }}
                </button>
              </div>
            </div>
          </form>

          <p class="mb-0">
            <router-link to="/" class="text-center">Have a Account Login</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterPage",
  data() {
    return {
      form: {
        name: '',
        phone: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      errors: {},
      loading: false,
      errorMessage: ''
    };
  },
  methods: {
    hasError(field) {
      return this.errors && this.errors[field] && this.errors[field].length > 0;
    },
    getFirstError(field) {
      return this.errors[field][0];
    },
    adminRegister() {
      this.loading = true;
      this.errorMessage = '';
      this.errors = {};

      this.$store.dispatch("REGISTRATION", this.form)
          .then(() => {  // Removed unused 'res' parameter
            this.$router.push({ path: '/dashboard' });
          })
          .catch((err) => {
            if (err.response) {
              if (err.response.data && err.response.data.errors) {
                this.errors = err.response.data.errors;
              } else if (err.response.data && err.response.data.message) {
                this.errorMessage = err.response.data.message;
              } else {
                this.errorMessage = 'Registration failed. Please try again.';
              }
            } else {
              this.errorMessage = 'Network error. Please check your connection.';
            }
          })
          .finally(() => {
            this.loading = false;
          });
    }
  }
};
</script>