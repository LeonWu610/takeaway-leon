import { createRouter, createWebHistory } from 'vue-router'
import TabsView from '@/views/tabs/TabsView.vue'
import HomeView from '@/views/tabs/home/HomeView.vue'
import MeView from '@/views/tabs/me/MeView.vue'
import OrderView from '@/views/tabs/order/OrderView.vue'
import LoginView from '@/views/login/LoginView.vue'
import ShopView from '@/views/shop/ShopView.vue'
import GoodsView from '@/views/goods/GoodsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: 'home'
    },
    {
      path: '/tabs',
      name: 'tabs',
      component: TabsView,
      children: [
        { name: 'home', path: '/home', component: HomeView },
        { name: 'order', path: '/order', component: OrderView },
        { name: 'me', path: '/me', component: MeView }
      ]
    },
    { name: 'login', path: '/login', component: LoginView },
    { name: 'shop', path: '/shop/:id', component: ShopView },
    { name: 'goods', path: '/goods/:id', component: GoodsView }
  ]
})

export default router
