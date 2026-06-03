<script setup lang="ts">
import type { Project } from '@/stores/projects'
import { useProjectsStore } from '@/stores/projects'
import { Clock, Trash2, Edit3, X } from '@lucide/vue'

const props = defineProps<{
  project: Project
  isSelected: boolean
}>()

const emit = defineEmits<{
  edit: [project: Project]
  select: [id: number]
  close: []
}>()

const store = useProjectsStore()

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

const handleDelete = () => {
  store.deleteProject(props.project.id)
}

const handleSelect = () => {
  if (props.isSelected) {
    emit('close')
  } else {
    emit('select', props.project.id)
  }
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
    @click="handleSelect"
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

      <div class="flex items-center gap-1" v-if="!isSelected">
        <button
          class="p-1.5 rounded-lg text-zinc-500 hover:text-cyan-400 hover:bg-zinc-700/50 transition-colors"
          @click.stop="emit('edit', project)"
        >
          <Edit3 class="size-3.5" />
        </button>
        <button
          class="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-700/50 transition-colors"
          @click.stop="handleDelete"
          v-if="project.id != 1"
        >
          <Trash2 class="size-3.5" />
        </button>
      </div>

      <button
        v-else
        class="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-700/50 transition-colors"
        @click.stop="emit('close')"
      >
        <X class="size-4" />
      </button>
    </div>

    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-60"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 max-h-60"
      leave-to-class="opacity-0 max-h-0"
    >
      <div v-show="isSelected" class="overflow-hidden">
        <div class="px-4 pb-4 pt-1 border-t border-zinc-700/50">
          <div class="flex gap-2 mt-3">
            <button
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-cyan-400 bg-zinc-700/50 hover:bg-zinc-700 transition-colors"
              @click.stop="emit('edit', project)"
            >
              <Edit3 class="size-3" />
              Edit
            </button>
            <button
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-red-400 bg-zinc-700/50 hover:bg-zinc-700 transition-colors"
              @click.stop="handleDelete"
              v-if="project.id != 1"
            >
              <Trash2 class="size-3" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
