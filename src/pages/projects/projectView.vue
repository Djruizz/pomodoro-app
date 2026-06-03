<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjectsStore, type Project } from '@/stores/projects'
import UiButton from '@/components/Ui/UiButton.vue'
import TodoList from '@/components/Widgets/TodoList.vue'
import CreateProjectModal from '@/components/Projects/CreateProjectModal.vue'

import { useTaskStore } from '@/stores/tasks'

import { ArrowLeft, FolderOpen } from '@lucide/vue'
import ProjectInfo from '@/components/Projects/ProjectInfo.vue'
import ProjectTimeStats from '@/components/Projects/ProjectTimeStats.vue'
import QuickNotes from '@/components/Widgets/QuickNotes.vue'

const projectsStore = useProjectsStore()
const taskStore = useTaskStore()
const route = useRoute()
const router = useRouter()

const showModal = ref(false)
const editingProject = ref<Project | null>(null)

const project = computed<Project | undefined>(() =>
  projectsStore.projects.find((p) => p.id.toString() === route.params.id),
)

const projectTasks = computed(() => {
  if (!project.value) return []
  if (project.value.id === 1) return taskStore.tasks
  return taskStore.tasks.filter((t) => t.projectId === project.value?.id)
})

const openEdit = (proj: Project) => {
  editingProject.value = proj
  showModal.value = true
}

import { useMediaQuery } from '@vueuse/core'
import ProjectStats from '@/components/Projects/ProjectStats.vue'
const isDesktop = useMediaQuery('(min-width: 1024px)')
</script>

<template>
  <div v-if="project" class="h-full p-1">
    <div
      class="grid gap-3 h-full"
      :class="{
        'grid-cols-4 grid-rows-4': isDesktop,
        'grid-cols-1 sm:grid-cols-2': !isDesktop,
      }"
    >
      <ProjectInfo
        :project="project"
        :class="isDesktop ? 'col-span-3' : 'sm:col-span-2 h-[150px] sm:h-auto'"
        @edit="openEdit"
      />
      <ProjectTimeStats
        :project="project"
        :class="isDesktop ? 'col-span-1' : 'sm:col-span-2 h-[150px] sm:h-auto'"
      />
      <TodoList
        title="Project Tasks"
        :tasks="projectTasks"
        :project-id="project.id"
        :class="
          isDesktop
            ? 'col-span-2 row-span-3 max-h-full'
            : 'row-span-2 sm:col-span-1 h-[500px] sm:h-auto'
        "
      />
      <ProjectStats
        :project="project"
        :tasks="projectTasks"
        :class="isDesktop ? 'col-span-2 row-span-2' : 'sm:col-span-1 h-[300px] sm:h-auto'"
      />
      <QuickNotes :class="isDesktop ? 'col-span-2' : 'sm:col-span-1 h-[150px] sm:h-auto'" />
    </div>
    <CreateProjectModal v-model="showModal" :project="editingProject" />
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
