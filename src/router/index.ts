import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/index.vue'
import pomodoro from '@/pages/pomodoro.vue'
import projects from '@/pages/projects.vue'
import projectView from '@/pages/projects/projectView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/pomodoro',
      name: 'pomodoro',
      component: pomodoro,
    },
    {
      path: '/projects',
      name: 'projects',
      component: projects,
      children: [
        {
          path: ':id',
          name: 'project',
          component: projectView,
          props: true,
        },
      ],
    },
  ],
})

export default router
