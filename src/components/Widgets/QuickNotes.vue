<script setup lang="ts">
import UiCard from '../Ui/UiCard.vue'
import UiTextarea from '../Ui/UiTextarea.vue'

import { MessageSquare, Save } from '@lucide/vue'
import { useProjectsStore } from '@/stores/projects.ts'
import { computed, ref, watch } from 'vue'
import UiButton from '../Ui/UiButton.vue'
const projectStore = useProjectsStore()

const debouncedNotes = ref(projectStore.currentProject.notes)
const isSaving = ref(false)
const saveNotes = () => {
  isSaving.value = true
  projectStore.updateProject(projectStore.currentProjectId, { notes: debouncedNotes.value })
  setTimeout(() => {
    isSaving.value = false
  }, 300)
}
const hasChanges = computed(() => {
  return projectStore.currentProject.notes?.trim() !== debouncedNotes.value?.trim()
})
</script>

<template>
  <UiCard
    title="Quick Notes"
    :icon="MessageSquare"
    icon-class="text-blue-400"
    class="flex flex-col flex-1 min-h-0 overflow-hidden"
  >
    <template #right>
      <UiButton
        v-if="hasChanges || isSaving"
        :icon="Save"
        variant="ghost"
        size="sm"
        @click="saveNotes"
        :loading="isSaving"
      />
      <p class="text-xs text-zinc-400 animate-pulse" v-if="!hasChanges && !isSaving">Saved</p>
    </template>
    <UiTextarea
      v-model="debouncedNotes"
      placeholder="Add your notes here..."
      class="h-full"
      resize="none"
    />
  </UiCard>
</template>
