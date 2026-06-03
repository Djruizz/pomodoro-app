<script setup lang="ts">
import type { Task } from '@/stores/tasks'
import { useTaskStore } from '@/stores/tasks'
import { ChevronDown, Clock, CheckCircle2, PauseCircle, PlayCircle, Hourglass, Pencil, Trash2 } from '@lucide/vue'
import { ref, computed } from 'vue'

const props = defineProps<{ task: Task }>()
const emit = defineEmits<{
  edit: [task: Task]
  delete: [id: number]
}>()
const store = useTaskStore()
const isOpen = ref(false)

const statusConfig = computed(() => {
  const configs = {
    complete: {
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
      label: 'Complete',
    },
    in_progress: {
      icon: PlayCircle,
      color: 'text-cyan-400',
      bg: 'bg-cyan-400/10',
      label: 'In Progress',
    },
    paused: { icon: PauseCircle, color: 'text-zinc-400', bg: 'bg-zinc-400/10', label: 'Paused' },
    pending: { icon: Hourglass, color: 'text-amber-400', bg: 'bg-amber-400/10', label: 'Pending' },
  }
  return configs[props.task.status ?? 'paused']
})

const cycleStatus = () => {
  const statuses: Task['status'][] = ['paused', 'pending', 'in_progress', 'complete']

  const currentStatus = props.task.status ?? 'paused'
  const currentIndex = statuses.indexOf(currentStatus)

  const safeIndex = currentIndex === -1 ? 0 : currentIndex

  const nextStatus: Task['status'] = statuses[(safeIndex + 1) % statuses.length]!

  store.setStatus(props.task.id, nextStatus)
}

const formatDuration = (seconds?: number) => {
  if (!seconds) return null
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const handleEdit = () => {
  emit('edit', props.task)
}

const handleDelete = () => {
  emit('delete', props.task.id)
}
</script>

<template>
  <div
    class="rounded-lg bg-zinc-800/50 border border-zinc-700/50 w-full transition-all duration-200 hover:border-zinc-600/50"
    :class="{ 'border-cyan-500/30 bg-zinc-800': isOpen }"
  >
    <div class="flex items-center gap-3 p-3 cursor-pointer select-none" @click="isOpen = !isOpen">
      <button
        class="shrink-0 p-1 rounded-md transition-colors"
        :class="[statusConfig.bg, 'hover:opacity-80']"
        @click.stop="cycleStatus"
      >
        <component :is="statusConfig.icon" class="size-4" :class="statusConfig.color" />
      </button>

      <div class="flex-1 min-w-0">
        <h3 class="text-zinc-100 font-medium truncate">{{ task.title }}</h3>
        <div class="flex items-center gap-2 mt-0.5">
          <span
            class="text-xs px-1.5 py-0.5 rounded"
            :class="[statusConfig.bg, statusConfig.color]"
          >
            {{ statusConfig.label }}
          </span>
          <span v-if="task.duration" class="flex items-center gap-1 text-xs text-zinc-500">
            <Clock class="size-3" />
            {{ formatDuration(task.duration) }}
          </span>
        </div>
      </div>

      <ChevronDown
        class="size-4 text-zinc-500 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
      />
      <div class="flex items-center gap-1">
        <button
          class="p-1.5 rounded-md text-zinc-400 hover:text-amber-400 hover:bg-amber-400/10 transition-colors"
          @click.stop="handleEdit"
          title="Edit task"
        >
          <Pencil class="size-4" />
        </button>
        <button
          class="p-1.5 rounded-md text-zinc-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
          @click.stop="handleDelete"
          title="Delete task"
        >
          <Trash2 class="size-4" />
        </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition-all duration-400 ease-out"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-40"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 max-h-40"
      leave-to-class="opacity-0 max-h-0"
    >
      <div v-show="isOpen" class="overflow-hidden">
        <div class="px-3 pb-3 pt-0 border-t border-zinc-700/50">
          <p class="text-sm text-zinc-400 mt-3 leading-relaxed">
            {{ task.description || 'No description provided.' }}
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>
