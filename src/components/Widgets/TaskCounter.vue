<script setup lang="ts">
import { computed, ref } from 'vue'
import { ListChecks } from '@lucide/vue'
import { useTaskStore } from '@/stores/tasks'
const store = useTaskStore()
const pendingTask = computed(() => {
  return store.tasks.filter(
    (task) => task.status != 'complete' && task.date == new Date().toISOString().slice(0, 10),
  ).length
})
</script>
<template>
  <div
    class="px-3 py-1.5 bg-cyan-800/50 border border-cyan-700/50 rounded-full text-zinc-300 flex items-center gap-2 text-sm tabular-nums"
  >
    <ListChecks class="size-3.5 text-cyan-500" />
    <p class="text-cyan-500">
      Pending Tasks: <span class="font-semibold">{{ pendingTask }}</span>
    </p>
  </div>
</template>
