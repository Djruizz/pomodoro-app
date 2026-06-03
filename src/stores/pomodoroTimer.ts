import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useSettingsStore } from './settings'
import { useProjectsStore } from './projects'

export type Set = 'pomodoro' | 'shortBreak' | 'longBreak'
const saveProgressDelay = 5
export const useTimerStore = defineStore('timer', () => {
  const settingsStore = useSettingsStore()
  const addProjectProgress = ref(false)
  const projectsStore = useProjectsStore()
  //Timer
  const initialSeconds = ref<number>(settingsStore.settings.pomodoro * 60)
  const duration = ref<number>(initialSeconds.value)

  const formattedTime = computed(() => {
    const hours = Math.floor(duration.value / 3600)
    const minutes = Math.floor((duration.value % 3600) / 60)
    const seconds = duration.value % 60
    if (hours <= 0) {
      return [minutes.toString().padStart(2, '0'), seconds.toString().padStart(2, '0')].join(':')
    }
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0'),
    ].join(':')
  })

  const running = ref<boolean>(false)
  const elapsed = computed<number>(() => initialSeconds.value - duration.value)
  const progress = computed(() => (elapsed.value / initialSeconds.value) * 100)

  let timer: ReturnType<typeof setInterval>
  function startTimer() {
    running.value = true
    timer = setInterval(() => {
      duration.value--
      addProgressToProject()
      if (duration.value <= 0) {
        running.value = false
        clearInterval(timer)
        nextSet()
      }
    }, 1000)
  }

  function addProgressToProject() {
    if (addProjectProgress.value && currentSet.value == 'pomodoro') {
      //Update each second
      projectsStore.currentProject.timeElapsed += 1
      if (elapsed.value % saveProgressDelay == 0) {
        //Save every 5 seconds
        projectsStore.saveProjects(projectsStore.projects)
      }
    }
  }

  function stopTimer() {
    running.value = false
    initialSeconds.value = settingsStore.settings[currentSet.value] * 60
    duration.value = initialSeconds.value
    clearInterval(timer)
  }

  function pauseTimer() {
    running.value = false
    clearInterval(timer)
  }

  function addMinutes(m: number) {
    const minutesToAdd = m * 60
    duration.value += minutesToAdd
    initialSeconds.value += minutesToAdd
  }

  const currentSet = ref<Set>('pomodoro')
  const pomodoroCount = ref<number>(0)

  function selectSet(set: Set) {
    currentSet.value = set
    initialSeconds.value = settingsStore.settings[set] * 60
    duration.value = initialSeconds.value
  }

  function nextSet() {
    if (currentSet.value === 'pomodoro') {
      pomodoroCount.value++
      if (pomodoroCount.value % 4 === 0) {
        selectSet('longBreak')
      } else {
        selectSet('shortBreak')
      }
    } else {
      selectSet('pomodoro')
    }
    startTimer()
  }
  const setColors: Record<Set, string> = {
    pomodoro: '#22d3ee',
    shortBreak: '#34d399',
    longBreak: '#fbbf24',
  }
  const barColor = computed(() => setColors[currentSet.value])

  return {
    addProjectProgress,
    initialSeconds,
    duration,
    formattedTime,
    running,
    elapsed,
    progress,
    startTimer,
    stopTimer,
    pauseTimer,
    addMinutes,
    currentSet,
    pomodoroCount,
    selectSet,
    nextSet,
    barColor,
  }
})
