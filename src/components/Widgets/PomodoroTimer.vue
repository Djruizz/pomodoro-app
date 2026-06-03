<script setup lang="ts">
import { computed, ref } from 'vue'
import UiButton from '@/components/Ui/UiButton.vue'
import UiCard from '@/components/Ui/UiCard.vue'
import PomodoroSettings from '@/components/Pomodoro/PomodoroSettings.vue'

import { Play, Square, Pause, Settings } from '@lucide/vue'
import { useTimerStore, type Set } from '@/stores/pomodoroTimer'
import UiSwitch from '../Ui/UiSwitch.vue'

const timerStore = useTimerStore()

const openModal = ref(false)
</script>
<template>
  <UiCard>
    <template #right>
      <div class="flex items-center gap-2">
        <UiSwitch
          label="Add time to project"
          v-model="timerStore.addProjectProgress"
          size="sm"
          :disabled="timerStore.running"
        />
        <UiButton :icon="Settings" size="sm" variant="ghost" @click="openModal = true"></UiButton>
      </div>
    </template>
    <div class="flex flex-col gap-6 items-center justify-center h-full py-4">
      <div class="flex gap-1.5">
        <UiButton
          v-if="!timerStore.running"
          label="Focus"
          @click="timerStore.selectSet('pomodoro')"
          size="sm"
          variant="outline"
        />
        <UiButton
          v-if="!timerStore.running"
          label="Short break"
          @click="timerStore.selectSet('shortBreak')"
          size="sm"
          variant="outline"
        />
        <UiButton
          v-if="!timerStore.running"
          label="Long Break"
          @click="timerStore.selectSet('longBreak')"
          size="sm"
          variant="outline"
        />
      </div>

      <p class="text-7xl sm:text-8xl text-zinc-100 font-bold tabular-nums tracking-tight">
        {{ timerStore.formattedTime }}
      </p>

      <div class="w-full max-w-xs bg-zinc-800/50 rounded-full h-1.5 overflow-hidden">
        <div
          class="h-full rounded-full transition-all duration-1000 ease-linear"
          :style="{ width: `${timerStore.progress}%`, backgroundColor: timerStore.barColor }"
        ></div>
      </div>

      <div class="flex gap-1.5" v-show="timerStore.running">
        <UiButton label="+ 15 min" size="sm" variant="ghost" @click="timerStore.addMinutes(15)" />
        <UiButton label="+ 5 min" size="sm" variant="ghost" @click="timerStore.addMinutes(5)" />
        <UiButton label="+ 1 min" size="sm" variant="ghost" @click="timerStore.addMinutes(1)" />
      </div>

      <div class="flex gap-2">
        <UiButton
          v-if="!timerStore.running"
          :icon="Play"
          @click="timerStore.startTimer"
          size="lg"
        />
        <UiButton
          v-if="timerStore.running"
          :icon="Pause"
          @click="timerStore.pauseTimer"
          size="lg"
        />
        <UiButton
          v-if="timerStore.running"
          :icon="Square"
          @click="timerStore.stopTimer"
          size="lg"
          variant="outline"
        />
      </div>
    </div>
    <PomodoroSettings v-model="openModal"></PomodoroSettings>
  </UiCard>
</template>
