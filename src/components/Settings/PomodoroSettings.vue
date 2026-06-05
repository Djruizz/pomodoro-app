<script setup lang="ts">
import { ref } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import UiCard from '@/components/Ui/UiCard.vue'
import UiInput from '@/components/Ui/UiInput.vue'
import { Timer } from '@lucide/vue'

const settingsStore = useSettingsStore()

type TimerField = 'pomodoro' | 'shortBreak' | 'longBreak' | 'longBreakInterval'
const errors = ref<Record<TimerField, string>>({
  pomodoro: '',
  shortBreak: '',
  longBreak: '',
  longBreakInterval: '',
})

const limits: Record<TimerField, { min: number; max: number }> = {
  pomodoro: { min: 1, max: 120 },
  shortBreak: { min: 1, max: 30 },
  longBreak: { min: 1, max: 60 },
  longBreakInterval: { min: 1, max: 10 },
}

function validate(field: TimerField) {
  const val = settingsStore.settings.timer[field]
  const { min, max } = limits[field]

  if (!val || val < min) {
    settingsStore.settings.timer[field] = min
    errors.value[field] = `Min: ${min}`
    return
  }
  if (val > max) {
    settingsStore.settings.timer[field] = max
    errors.value[field] = `Max: ${max}`
    return
  }
  errors.value[field] = ''
}

function resetErrors() {
  errors.value = { pomodoro: '', shortBreak: '', longBreak: '', longBreakInterval: '' }
}

defineExpose({ resetErrors })
</script>

<template>
  <UiCard title="Pomodoro Settings" :icon="Timer" iconClass="text-cyan-400">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <UiInput
        v-model="settingsStore.settings.timer.pomodoro"
        label="Focus duration (mins)"
        type="number"
        :min="1"
        :max="120"
        :error="errors.pomodoro"
        @blur="validate('pomodoro')"
      />
      <UiInput
        v-model="settingsStore.settings.timer.shortBreak"
        label="Short break (mins)"
        type="number"
        :min="1"
        :max="30"
        :error="errors.shortBreak"
        @blur="validate('shortBreak')"
      />
      <UiInput
        v-model="settingsStore.settings.timer.longBreak"
        label="Long break (mins)"
        type="number"
        :min="1"
        :max="60"
        :error="errors.longBreak"
        @blur="validate('longBreak')"
      />
      <UiInput
        v-model="settingsStore.settings.timer.longBreakInterval"
        label="Pomodoros before long break"
        type="number"
        :min="1"
        :max="10"
        :error="errors.longBreakInterval"
        @blur="validate('longBreakInterval')"
      />
    </div>
  </UiCard>
</template>
