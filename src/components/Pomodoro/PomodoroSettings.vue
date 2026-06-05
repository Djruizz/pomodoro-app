<script setup lang="ts">
import { ref } from 'vue'

import UiModal from '@/components/Ui/UiModal.vue'
import UiInput from '@/components/Ui/UiInput.vue'
import UiButton from '@/components/Ui/UiButton.vue'

import { useSettingsStore, type PomodoroSettings } from '@/stores/settings'
const settingsStore = useSettingsStore()

const model = defineModel<boolean>({ default: false })
const originalSettings = { ...settingsStore.settings.timer }
const inputErrors = ref<Record<string, string>>({})
const validateInput = (name: keyof PomodoroSettings) => {
  const value = settingsStore.settings.timer[name]

  if (!value || value <= 0) {
    inputErrors.value[name] = 'El valor debe ser mayor a 0'
    return false
  }

  inputErrors.value[name] = ''
  return true
}
const handleCancel = () => {
  settingsStore.settings.timer = { ...originalSettings }
  inputErrors.value = { pomodoro: '', shortBreak: '', longBreak: '', longBreakInterval: '' }
  model.value = false
}

const handleSave = () => {
  const fields: (keyof PomodoroSettings)[] = ['pomodoro', 'shortBreak', 'longBreak']
  let valid = true
  for (const field of fields) {
    if (!validateInput(field)) valid = false
  }
  if (!valid) return

  model.value = false
}
</script>
<template>
  <UiModal v-model="model" size="sm">
    <form class="grid grid-cols-2 gap-4">
      <UiInput
        name="pomodoro"
        v-model="settingsStore.settings.timer.pomodoro"
        label="Pomodoro duration (mins)"
        required
        :error="inputErrors.pomodoro"
        @blur="validateInput('pomodoro')"
      />
      <UiInput
        name="shortBreak"
        v-model="settingsStore.settings.timer.shortBreak"
        type="number"
        label="Short break duration (mins)"
        required
        :error="inputErrors.shortBreak"
        @blur="validateInput('shortBreak')"
      ></UiInput>
      <UiInput
        name="longBreak"
        v-model="settingsStore.settings.timer.longBreak"
        type="text"
        label="Long break duration (mins)"
        class="col-span-2"
        required
        :error="inputErrors.longBreak"
        @blur="validateInput('longBreak')"
      ></UiInput>
    </form>
    <template #footer>
      <UiButton label="Cancel" variant="ghost" @click="handleCancel" />
      <UiButton label="Save" @click="handleSave" />
    </template>
  </UiModal>
</template>
