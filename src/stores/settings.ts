import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export type PomodoroSettings = {
  pomodoro: number
  shortBreak: number
  longBreak: number
  longBreakInterval: number
}

export type AudioSettings = {
  volume: number
  muted: boolean
  alertSound: string
}

export type BehaviorSettings = {
  autoStartBreaks: boolean
  autoStartPomodoros: boolean
  defaultAddProject: boolean
}

export type ColorSettings = {
  pomodoro: string
  shortBreak: string
  longBreak: string
}

export type AppSettings = {
  timer: PomodoroSettings
  audio: AudioSettings
  behavior: BehaviorSettings
  colors: ColorSettings
}

const STORAGE_KEY = 'pomodoro-settings'

function getDefaultSettings(): AppSettings {
  return {
    timer: { pomodoro: 25, shortBreak: 5, longBreak: 15, longBreakInterval: 4 },
    audio: { volume: 0.5, muted: false, alertSound: 'PomodoroEnd.mp3' },
    behavior: { autoStartBreaks: true, autoStartPomodoros: false, defaultAddProject: false },
    colors: { pomodoro: '#22d3ee', shortBreak: '#34d399', longBreak: '#fbbf24' },
  }
}

function loadSettings(): AppSettings {
  const defaults = getDefaultSettings()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      return {
        timer: { ...defaults.timer, ...parsed.timer },
        audio: { ...defaults.audio, ...parsed.audio },
        behavior: { ...defaults.behavior, ...parsed.behavior },
        colors: { ...defaults.colors, ...parsed.colors },
      }
    }
  } catch {}
  return defaults
}

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<AppSettings>(loadSettings())

  watch(
    settings,
    (val) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
    },
    { deep: true },
  )

  function resetSettings() {
    settings.value = getDefaultSettings()
  }

  return {
    settings,
    resetSettings,
  }
})
