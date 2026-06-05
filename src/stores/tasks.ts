import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export type Task = {
  id: number
  title: string
  description?: string
  status: 'complete' | 'in_progress' | 'paused' | 'pending'
  duration?: number
  projectId?: number
  date?: string
}
const TASK_STORAGE_KEY = 'tasks'

function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(TASK_STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {
    console.error(e)
  }
  return []
}

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>(loadTasks())

  function saveTasks(tasks: Task[]) {
    localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks))
  }

  function createTask(task: Partial<Task>) {
    tasks.value.push({
      id: Date.now(),
      title: '',
      status: 'pending',
      duration: 0,
      ...task,
    })
    saveTasks(tasks.value)
  }
  function updateTask(id: number, updates: Partial<Task>) {
    const task = tasks.value.find((t) => t.id === id)
    if (task) Object.assign(task, updates)
    saveTasks(tasks.value)
  }

  function setStatus(id: number, status: Task['status']) {
    const task = tasks.value.find((task) => task.id === id)

    if (task) {
      task.status = status
    }
    saveTasks(tasks.value)
  }

  function deleteTask(id: number) {
    if (!id) return
    tasks.value = tasks.value.filter((t) => t.id != id)
    saveTasks(tasks.value)
  }

  function getTaskById(id: number): Task | undefined {
    return tasks.value.find((t) => t.id === id)
  }

  return {
    tasks,
    createTask,
    updateTask,
    setStatus,
    deleteTask,
    getTaskById,
  }
})
