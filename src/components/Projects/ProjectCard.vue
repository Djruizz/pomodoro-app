<script setup lang="ts">
import type { Project } from '@/stores/projects'
import { Clock } from '@lucide/vue'

defineProps<{
  project: Project
  isSelected: boolean
}>()

const emit = defineEmits<{
  select: [id: number]
}>()

const formatTime = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  if (hrs > 0) return `${hrs}h ${mins}m`
  return `${mins}m`
}

const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
</script>

<template>
  <div
    class="rounded-xl w-full transition-all duration-300 cursor-pointer select-none"
    :class="[
      isSelected
        ? 'bg-zinc-800 border-2 border-cyan-500/60'
        : 'bg-zinc-800/50 border border-zinc-700/50 hover:border-zinc-600/50',
    ]"
    @click="emit('select', project.id)"
  >
    <div class="flex items-center gap-3 p-4">
      <div class="w-3 h-3 rounded-full shrink-0" :style="{ backgroundColor: project.color }" />

      <div class="flex-1 min-w-0">
        <h3 class="text-zinc-100 font-medium truncate">
          {{ project.name || 'Untitled Project' }}
        </h3>
        <div class="flex items-center gap-2 mt-0.5">
          <span class="flex items-center gap-1 text-xs text-zinc-500">
            <Clock class="size-3" />
            {{ formatTime(project.timeElapsed) }}
          </span>
          <span class="text-xs text-zinc-600">|</span>
          <span class="text-xs text-zinc-600">{{ formatDate(project.createdAt) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
