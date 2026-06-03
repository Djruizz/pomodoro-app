<script setup lang="ts">
import PomodoroTimer from '@/components/Widgets/PomodoroTimer.vue'
import TodoList from '@/components/Widgets/TodoList.vue'
import { useTaskStore, type Task } from '@/stores/tasks'
import { useProjectsStore } from '@/stores/projects'
import { computed } from 'vue'
const taskStore = useTaskStore()
const projectStore = useProjectsStore()

const projectTasks = computed<Task[]>(() => {
  if (projectStore.currentProjectId == 1) return taskStore.tasks
  return taskStore.tasks.filter((task) => task.projectId == projectStore.currentProjectId)
})
</script>
<template>
  <div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 w-full h-full gap-3 auto-rows-fr">
    <TodoList
      title="Tasks"
      :tasks="projectTasks"
      :project-id="projectStore.currentProjectId"
      class="md:col-span-1 min-h-0"
    />
    <PomodoroTimer class="md:col-span-2 xl:col-span-3 min-h-0" />
  </div>
</template>
