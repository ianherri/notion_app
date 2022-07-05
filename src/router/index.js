import { createRouter, createWebHistory } from 'vue-router'
import PageList from '../views/PageList.vue'
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
    name: 'PageList',
    component: PageList,
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
