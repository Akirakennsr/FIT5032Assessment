<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-10 col-sm-12 offset-sm-1 offset-md-1">
        <div class="register-container">
          <h2>User Register</h2>
          <form @submit.prevent="handleRegister">
            <div class="form-group mb-3">
                <label for="username">Username</label>
                <input v-model="formData.username" id="username" type="text" class="form-control" required 
                @blur="validateName(true)"
                @input="validateName(false)" />
                <div v-if="errors.username" class="error">{{ errors.username }}</div>
            </div>
            <div class="form-group mb-3">
                <label for="password">Password</label>
                <input v-model="formData.password" id="password" type="password" class="form-control" required 
                @blur="validatePassword(true)"
                @input="validatePassword(false)" />
                <div v-if="errors.password" class="error">{{ errors.password }}</div>
            </div>
            <div class="form-group mb-3">
                <label for="confirmPassword">Confirm Password</label>
                <input v-model="formData.confirmPassword" id="confirmPassword" type="password" class="form-control" required />
            </div>
            <div class="form-group mb-3">
                <label for="email">Email</label>
                <input v-model="formData.email" id="email" type="email" class="form-control" required 
                @blur="validateEmail(true)"
                @input="validateEmail(false)" />
                <div v-if="errors.email" class="error">{{ errors.email }}</div>
            </div>
            <div class="form-group mb-3">
                <label for="phone">Phone</label>
                <input v-model="formData.phone" id="phone" type="text" class="form-control" required 
                @blur="validatePhone(true)"
                @input="validatePhone(false)" />
                <div v-if="errors.phone" class="error">{{ errors.phone }}</div>
            </div>
            <button type="submit" class="btn btn-primary w-50">Register</button>
          </form>

          <div v-if="submitRegister.length" class="row mt-4">
            <DataTable :value="submitRegister" stripedRows class="p-datatable">
              <Column field="username" header="Username"></Column>
              <Column field="password" header="Password"></Column>
              <Column field="email" header="Email"></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import DataTable  from 'primevue/datatable';
import Column from 'primevue/column';
const submitRegister = ref([]);

const formData = ref({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: ''
});

const errors = ref({
    username: null,
    password: null,
    email: null,
    phone: null
});

function validateName(blur) {
    if (formData.value.username.length < 3) {
        if (blur) errors.value.username = "Name must be at least 3 characters";
    } else {
        errors.value.username = null;
    }
}

function validatePassword(blur) {
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

function validateEmail(blur) {
    const email = formData.value.email;
    if (!email.includes('@')) {
        if (blur) errors.value.email = "Email must contain '@'";
        return;
    }
    const parts = email.split('@');
    if (parts.length !== 2 || parts[1].length === 0) {
        if (blur) errors.value.email = "Email must have a domain after '@'";
        return;
    }
    if (!parts[1].includes('.')) {
        if (blur) errors.value.email = "Email domain must contain a '.'";
        return;
    }
    const domainParts = parts[1].split('.');
    if (domainParts[domainParts.length - 1].length === 0) {
        if (blur) errors.value.email = "Email domain must not end with a '.'";
        return;
    }
    errors.value.email = null; 
}

function validatePhone(blur) {
    const phone = formData.value.phone;
    if (phone.startsWith('+61')) {
        if (phone.length !== 12 || isNaN(phone.slice(3))) {
            if (blur) errors.value.phone = "Please enter a valid Australian phone number (e.g., +61412345678)";
            return;
        }
    } 
    else if (phone.startsWith('0')) {
        if (phone.length !== 10 || isNaN(phone.slice(1))) {
            if (blur) errors.value.phone = "Please enter a valid Australian phone number (e.g., 0412345678)";
            return;
        }
  } 
    else {
        if (blur) errors.value.phone = "Please enter a valid Australian phone number (e.g., +61412345678 or 0412345678)";
        return;
    }
    errors.value.phone = null; 
}

const handleRegister = () => {
    validateName(true);
    validatePassword(true);
    validateEmail(true);
    validatePhone(true);

    if (!errors.value.username && !errors.value.password && !errors.value.email && !errors.value.phone) {
        submitRegister.value.push({ 
            ...formData.value,
            id: Date.now(),
            submittedAt: new Date().toISOString()
        });
        clearForm();
    }

}

const clearForm = () => {
    formData.value = {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: ''
    };
};

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

.card {
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
    background-color: #275FDA;
    color: white;
    padding: 10px;
    border-radius: 10px 10px 0 0;
}
.list-group-item {
    padding: 10px;
}

:deep(.p-datatable) {
    border-radius: 8px;
    overflow: hidden;
}

:deep(.p-datatable-header) {
    background-color: #f8f9fa;
    border-bottom: 2px solid #dee2e6;
}

:deep(.p-datatable thead th) {
    background-color: #678dde;
    color: white;
    font-weight: 600;
}
</style>
