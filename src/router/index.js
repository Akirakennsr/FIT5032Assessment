import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import AdminPage from '../components/admin/AdminPage.vue'
import UserLogin from '../components/user/UserLogin.vue'
import UserRegister from '../components/user/UserRegister.vue'
import UserProfile from '../components/user/UserProfile.vue'
import AboutUs from '../components/aboutus/AboutUs.vue'
import Mission from '../components/aboutus/Mission.vue'


const routes = [
  { 
    path: '/', 
    component: HomePage 
  },
  { 
    path: '/login', 
    component: UserLogin 
  },
  { 
    path: '/register', 
    component: UserRegister 
  },
  { 
    path: '/profile', 
    component: UserProfile, 
    meta: { role: 'user' } 
  },
  { 
    path: '/admin', 
    component: AdminPage, 
    meta: { role: 'admin' } 
  },
  { 
    path: '/about', 
    component: AboutUs 
  },
  { 
    path: '/mission', 
    component: Mission 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  if (to.meta.role && to.meta.role !== currentUser?.role) {
    next('/login') 
  } else {
    next()
  }
})

export default router