<script setup lang="ts">
import { ref } from 'vue'

import TaskCard from '@/components/Tasks/TaskCard.vue'
import UiButton from '@/components/Ui/UiButton.vue'
import UiCard from '@/components/Ui/UiCard.vue'
import CreateTaskModal from '@/components/Tasks/CreateTaskModal.vue'

import { ListTodo } from '@lucide/vue'

import { type Task } from '@/stores/tasks.ts'

const openModal = ref(false)
defineProps<{
  tasks: Task[]
  title: string
  projectId?: number
}>()
</script>
<template>
  <UiCard :title="title" class="flex-1">
    <div class="flex flex-col flex-1 min-h-0 overflow-y-auto -mx-1 px-1">
      <div
        v-if="tasks.length === 0"
        class="flex flex-col items-center justify-center py-12 gap-3 text-center"
      >
        <div class="size-10 rounded-xl bg-zinc-800/50 flex items-center justify-center">
          <ListTodo class="size-5 text-zinc-600" />
        </div>
        <div>
          <p class="text-sm text-zinc-400 font-medium">No tasks yet</p>
          <p class="text-xs text-zinc-600 mt-0.5">Add a task to get started</p>
        </div>
      </div>
      <div v-for="task in tasks" :key="task.id" class="py-1">
        <TaskCard :task="task" />
      </div>
    </div>
    <UiButton
      label="Add Task"
      @click="openModal = true"
      class="shrink-0 w-full justify-center"
      size="sm"
      variant="outline"
    />
    <CreateTaskModal v-model="openModal" :selected-project-id="projectId" />
  </UiCard>
</template>
