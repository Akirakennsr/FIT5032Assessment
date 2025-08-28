<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-10 col-sm-12 offset-sm-1 offset-md-1">
        <div class="login-container">
          <h2>User Login</h2>
          <form @submit.prevent="handleLogin">
            <div class="row mb-3">
                <div class="form-group mb-6">
                    <label for="username" >Username</label>
                    <input v-model="formData.username" 
                    id="username" type="text" class="form-control" required 
                    @blur="validateName(true)" 
                    @input="validateName(false)"/>
                    <div v-if="errors.username" class="error">{{ errors.username }}</div>
                </div>
                <div class="form-group mb-6">
                    <label for="password">Password</label>
                    <input v-model="formData.password" id="password" type="password" class="form-control" required 
                    @blur="validatePassword(true)"
                    @input="validatePassword(false)"/>
                    <div v-if="errors.password" class="error">{{ errors.password }}</div>
                </div>
            </div>
            <button type="submit" class="btn btn-success w-50">Login</button>
            <div v-if="error" class="error mt-2">{{ error }}</div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import users from '../../data/users.json';

const username = ref('')
const password = ref('')
const error = ref('')
const showPassword = ref(false)

const formData = ref({
    username: '',
    password: ''
})

const errors = ref({
    username: null,
    password: null,
});

function handleLogin() {
    const user = users.find(
        u => u.username === formData.value.username && u.password === formData.value.password
    );

    if (!user) {
        error.value = 'Invalid username or password.';
        return;
    }

    error.value = '';
    alert('Login successful!')
}
const validateName=(blur)=>{
    if(formData.value.username.length < 3){
        if(blur)errors.value.username = "Name must be at least 3 characters";
    } else {
        errors.value.username = null;
    }
}
const validatePassword=(blur)=>{
    const password = formData.value.password;
    
    if (password.length < 8) {
        if (blur) errors.value.password = "Password must be at least 8 characters";
        return;
    }
    
    if (!/[a-z]/.test(password)) {
        if (blur) errors.value.password = "Password must contain at least one lowercase letter";
        return;
    }
    
    if (!/[A-Z]/.test(password)) {
        if (blur) errors.value.password = "Password must contain at least one uppercase letter";
        return;
    }
    
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        if (blur) errors.value.password = "Password must contain at least one special character";
        return;
    }

    errors.value.password = null;
}


</script>

<style scoped>
.login-container {
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
