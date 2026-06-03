<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjectsStore, type Project } from '@/stores/projects'
import UiCard from '@/components/Ui/UiCard.vue'
import UiButton from '@/components/Ui/UiButton.vue'
import TodoList from '@/components/Widgets/TodoList.vue'

import { useTaskStore } from '@/stores/tasks'
const store = useTaskStore()

import {
  CheckCircle2,
  PlayCircle,
  Hourglass,
  Trash2,
  Edit3,
  ArrowLeft,
  FolderOpen,
} from '@lucide/vue'
import ProjectInfo from '@/components/Projects/ProjectInfo.vue'
import ProjectTimeStats from '@/components/Projects/ProjectTimeStats.vue'
import QuickNotes from '@/components/Widgets/QuickNotes.vue'

const projectsStore = useProjectsStore()
const taskStore = useTaskStore()
const route = useRoute()
const router = useRouter()

const project = ref<Project | undefined>()

watch(
  () => route.params.id,
  () => {
    project.value = projectsStore.projects.find((p) => p.id.toString() === route.params.id)
  },
  { immediate: true },
)

const projectTasks = computed(() => {
  if (!project.value) return []
  if (project.value.id === 1) return taskStore.tasks
  return taskStore.tasks.filter((t) => t.projectId === project.value?.id)
})

const tasksByStatus = computed(() => {
  const tasks = projectTasks.value
  return {
    complete: tasks.filter((t) => t.status === 'complete').length,
    inProgress: tasks.filter((t) => t.status === 'in progress').length,
    paused: tasks.filter((t) => t.status === 'paused').length,
    pending: tasks.filter((t) => t.status === 'pending').length,
    total: tasks.length,
  }
})

const handleDelete = () => {
  if (!project.value) return
  projectsStore.deleteProject(project.value.id)
  router.push('/projects')
}
</script>

<template>
  <div v-if="project" class="grid grid-cols-4 grid-rows-1 md:grid-rows-4 gap-3 h-full">
    <!-- Project Info: 2 cols -->
    <ProjectInfo :project="project" class="col-span-4 md:col-span-3" />
    <!-- Time Stats: 2 cols -->
    <ProjectTimeStats :project="project" class="col-span-4 md:col-span-1" />
    <!-- Task Summary: 2 cols -->
    <TodoList
      title="Project Tasks"
      :tasks="projectTasks"
      :project-id="project.id"
      class="row-span-3 col-span-2"
    />
    <UiCard class="col-span-2 row-span-2"> </UiCard>
    <!-- Quick Notes -->
    <QuickNotes class="col-span-2 row-span-1" />

    <!-- Quick Actions: 1 col -->
    <!-- <UiCard class="col-span-1">
      <div class="flex flex-col gap-2 h-full">
        <span class="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1">
          Actions
        </span>
        <UiButton
          :icon="PlayCircle"
          label="Start Timer"
          variant="solid"
          class="w-full justify-center"
          @click="router.push('/pomodoro')"
        />
        <UiButton :icon="Edit3" label="Edit" variant="outline" class="w-full justify-center" />
        <div class="flex-1" />
        <UiButton
          :icon="Trash2"
          label="Delete"
          variant="ghost"
          class="w-full justify-center text-red-400 hover:text-red-300 hover:bg-red-500/10"
          @click="handleDelete"
        />
      </div>
    </UiCard> -->

    <!-- Recent Tasks: full width -->
  </div>

  <!-- Project not found -->
  <div v-else class="flex flex-col items-center justify-center h-full gap-4">
    <FolderOpen class="size-16 text-zinc-700" />
    <div class="text-center">
      <h2 class="text-lg font-semibold text-zinc-300">Project not found</h2>
      <p class="text-sm text-zinc-500 mt-1">This project may have been deleted</p>
    </div>
    <UiButton
      :icon="ArrowLeft"
      label="Close"
      @click="router.push('/projects')"
      size="md"
      variant="ghost"
    />
  </div>
</template>
