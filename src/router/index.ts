import { createRouter, createWebHistory } from 'vue-router'
import Confidencialidad from '@/views/confidencialidad.vue'
import Concentimiento from '@/views/concentimiento.vue'
import Register from '@/views/register.vue'
import Login from '@/views/login.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Login,
      props: true
    },
    {
      path: '/confidencialidad',
      name: 'confidencialidad',
      component: Confidencialidad,
      props: true
    },
    {
      path: '/concentimiento',
      name: 'concentimiento',
      component: Concentimiento,
      props: true
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      props: true
    }
  ]
})

export default router
