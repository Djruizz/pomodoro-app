<script setup lang="ts">
import UiCard from '../Ui/UiCard.vue'
import { computed } from 'vue'
import { useTaskStore, type Task } from '@/stores/tasks'
import { type Project } from '@/stores/projects'
import { Timer } from '@lucide/vue'
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps<{ tasks: Task[]; project: Project }>()

const tasksByStatus = computed(() => {
  const tasks = props.tasks
  return {
    complete: tasks.filter((t) => t.status === 'complete').length,
    inProgress: tasks.filter((t) => t.status === 'in_progress').length,
    paused: tasks.filter((t) => t.status === 'paused').length,
    pending: tasks.filter((t) => t.status === 'pending').length,
    total: tasks.length,
  }
})

const chartData = computed<ChartData<'doughnut'>>(() => ({
  labels: ['Complete', 'In Progress', 'Paused', 'Pending'],
  datasets: [
    {
      data: [
        tasksByStatus.value.complete,
        tasksByStatus.value.inProgress,
        tasksByStatus.value.paused,
        tasksByStatus.value.pending,
      ],
      backgroundColor: ['#34d399', '#22d3ee', '#71717a', '#fbbf24'],
      borderColor: ['#34d399', '#22d3ee', '#71717a', '#fbbf24'],
      borderWidth: 1,
    },
  ],
}))

const chartOptions: ChartOptions<'doughnut'> = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false,
    },
  },
}
</script>

<template>
  <UiCard title="Stats" class="flex flex-col p-4">
    <div class="flex flex-col items-center gap-3">
      <div v-if="tasksByStatus.total > 0" class="relative w-36 h-36">
        <div class="w-full h-full">
          <Doughnut :data="chartData" :options="chartOptions" />
        </div>
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span class="text-2xl font-bold text-zinc-100">{{ tasksByStatus.total }}</span>
        </div>
      </div>
      <div v-else class="w-36 h-36 flex items-center justify-center">
        <span class="text-sm text-zinc-500">No tasks yet</span>
      </div>
      <div class="flex flex-wrap justify-center gap-x-3 gap-y-1">
        <div class="flex items-center gap-1.5">
          <div class="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span class="text-xs text-zinc-400">{{ tasksByStatus.complete }} Complete</span>
        </div>
        <div class="flex items-center gap-1.5">
          <div class="w-2.5 h-2.5 rounded-full bg-cyan-400" />
          <span class="text-xs text-zinc-400">{{ tasksByStatus.inProgress }} In Progress</span>
        </div>
        <div class="flex items-center gap-1.5">
          <div class="w-2.5 h-2.5 rounded-full bg-zinc-500" />
          <span class="text-xs text-zinc-400">{{ tasksByStatus.paused }} Paused</span>
        </div>
        <div class="flex items-center gap-1.5">
          <div class="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span class="text-xs text-zinc-400">{{ tasksByStatus.pending }} Pending</span>
        </div>
      </div>
      <div class="w-full flex items-center justify-between border-t border-zinc-700/50 pt-3">
        <div class="flex items-center gap-2 text-zinc-400">
          <Timer class="size-4 text-pink-400" />
          <span class="text-sm">Pomodoros</span>
        </div>
        <span class="text-lg font-semibold text-pink-400">{{ project.pomodoros || 0 }}</span>
      </div>
    </div>
  </UiCard>
</template>
