<script setup lang="ts">
import { useTimerStore } from '@/stores/pomodoroTimer'
import { Clock } from '@lucide/vue'

const timerStore = useTimerStore()
</script>
<template>
  <div
    class="px-3 py-1.5 rounded-full text-zinc-300 flex items-center gap-2 text-sm tabular-nums border transition-all duration-200 ease-linear"
    :style="{
      borderColor: timerStore.barColor,
      color: timerStore.barColor,
      backgroundColor: `${timerStore.barColor}20`,
    }"
  >
    <Clock class="size-3.5" />
    <span>{{ timerStore.formattedTime }}</span>
  </div>
</template>
