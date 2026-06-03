<script setup lang="ts">
import type { Project } from '@/stores/projects'
import UiCard from '@/components/Ui/UiCard.vue'
import { Calendar, FolderOpen } from '@lucide/vue'

defineProps<{
  project: Project
}>()

const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
const formatRelativeDate = (timestamp: number) => {
  const now = Date.now()
  const diff = now - timestamp
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`
  return formatDate(timestamp)
}
</script>

<template>
  <UiCard>
    <div class="flex items-start gap-4">
      <div
        class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
        :style="{ backgroundColor: project.color }"
      >
        <FolderOpen class="size-6 text-white" />
      </div>
      <div class="flex-1 min-w-0">
        <h1 class="text-xl font-semibold text-zinc-100 truncate">
          {{ project.name || 'Untitled Project' }}
        </h1>
        <p
          v-if="project.description"
          class="text-sm text-zinc-400 mt-1 line-clamp-2 leading-relaxed"
        >
          {{ project.description }}
        </p>
        <p v-else class="text-sm text-zinc-600 mt-1 italic">No description</p>
        <div class="flex items-center gap-3 mt-3">
          <span class="flex items-center gap-1.5 text-xs text-zinc-500">
            <Calendar class="size-3.5" />
            Created {{ formatRelativeDate(project.createdAt) }}
          </span>
          <span class="w-px h-3 bg-zinc-700" />
          <span class="text-xs text-zinc-500">{{ formatDate(project.createdAt) }}</span>
        </div>
      </div>
    </div>
  </UiCard>
</template>
