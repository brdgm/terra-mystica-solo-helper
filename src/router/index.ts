import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import AppHome from '@/views/AppHome.vue'
import NotFound from '@/views/NotFound.vue'
import SetupGame from '@/views/SetupGame.vue'
import SetupGameAutoma from '@/views/SetupGameAutoma.vue'
import RoundIncome from '@/views/RoundIncome.vue'
import RoundTurn from '@/views/RoundTurn.vue'

const LOCALSTORAGE_KEY = process.env.VUE_APP_LOCALSTORAGE_KEY_PREFIX + "route"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'AppHome',
    component: AppHome
  },
  {
    path: '/setupGame',
    name: 'SetupGame',
    component: SetupGame
  },
  {
    path: '/setupGameAutoma',
    name: 'SetupGameAutoma',
    component: SetupGameAutoma
  },
  {
    path: '/round/:round/income',
    name: 'RoundIncome',
    component: RoundIncome
  },
  {
    path: '/round/:round/turn/:turn',
    name: 'RoundTurn',
    component: RoundTurn
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// store last used route path in local storage
router.afterEach(to => {
  localStorage.setItem(LOCALSTORAGE_KEY, to.fullPath)
})
// redirect to lase used route path
let isFirstTransition = true
router.beforeEach((to, _from, next) => {
  const lastRouteFullPath = localStorage.getItem(LOCALSTORAGE_KEY)
  if (to.name === "Home" && lastRouteFullPath && isFirstTransition) next(lastRouteFullPath)
  else next()
  isFirstTransition = false
})

export default router
