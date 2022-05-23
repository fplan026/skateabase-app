import { createRouter, createWebHistory } from 'vue-router';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../components/CreateRentalSession.vue')
  },
  {
    path: '/view',
    name: 'view',
    component: () => import('../components/ListRentalSession.vue')
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: () => import('../components/EditRentalSession.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  base: process.env.BASE_URL,
  routes
})

export default router