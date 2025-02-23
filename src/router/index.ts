import { createRouter, createWebHistory } from 'vue-router'
import Confidencialidad from '@/views/confidencialidad.vue'
import Consentimiento from '@/views/consentimiento.vue'
import Register from '@/views/register.vue'
import Login from '@/views/login.vue'
import Principal from '@/views/principal.vue'


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
      path: '/consentimiento',
      name: 'consentimiento',
      component: Consentimiento,
      props: true
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      props: true
    },
    {
      path: '/principal',
      name: 'principal',
      component: Principal,
      props: true
    }
  ]
})

export default router
