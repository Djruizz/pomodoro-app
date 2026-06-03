<script setup lang="ts">
import SmallTime from '../Widgets/SmallTime.vue'
import TaskCounter from '../Widgets/TaskCounter.vue'
import CurrentProject from '../Projects/CurrentProject.vue'
import SmallPomodoroTimer from '../Widgets/SmallPomodoroTimer.vue'
import { useTimerStore } from '@/stores/pomodoroTimer.ts'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const timerStore = useTimerStore()
const route = useRoute()
const showSmallTimer = computed(() => timerStore.running && route.path != '/pomodoro')
</script>

<template>
  <header
    class="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 flex justify-center px-5 py-3 rounded-2xl"
  >
    <div class="w-full flex justify-between items-center">
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2.5">
          <div class="size-3 rounded-full bg-cyan-400 animate-pulse"></div>
          <span class="text-2xl font-semibold text-zinc-100 tracking-tight">Pomodoro</span>
        </div>
        <CurrentProject />
      </div>
      <div class="flex gap-2">
        <SmallTime class="hidden md:flex" />
        <TaskCounter />
        <SmallPomodoroTimer
          v-if="showSmallTimer"
          @click="$router.push('/pomodoro')"
          class="cursor-pointer"
        />
      </div>
    </div>
  </header>
</template>
