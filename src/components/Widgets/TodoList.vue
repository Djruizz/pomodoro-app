<script setup lang="ts">
import { computed, ref } from 'vue'

import TaskCard from '@/components/Tasks/TaskCard.vue'
import UiButton from '@/components/Ui/UiButton.vue'
import UiCard from '@/components/Ui/UiCard.vue'
import CreateTaskModal from '@/components/Tasks/CreateTaskModal.vue'
import UiSelect from '../Ui/UiSelect.vue'

import { CircleCheck, Hourglass, ListTodo, PauseCircle, PlayCircle } from '@lucide/vue'

import { type Task } from '@/stores/tasks.ts'

const openModal = ref(false)
const props = defineProps<{
  tasks: Task[]
  title: string
  projectId?: number
}>()

const filter = ref<Task['status'] | 'all'>('all')
const mappedTasks = computed(() => {
  if (filter.value === 'all') {
    return props.tasks
  }
  return props.tasks.filter((task) => task.status === filter.value)
})
</script>
<template>
  <UiCard :title="title" class="flex flex-col flex-1 min-h-0 overflow-hidden">
    <template #right>
      <UiSelect
        v-model="filter"
        size="sm"
        :options="[
          { label: 'All', value: 'all', icon: ListTodo },
          { label: 'Pending', value: 'pending', icon: Hourglass },
          { label: 'In Progress', value: 'in_progress', icon: PlayCircle },
          { label: 'Complete', value: 'complete', icon: CircleCheck },
          { label: 'Paused', value: 'paused', icon: PauseCircle },
        ]"
        class="w-36"
      />
    </template>
    <div class="flex flex-col flex-1 min-h-0 overflow-y-auto -mx-1 px-1">
      <div
        v-if="mappedTasks.length === 0"
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
      <div v-for="task in mappedTasks" :key="task.id" class="py-1">
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
