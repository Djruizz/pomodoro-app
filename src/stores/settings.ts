import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export type PomodoroSettings = {
  pomodoro: number
  shortBreak: number
  longBreak: number
}

const STORAGE_KEY = 'pomodoro-settings'

function loadSettings(): PomodoroSettings {
  const defaults: PomodoroSettings = { pomodoro: 25, shortBreak: 5, longBreak: 15 }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...defaults, ...JSON.parse(raw) }
  } catch {}
  return defaults
}

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<PomodoroSettings>(loadSettings())

  //Pomodoro Sets

  //
  function saveSettings(s: PomodoroSettings) {
    settings.value = s
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
  }

  return {
    settings,
    saveSettings,
  }
})
