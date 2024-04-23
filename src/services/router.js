import App from '@/App.vue'
import { accessToken } from '@/utils'
import { createRouter, createWebHistory } from 'vue-router'

import RoutesAuth from '@/views/auth/services/routes'
import RoutesClassroom from '@/views/classroom/services/routes'
import RoutesProfile from '@/views/profile/services/routes'

const routes = [
  {
    path: '',
    name: 'App',
    component: App,
    meta: {
      requiresAuth: true
    },
    redirect: {
      name: 'MyClassroom'
    },
    children: [...RoutesClassroom, ...RoutesAuth, ...RoutesProfile]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/login/login.vue')
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: () => import('@/views/auth/signup/signup.vue')
  },
  {
    path: '/not-found',
    name: 'NotFound',
    component: () => import('@/pages/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  window.scrollTo(0, 0)

  if (!to.name || !router.hasRoute(to.name)) {
    return next({ name: 'NotFound' })
  }

  if (accessToken.value) {
    if (['Login', 'SignUp'].includes(to.name)) {
      return next({ name: 'MyClassroom', query: { type: 'myClassRoom' } })
    }
  } else {
    if (to.name !== 'Login' && to.name !== 'SignUp' && to.name !== 'NotFound') {
      return next({ name: 'Login' })
    }
  }
  next()
})

export default router
