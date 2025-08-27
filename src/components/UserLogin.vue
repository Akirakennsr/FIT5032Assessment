<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 col-sm-10 offset-sm-1 offset-md-2">
        <div class="login-container">
          <h2>User Login</h2>
          <form @submit.prevent="handleLogin">
            <div class="form-group mb-3">
              <label for="username">Username</label>
              <input v-model="username" id="username" type="text" class="form-control" required />
            </div>
            <div class="form-group mb-3">
              <label for="password">Password</label>
              <input v-model="password" id="password" type="password" class="form-control" required />
            </div>
            <button type="submit" class="btn btn-success w-100">Login</button>
            <div v-if="error" class="error mt-2">{{ error }}</div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const error = ref('')

function handleLogin() {
  if (!username.value || !password.value) {
    error.value = 'Please enter your username and password.';
    return;
  }

  error.value = ''
  alert('Login successful!')
}
</script>

<style scoped>
.login-container {
  max-width: 350px;
  margin: 40px auto;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.form-group {
  margin-bottom: 16px;
}
label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
}
input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 10px;
  background: #18bae7;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}
button:hover {
  background: #0f7be0;
}
.error {
  color: #e74c3c;
  margin-top: 10px;
  text-align: center;
}
</style>
