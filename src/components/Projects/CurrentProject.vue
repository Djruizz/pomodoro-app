<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useProjectsStore } from '@/stores/projects'
import { ChevronDown, Check, Folder, FolderOpen } from '@lucide/vue'

const projectStore = useProjectsStore()
const isOpen = ref(false)
const containerRef = ref<HTMLElement | null>(null)
const dropdownPos = ref({ top: 0, left: 0 })

const updatePosition = () => {
  if (containerRef.value) {
    const rect = containerRef.value.getBoundingClientRect()
    dropdownPos.value = {
      top: rect.bottom + window.scrollY + 6,
      left: rect.left + window.scrollX,
    }
  }
}

const toggle = () => {
  if (!isOpen.value) updatePosition()
  isOpen.value = !isOpen.value
}

const select = (id: number) => {
  projectStore.setCurrentProject(id)
  isOpen.value = false
}

const handleClickOutside = (e: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}
const currentProjectColor = computed(() => projectStore.currentProject.color)
onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))
</script>
<style scoped></style>
<template>
  <div class="relative" ref="containerRef">
    <button
      type="button"
      class="flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-200 cursor-pointer text-sm font-medium text-zinc-200"
      :class="[isOpen ? 'ring-1 ring-current/30' : '']"
      :style="{
        backgroundColor: `${currentProjectColor}20`,
        borderColor: currentProjectColor,
      }"
      @click="toggle"
    >
      <!-- <div
        class="w-2 h-2 rounded-full shrink-0"
        :class="`bg-${projectStore.currentProject?.color ?? 'zinc-500'}`"
      /> -->
      <FolderOpen class="size-5" :style="{ color: currentProjectColor }" />
      <span class="truncate max-w-[120px]">{{ projectStore.currentProject?.name }}</span>
      <ChevronDown
        class="size-3.5 shrink-0 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <Teleport to="body">
      <Transition
        enter-active-class="transition-all duration-150 ease-out"
        enter-from-class="opacity-0 -translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-100 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-1"
      >
        <div
          v-if="isOpen"
          class="fixed z-9999 bg-zinc-800 border border-zinc-700/50 rounded-xl shadow-lg shadow-black/30 overflow-hidden min-w-[180px]"
          :style="{
            top: dropdownPos.top + 'px',
            left: dropdownPos.left + 'px',
          }"
        >
          <div class="py-1">
            <button
              v-for="project in projectStore.projects"
              :key="project.id"
              type="button"
              class="w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors cursor-pointer"
              :class="
                project.id === projectStore.currentProjectId
                  ? ''
                  : 'text-zinc-300 hover:bg-zinc-700/50 hover:text-zinc-100'
              "
              :style="
                project.id === projectStore.currentProjectId
                  ? { backgroundColor: `${currentProjectColor}20`, color: currentProjectColor }
                  : {}
              "
              @click.stop="select(project.id)"
            >
              <span
                class="w-2.5 h-2.5 rounded-full shrink-0"
                :style="{ backgroundColor: project.color }"
              />

              <span class="flex-1 text-left truncate">{{ project.name }}</span>
              <Check
                v-if="project.id === projectStore.currentProjectId"
                class="size-3.5 shrink-0"
              />
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
