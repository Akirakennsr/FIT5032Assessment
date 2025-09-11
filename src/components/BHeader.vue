<script setup>
import { ref } from 'vue'
import { isAuthenticated, logout } from '../auth';
import { useRouter } from 'vue-router'

const router = useRouter()

const navItems = [
  {
    name: 'home', label: 'Home', color: '#0f7be0', subs: []
  },
  {
    name: 'about', label: 'About Us', color: '#0f7be0', subs: [
      { name: 'mission', label: 'Mission & Vision', }, 
      { name: 'team', label: 'Our Team & Board',  },
      { name: 'partners', label: 'Our Partners',  },
      { name: 'annual', label: 'Annual Report & Research',  },
    ]
  },
  {
    name: 'login', label: 'Login', color: '#0f7be0', subs: [
      { name: 'register', label: 'Register' },
    ], right: true
  },
]

const currentMain = defineModel('currentMain')
const currentSub = defineModel('currentSub')
const hoverNav = ref(null)

function selectMain(name) {
  currentMain.value = name
  currentSub.value = ''

  if (name === 'home') router.push('/')
  else if (name === 'about') router.push('/about')
  else if (name === 'login') router.push('/login')
}
function selectSub(main, sub) {
  currentMain.value = main
  currentSub.value = sub
  if (main === 'about') {
    if (sub === 'mission') router.push('/mission')
  }
  if (main === 'login' && sub === 'register') router.push('/register')
}

const handleLogout = () => {
  logout();
  currentMain.value = 'login';
  currentSub.value = '';
  router.push('/login')
};

function goProfile() {
  if (!isAuthenticated.value) {
    router.push('/login');
    return;
  }
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (user?.role === 'admin') {
    router.push('/admin');
  } else if (user?.role === 'user') {
    router.push('/user');
  } else {
    router.push('/profile');
  }
}
</script>

<template>
  <nav class="main-nav">
    <ul>
      <li
        v-for="item in navItems"
        :key="item.name"
        :style="{background: currentMain === item.name ? item.color : ''}"
        @mouseenter="hoverNav = item.name"
        @mouseleave="hoverNav = null"
        @click="selectMain(item.name)"
        :class="[{active: currentMain === item.name}, item.right ? 'right-nav' : '']"
      >
        {{ item.label }}
        <!-- sub nav -->
        <ul v-if="item.subs.length && hoverNav === item.name" class="sub-nav"
            :style="{
            left: item.right ? 'auto' : '0',
             right: item.right ? '0' : 'auto'
            }">
          <li
            v-for="sub in item.subs"
            :key="sub.name"
            @click.stop="selectSub(item.name, sub.name)"
            :class="{active: currentSub === sub.name && currentMain === item.name}"
          >
            {{ sub.label }}
          </li>
        </ul>
      </li>
      <li class="profile-nav">
        <button class="profile-btn" @click="goProfile" title="Profile">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M16 20v-2a4 4 0 0 0-8 0v2"/></svg>
        </button>
      </li>
    </ul>
  </nav>
  <div class="text-end me-4 mt-2">
    <button v-if="isAuthenticated" class="btn btn-outline-danger btn-sm" @click="handleLogout">Logout</button>
  </div>
</template>

<style scoped>
/* main nav */
.main-nav {
  background: #18bae7;
  padding: 0 20px;
}
.main-nav ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}
.main-nav li {
  color: #fff;
  padding: 16px 24px;
  cursor: pointer;
  font-size: 18px;
  transition: background 0.2s;
  position: relative;
  user-select: none;
}
.main-nav li.active, .main-nav li:hover {
  filter: brightness(0.95);
  background: #62b6cb;
  color: #e0f0fa;
}
.right-nav {
  margin-left: auto;
}
/* sub nav */
.sub-nav {
  position: absolute;
  top: 100%;
  left: 0;
    display: flex;
  background: #fff;
  min-width: 200px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  z-index: 10;
  padding: 0;
  margin: 0;
    transition: all 0.3s ease;
}
.sub-nav li {
    flex: none;
    width: 200px;
    text-align: center;
  color: #333;
  background: #f7f7f7;
  padding: 16px 0px;
  font-size: 16px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  transition: background 0.2s;
}
.sub-nav li:last-child {
  border-bottom: none;
}
.sub-nav li.active, .sub-nav li:hover {
  background: #e0f0fa;
  color: #0f7be0;
}
.profile-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-top: 0;
  padding-bottom: 0;
  padding: 0 4px;
}
.profile-btn svg {
  color: #0f7be0;
  transition: color 0.2s;
  width: 36px;
  height: 36px;
  margin-top: -4px;
  margin-bottom: -4px;
}
.profile-btn:hover svg {
  color: #bee9e8;
}
.profile-nav {
  display: flex;
  align-items: center;
  margin-left: 8px;
  padding-top: 0;
  padding-bottom: 0;
  margin-top: 0;
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .sub-nav {
    flex-direction: column; 
    width: 100%; 
  }
  .sub-nav li {
    width: 100%;
    text-align: left;
    padding-left: 16px;
  }
}
</style>
