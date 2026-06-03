<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import UiInput from '@/components/Ui/UiInput.vue'
import UiModal from '@/components/Ui/UiModal.vue'
import UiButton from '@/components/Ui/UiButton.vue'
import UiSelect from '../Ui/UiSelect.vue'
import { useTaskStore, type Task } from '@/stores/tasks.ts'
import { useProjectsStore, type Project } from '@/stores/projects'
import { Folder } from '@lucide/vue'

const props = defineProps<{
  task?: Task | null
  selectedProjectId?: number
}>()

const openModal = defineModel({ default: false })
const taskStore = useTaskStore()
const projectStore = useProjectsStore()

const taskForm = ref<Partial<Task>>({})
const inputErrors = ref<Record<string, string>>({})
const isEditing = ref(false)

watch(openModal, (open) => {
  if (open && props.task) {
    isEditing.value = true
    taskForm.value = { ...props.task }
  } else if (open) {
    isEditing.value = false
    taskForm.value = { projectId: props.selectedProjectId }
  }
})

const validateTitle = () => {
  if (!taskForm.value.title || taskForm.value.title.trim() === '') {
    inputErrors.value.title = 'The task must have a title'
  } else {
    delete inputErrors.value.title
  }
}
const validateProject = () => {
  if (!taskForm.value.projectId) {
    inputErrors.value.project = 'The task must belong to a project'
  } else {
    delete inputErrors.value.project
  }
}

const saveTask = () => {
  validateTitle()
  validateProject()
  if (Object.keys(inputErrors.value).length > 0) return

  if (isEditing.value && props.task) {
    taskStore.updateTask(props.task.id, taskForm.value)
  } else {
    taskStore.createTask(taskForm.value)
  }
  closeModal()
}

const closeModal = () => {
  openModal.value = false
  taskForm.value = {}
  inputErrors.value = {}
  isEditing.value = false
}

const projectOptions = computed(() =>
  projectStore.projects.map((project) => ({
    value: project.id,
    label: project.name,
  })),
)
</script>

<template>
  <UiModal v-model="openModal" :title="isEditing ? 'Edit Task' : 'Create Task'" size="md">
    <form class="grid grid-cols-2 gap-4">
      <UiInput
        name="title"
        v-model="taskForm.title"
        label="Title"
        required
        :error="inputErrors.title"
        @blur="validateTitle"
        placeholder="Task title"
      />
      <UiInput
        v-model="taskForm.duration"
        type="number"
        label="Estimated duration (mins)"
        placeholder="15"
      />
      <UiInput
        v-model="taskForm.description"
        type="text"
        label="Description"
        placeholder="Details of the task"
        class="col-span-2"
      />
      <UiSelect
        v-model="taskForm.projectId"
        label="Project"
        :options="projectOptions"
        :icon="Folder"
        :error="inputErrors.project"
        placeholder="Select project"
        required
      />
    </form>
    <template #footer>
      <UiButton label="Cancel" variant="ghost" @click="closeModal" />
      <UiButton :label="isEditing ? 'Update' : 'Create'" @click="saveTask" />
    </template>
  </UiModal>
</template>
