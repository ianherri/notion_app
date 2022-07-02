import { createRouter, createWebHistory } from 'vue-router'
import NotionHome from '../views/NotionHome.vue'
import NotionPage from '../components/NotionPage.vue'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Homeview',
    component: HomeView,
  },
  {
    path: '/pagelist',
    name: 'NotionHome',
    component: NotionHome,
  },
  {
    path: '/pagecontent/:id',
    name: 'NotionPage',
    component: NotionPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

export default router
