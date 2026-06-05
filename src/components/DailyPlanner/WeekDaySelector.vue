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
  <div class="grid grid-cols-7 gap-2 mt-2">
    <button
      v-for="day in days"
      :key="day.date"
      class="flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-150 cursor-pointer"
      :class="
        selectedDate === day.date
          ? 'bg-cyan-500/10 border border-cyan-500/30'
          : 'bg-zinc-800/30 border border-transparent hover:border-zinc-700/50'
      "
      @click="emit('select', day.date)"
    >
      <span
        class="text-[10px] font-medium uppercase"
        :class="selectedDate === day.date ? 'text-cyan-400' : 'text-zinc-500'"
      >
        {{ day.dayName }}
      </span>
      <span
        class="text-sm font-semibold"
        :class="{
          'text-cyan-400': selectedDate === day.date || day.isToday,
          'text-zinc-100': selectedDate !== day.date && !day.isToday,
        }"
      >
        {{ day.label }}
      </span>
      <div class="flex items-center gap-0.5">
        <span
          v-if="getTaskCount(day.date) > 0"
          class="size-1.5 rounded-full"
          :class="
            getCompletedCount(day.date) === getTaskCount(day.date)
              ? 'bg-emerald-400'
              : 'bg-amber-400'
          "
        />
      </div>
    </button>
  </div>
</template>
