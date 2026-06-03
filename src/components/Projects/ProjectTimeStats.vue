<script setup lang="ts">
import type { Project } from '@/stores/projects'
import UiCard from '@/components/Ui/UiCard.vue'
import { Clock, Timer } from '@lucide/vue'

defineProps<{
  project: Project
}>()

const formatTime = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  if (hrs > 0) return `${hrs}h ${mins}m`
  return `${mins}m`
}

const formatTimeDetailed = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  return { hrs, mins, secs }
}
</script>

<template>
  <UiCard :icon="Timer" icon-class="text-cyan-500" title="Time Focused">
    <div class="flex items-baseline gap-1">
      <span class="text-4xl font-bold text-zinc-100 tabular-nums">
        {{ formatTimeDetailed(project.timeElapsed).hrs }}
      </span>
      <span class="text-lg text-zinc-500">h</span>
      <span class="text-4xl font-bold text-zinc-100 tabular-nums ml-2">
        {{ formatTimeDetailed(project.timeElapsed).mins }}
      </span>
      <span class="text-lg text-zinc-500">m</span>
      <span class="text-4xl font-bold text-zinc-100 tabular-nums ml-2">
        {{ formatTimeDetailed(project.timeElapsed).secs }}
      </span>
      <span class="text-lg text-zinc-500">s</span>
    </div>
    <div class="mt-3 flex items-center gap-2">
      <Clock class="size-3.5 text-zinc-600" />
      <span class="text-xs text-zinc-600">{{ formatTime(project.timeElapsed) }} total</span>
    </div>
  </UiCard>
</template>
