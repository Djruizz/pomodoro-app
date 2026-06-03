import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export type Project = {
  id: number
  name: string
  description?: string
  timeElapsed: number
  color: string
  createdAt: number
  notes?: string
}

const PROJECT_COLORS = ['#10b981', '#f59e0b', '#f43f5e', '#8b5cf6', '#f97316', '#0ea5e9', '#84cc16']

const STORAGE_KEY = 'projects'
const CURRENT_PROJECT_KEY = 'current-project'
const globalProject: Project = {
  id: 1,
  name: 'Global',
  description: 'All created tasks',
  timeElapsed: 0,
  color: '#00d3f2',
  createdAt: Date.now(),
  notes: '',
}

function loadProjects(): Project[] {
  const defaults: Project[] = [globalProject]
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const saved: Project[] = JSON.parse(raw)
      const hasGlobal = saved.some((p) => p.id === 1)
      return hasGlobal ? saved : [...defaults, ...saved]
    }
  } catch {}
  return defaults
}
function loadCurrentProject(): number {
  const defaults: number = globalProject.id

  try {
    const raw = localStorage.getItem(CURRENT_PROJECT_KEY)
    if (raw) {
      return JSON.parse(raw)
    }
  } catch {}
  return defaults
}

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Project[]>(loadProjects())
  const currentProjectId = ref<number>(loadCurrentProject())

  const currentProject = computed<Project>(
    () => projects.value.find((p) => p.id === currentProjectId.value) || globalProject,
  )

  function setCurrentProject(id: number) {
    currentProjectId.value = id
    saveProjects(projects.value)
  }

  function createProject(project: Partial<Project>) {
    projects.value.push({
      id: Date.now(),
      name: '',
      timeElapsed: 0,
      color: PROJECT_COLORS[Math.floor(Math.random() * PROJECT_COLORS.length)]!,
      createdAt: Date.now(),
      ...project,
    })
    saveProjects(projects.value)
  }

  function saveProjects(projects: Project[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
    localStorage.setItem(CURRENT_PROJECT_KEY, JSON.stringify(currentProjectId.value))
  }

  function deleteProject(id: number) {
    if (id === 0) return
    projects.value = projects.value.filter((p) => p.id !== id)
    currentProjectId.value = 1
    saveProjects(projects.value)
  }

  function updateProject(id: number, updates: Partial<Project>) {
    const project = projects.value.find((p) => p.id === id)
    if (project) {
      Object.assign(project, updates)
    }
    saveProjects(projects.value)
  }

  function getProjectById(id: number) {
    return projects.value.find((p) => p.id === id)
  }

  const totalProjects = computed(() => projects.value.length)

  const totalTimeElapsed = computed(() => projects.value.reduce((acc, p) => acc + p.timeElapsed, 0))

  return {
    projects,
    currentProjectId,
    currentProject,
    setCurrentProject,
    saveProjects,
    createProject,
    deleteProject,
    updateProject,
    getProjectById,
    totalProjects,
    totalTimeElapsed,
  }
})
