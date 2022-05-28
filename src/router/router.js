import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/components/Renter/ListRentalSession.vue')
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('@/components/Renter/CreateRentalSession.vue')
  },
  {
    path: '/view',
    name: 'view',
    component: () => import('@/components/Renter/ListRentalSession.vue')
  },
  {
    path: '/skates',
    name: 'skates',
    component: () => import('@/components/Skate/SkateInventory.vue')
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: () => import('@/components/Renter/EditRentalSession.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  base: process.env.BASE_URL,
  routes
})

export default router