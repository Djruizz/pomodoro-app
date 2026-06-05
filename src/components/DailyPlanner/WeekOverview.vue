<script setup lang="ts">
import type { WeekDay } from './types'

defineProps<{
  days: WeekDay[]
  selectedDate: string
  getTaskCount: (date: string) => number
  getCompletedCount: (date: string) => number
}>()

const emit = defineEmits<{
  select: [date: string]
}>()
</script>

<template>
  <div class="flex flex-col gap-2 overflow-y-auto -mx-1 px-1">
    <div
      v-for="day in days"
      :key="day.date"
      class="flex items-center gap-3 p-2.5 rounded-lg transition-colors cursor-pointer"
      :class="
        selectedDate === day.date
          ? 'bg-cyan-500/5 border border-cyan-500/20'
          : 'bg-zinc-800/30 border border-transparent hover:bg-zinc-800/50'
      "
      @click="emit('select', day.date)"
    >
      <div
        class="flex flex-col items-center justify-center size-10 rounded-lg shrink-0"
        :class="day.isToday ? 'bg-cyan-500/10' : 'bg-zinc-800/50'"
      >
        <span
          class="text-[10px] font-medium"
          :class="day.isToday ? 'text-cyan-400' : 'text-zinc-500'"
        >
          {{ day.dayName }}
        </span>
        <span
          class="text-sm font-bold"
          :class="day.isToday ? 'text-cyan-400' : 'text-zinc-300'"
        >
          {{ day.label }}
        </span>
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between">
          <span class="text-xs text-zinc-400">
            {{ getTaskCount(day.date) }} task{{ getTaskCount(day.date) !== 1 ? 's' : '' }}
          </span>
          <span
            v-if="getTaskCount(day.date) > 0"
            class="text-[10px] px-1.5 py-0.5 rounded"
            :class="
              getCompletedCount(day.date) === getTaskCount(day.date)
                ? 'bg-emerald-400/10 text-emerald-400'
                : 'bg-amber-400/10 text-amber-400'
            "
          >
            {{ getCompletedCount(day.date) }}/{{ getTaskCount(day.date) }}
          </span>
        </div>
        <div
          v-if="getTaskCount(day.date) > 0"
          class="w-full bg-zinc-800 rounded-full h-1.5 mt-1.5"
        >
          <div
            class="h-1.5 rounded-full transition-all duration-300"
            :class="
              getCompletedCount(day.date) === getTaskCount(day.date)
                ? 'bg-emerald-400'
                : 'bg-cyan-400'
            "
            :style="{
              width:
                getTaskCount(day.date) > 0
                  ? (getCompletedCount(day.date) / getTaskCount(day.date)) * 100 + '%'
                  : '0%',
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>
