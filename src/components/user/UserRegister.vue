<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-10 col-sm-12 offset-sm-1 offset-md-1">
        <div class="register-container">
          <h2>User Register</h2>
          <form @submit.prevent="handleRegister">
            <div class="form-group mb-3">
              <label for="username">Username</label>
              <input v-model="formData.username" id="username" type="text" class="form-control" required />
            </div>
            <div class="form-group mb-3">
              <label for="password">Password</label>
              <input v-model="formData.password" id="password" type="password" class="form-control" required />
            </div>
            <div class="form-group mb-3">
              <label for="confirmPassword">Confirm Password</label>
              <input v-model="formData.confirmPassword" id="confirmPassword" type="password" class="form-control" required />
            </div>
            <button type="submit" class="btn btn-primary w-50">Register</button>
            <div v-if="error" class="error mt-2">{{ error }}</div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const formData = ref({
  username: '',
  password: '',
  confirmPassword: ''
});

const error = ref('');

function handleRegister() {
  if (!formData.value.username || !formData.value.password || !formData.value.confirmPassword) {
    error.value = 'Please fill out all fields.';
    return;
  }

  if (formData.value.password !== formData.value.confirmPassword) {
    error.value = 'Passwords do not match.';
    return;
  }

  error.value = '';
  alert('Registration successful!');
}
</script>

<style scoped>
.register-container {
  max-width: 500px;
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
