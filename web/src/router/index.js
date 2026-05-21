import { createRouter, createWebHistory } from 'vue-router'
import { getAccessToken } from '../utils/auth'
import EditProfilePage from '../pages/EditProfilePage.vue'
import LoginPage from '../pages/LoginPage.vue'
import MePage from '../pages/MePage.vue'
import RegisterPage from '../pages/RegisterPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/me',
    name: 'me',
    component: MePage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/profile/edit',
    name: 'profile-edit',
    component: EditProfilePage,
    meta: {
      requiresAuth: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const token = getAccessToken()

  if (to.meta.requiresAuth && !token) {
    return '/login'
  }

  return true
})

export default router
