<script setup lang="ts">
import { ref, watch } from 'vue'
import UiInput from '@/components/Ui/UiInput.vue'
import UiModal from '@/components/Ui/UiModal.vue'
import UiButton from '@/components/Ui/UiButton.vue'
import { useProjectsStore, type Project } from '@/stores/projects.ts'
import UiColorPicker from '../Ui/UiColorPicker.vue'

const props = defineProps<{
  project?: Project | null
}>()

const openModal = defineModel({ default: false })
const projectStore = useProjectsStore()

const projectForm = ref<Partial<Project>>({})
const inputErrors = ref<Record<string, string>>({})
const isEditing = ref(false)

watch(openModal, (open) => {
  if (open && props.project) {
    isEditing.value = true
    projectForm.value = { ...props.project }
  } else if (open) {
    isEditing.value = false
    projectForm.value = {}
  }
})

const validateTitle = () => {
  if (!projectForm.value.name || projectForm.value.name.trim() === '') {
    inputErrors.value.title = 'The project must have a title'
  } else {
    delete inputErrors.value.title
  }
}

const saveProject = () => {
  validateTitle()
  if (Object.keys(inputErrors.value).length > 0) return

  if (isEditing.value && props.project) {
    projectStore.updateProject(props.project.id, projectForm.value)
  } else {
    projectStore.createProject(projectForm.value)
  }
  closeModal()
}

const closeModal = () => {
  openModal.value = false
  projectForm.value = {}
  inputErrors.value = {}
  isEditing.value = false
}
</script>

<template>
  <UiModal v-model="openModal" :title="isEditing ? 'Edit Project' : 'Create Project'" size="md">
    <form class="grid grid-cols-2 gap-4">
      <UiInput
        name="title"
        v-model="projectForm.name"
        label="Title"
        required
        :error="inputErrors.title"
        @blur="validateTitle"
        placeholder="My awesome project"
      />
      <UiInput
        v-model="projectForm.description"
        type="text"
        label="Description"
        placeholder="What is this project about?"
        class="col-span-2"
      />
      <UiColorPicker label="Color" v-model="projectForm.color" />
    </form>
    <template #footer>
      <UiButton label="Cancel" variant="ghost" @click="closeModal" />
      <UiButton :label="isEditing ? 'Update' : 'Create'" @click="saveProject" />
    </template>
  </UiModal>
</template>
