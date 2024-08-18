import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '../views/WelcomeView.vue'
import { ROUTES } from '../utils/constants'

/*
 * dont forget to edit requiresAuth
 ! I forgot
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES.LANDING,
      name: 'Landing',
      component: WelcomeView,
      meta: {
        requiresAuth: false,
        showNavBar: false
      }
    },
    {
      path: ROUTES.ABOUT,
      name: 'About',
      component: () => import('../views/AboutView.vue'),
      meta: {
        requiresAuth: true,
        showNavBar: true
      }
    },
    {
      path: ROUTES.HOME,
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        requiresAuth: true,
        showNavBar: true
      }
    },
    {
      path: ROUTES.LOGIN,
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        requiresAuth: false,
        showNavBar: false
      }
    },
    {
      path: ROUTES.REGISTER,
      name: 'Register',
      component: () => import('../views/SignUpView.vue'),
      meta: {
        requiresAuth: false,
        showNavBar: false
      }
    },
    {
      path: ROUTES.TASKS,
      name: 'Tasks',
      component: () => import('../views/ToDoListView.vue'),
      meta: {
        requiresAuth: true,
        showNavBar: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.matched.some((record) => record.meta.requiresAuth) && !token) {
    localStorage.setItem('lastRoute', to.fullPath)
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
