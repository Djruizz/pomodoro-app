<script setup lang="ts">
import { ref, computed } from 'vue'
import TodoList from '@/components/Widgets/TodoList.vue'
import UiCard from '@/components/Ui/UiCard.vue'
import WeekHeader from '@/components/DailyPlanner/WeekHeader.vue'
import WeekDaySelector from '@/components/DailyPlanner/WeekDaySelector.vue'
import WeekOverview from '@/components/DailyPlanner/WeekOverview.vue'
import { useTaskStore, type Task } from '@/stores/tasks'
import { useProjectsStore } from '@/stores/projects'
import { useMediaQuery } from '@vueuse/core'
import type { WeekDay } from '@/components/DailyPlanner/types'

const taskStore = useTaskStore()
const projectStore = useProjectsStore()
const isDesktop = useMediaQuery('(min-width: 1024px)')

const today = new Date()
const selectedDate = ref(formatDate(today))
const weekOffset = ref(0)

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]!
}

function parseDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year!, month! - 1, day)
}

function getWeekDays(offset: number): WeekDay[] {
  const start = new Date(today)
  start.setDate(start.getDate() - start.getDay() + 1 + offset * 7)

  const days: WeekDay[] = []
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  for (let i = 0; i < 7; i++) {
    const d = new Date(start)
    d.setDate(d.getDate() + i)
    days.push({
      date: formatDate(d),
      label: d.getDate().toString(),
      dayName: dayNames[i]!,
      isToday: formatDate(d) === formatDate(today),
    })
  }
  return days
}

const weekDays = computed(() => getWeekDays(weekOffset.value))

const weekRange = computed(() => {
  const days = weekDays.value
  if (days.length === 0) return ''
  const start = parseDate(days[0]!.date)
  const end = parseDate(days[6]!.date)
  const startMonth = start.toLocaleString('default', { month: 'short' })
  const endMonth = end.toLocaleString('default', { month: 'short' })
  if (startMonth === endMonth) {
    return `${startMonth} ${start.getDate()} - ${end.getDate()}, ${start.getFullYear()}`
  }
  return `${startMonth} ${start.getDate()} - ${endMonth} ${end.getDate()}, ${end.getFullYear()}`
})

const goToPrevWeek = () => weekOffset.value--
const goToNextWeek = () => weekOffset.value++
const goToCurrentWeek = () => {
  weekOffset.value = 0
  selectedDate.value = formatDate(today)
}

const getTaskCountForDate = (date: string) => {
  return taskStore.tasks.filter((t) => t.date === date).length
}

const getCompletedCountForDate = (date: string) => {
  return taskStore.tasks.filter((t) => t.date === date && t.status === 'complete').length
}

const selectedDateTasks = computed<Task[]>(() => {
  let tasks = taskStore.tasks.filter((t) => t.date === selectedDate.value)
  if (projectStore.currentProjectId !== 1) {
    tasks = tasks.filter((t) => t.projectId === projectStore.currentProjectId)
  }
  return tasks
})

const selectedDateLabel = computed(() => {
  const date = parseDate(selectedDate.value)
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
})
</script>

<template>
  <div
    class="grid gap-3 h-full"
    :class="{ 'grid-cols-4 grid-rows-4': isDesktop, 'grid-cols-1': !isDesktop }"
  >
    <div :class="isDesktop ? 'col-span-4 row-span-1' : ''">
      <UiCard class="h-full">
        <WeekHeader
          :week-range="weekRange"
          :week-offset="weekOffset"
          @prev="goToPrevWeek"
          @next="goToNextWeek"
          @today="goToCurrentWeek"
        />
        <WeekDaySelector
          :days="weekDays"
          :selected-date="selectedDate"
          :get-task-count="getTaskCountForDate"
          :get-completed-count="getCompletedCountForDate"
          @select="selectedDate = $event"
        />
      </UiCard>
    </div>

    <TodoList
      :title="selectedDateLabel"
      :tasks="selectedDateTasks"
      :project-id="projectStore.currentProjectId"
      :selected-date="selectedDate"
      :class="isDesktop ? 'col-span-2 row-span-3' : 'h-[500px]'"
    />

    <div :class="isDesktop ? 'col-span-2 row-span-3' : ''">
      <UiCard title="Week Overview" class="h-full">
        <WeekOverview
          :days="weekDays"
          :selected-date="selectedDate"
          :get-task-count="getTaskCountForDate"
          :get-completed-count="getCompletedCountForDate"
          @select="selectedDate = $event"
        />
      </UiCard>
    </div>
  </div>
</template>
