import VueRouter from 'vue-router'
import Vue from 'vue'

import Login from '@/view/Login/Login'
import Student from '@/view/Student/Student'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/student/statistics'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/student',
    redirect: '/student/statistics',
    component: Student,
    meta: {
      requireLogin: true
    },
    children: [
      {
        path: 'statistics',
        component: () => import('@/view/Student/StudentStat/StudentStat'),
        meta: {
          requireLogin: true
        }
      },
      {
        path: 'list',
        component: () => import('@/view/Student/StudentList/StudentList'),
        meta: {
          requireLogin: true
        }
      },
      {
        path: 'list/:college',
        component: () => import('@/view/Student/StudentList/StudentList'),
        meta: {
          requireLogin: true
        }
      },
      {
        path: 'add',
        component: () => import('@/view/Student/addStudent/addStudent'),
        meta: {
          requireLogin: true
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
