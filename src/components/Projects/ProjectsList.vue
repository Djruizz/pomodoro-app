<script setup lang="ts">
import { computed, ref } from 'vue'
const store = useProjectsStore()
import { useProjectsStore, type Project } from '@/stores/projects'
import { useRoute } from 'vue-router'
import { Plus, FolderOpen, X } from '@lucide/vue'
import CreateProjectModal from '@/components/Projects/CreateProjectModal.vue'
import UiCard from '@/components/Ui/UiCard.vue'
import UiButton from '@/components/Ui/UiButton.vue'
import ProjectCard from '@/components/Projects/ProjectCard.vue'
const route = useRoute()

const showModal = ref(false)
const editingProject = ref<Project | null>(null)

const openCreate = () => {
  editingProject.value = null
  showModal.value = true
}

const openEdit = (project: Project) => {
  editingProject.value = project
  showModal.value = true
}

import { useRouter } from 'vue-router'
const router = useRouter()
const selectProject = (id: number) => {
  router.push({ name: 'project', params: { id: id } })
}
const selectedProjectId = computed(() => route.params.id)

const closeProject = () => {
  router.push('/projects')
}
</script>

<template>
  <UiCard title="Projects">
    <template #right>
      <UiButton :icon="Plus" label="New Project" size="sm" @click="openCreate" />
    </template>

    <div
      v-if="store.projects.length === 0"
      class="flex flex-col items-center justify-center py-12 gap-3"
    >
      <FolderOpen class="size-12 text-zinc-700" />
      <p class="text-zinc-500 text-sm">No projects yet. Create one to get started.</p>
      <UiButton :icon="Plus" label="Create Project" size="sm" @click="openCreate" />
    </div>

    <div
      v-else
      class="grid gap-2 items-start"
      :class="selectedProjectId ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'"
    >
      <ProjectCard
        v-for="project in store.projects"
        :key="project.id"
        :project="project"
        :is-selected="selectedProjectId === project.id?.toString()"
        @edit="openEdit"
        @select="selectProject"
        @close="closeProject"
      />
    </div>
    <CreateProjectModal v-model="showModal" :project="editingProject" />
  </UiCard>
</template>
