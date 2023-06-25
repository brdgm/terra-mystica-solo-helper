import { RouteRecordRaw } from 'vue-router'
import AppHome from '@/views/AppHome.vue'
import NotFound from '@/views/NotFound.vue'
import SetupGame from '@/views/SetupGame.vue'
import SetupGameAutoma from '@/views/SetupGameAutoma.vue'
import RoundIncome from '@/views/RoundIncome.vue'
import RoundTurn from '@/views/RoundTurn.vue'
import createRouter from 'brdgm-commons/src/util/router/createRouter'

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

export default createRouter(routes, LOCALSTORAGE_KEY, 'AppHome')