<script setup lang="ts">
import { Calendar, ChevronLeft, ChevronRight } from '@lucide/vue'

defineProps<{
  weekRange: string
  weekOffset: number
}>()

const emit = defineEmits<{
  prev: []
  next: []
  today: []
}>()
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-3">
      <Calendar class="size-5 text-cyan-400" />
      <div>
        <h2 class="text-lg font-semibold text-zinc-100">Daily Planner</h2>
        <p class="text-xs text-zinc-500">{{ weekRange }}</p>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <button
        class="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 transition-colors"
        @click="emit('prev')"
      >
        <ChevronLeft class="size-4" />
      </button>
      <button
        class="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
        :class="
          weekOffset === 0
            ? 'bg-cyan-500/10 text-cyan-400'
            : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
        "
        @click="emit('today')"
      >
        Today
      </button>
      <button
        class="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 transition-colors"
        @click="emit('next')"
      >
        <ChevronRight class="size-4" />
      </button>
    </div>
  </div>
</template>
