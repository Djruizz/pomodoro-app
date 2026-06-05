<script setup lang="ts">
import { ref } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import UiCard from '@/components/Ui/UiCard.vue'
import UiButton from '@/components/Ui/UiButton.vue'
import { Database, RotateCcw, Trash2 } from '@lucide/vue'

const emit = defineEmits<{
  reset: []
}>()

const settingsStore = useSettingsStore()
const showResetConfirm = ref(false)

const handleReset = () => {
  settingsStore.resetSettings()
  showResetConfirm.value = false
  emit('reset')
}

const clearAllData = () => {
  localStorage.clear()
  window.location.reload()
}
</script>

<template>
  <UiCard title="Data" :icon="Database" iconClass="text-rose-400">
    <div class="flex flex-col gap-3">
      <p class="text-sm text-zinc-500">All data is stored locally in your browser.</p>
      <div class="flex flex-wrap gap-2">
        <UiButton
          label="Reset Settings"
          :icon="RotateCcw"
          size="sm"
          variant="ghost"
          @click="showResetConfirm = true"
        />
        <UiButton
          label="Clear All Data"
          :icon="Trash2"
          size="sm"
          variant="ghost"
          class="text-red-400 hover:text-red-300"
          @click="clearAllData"
        />
      </div>
      <div
        v-if="showResetConfirm"
        class="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-xl border border-zinc-700/50"
      >
        <p class="text-sm text-zinc-300 flex-1">Reset all settings to defaults?</p>
        <UiButton label="Cancel" size="sm" variant="ghost" @click="showResetConfirm = false" />
        <UiButton label="Reset" size="sm" @click="handleReset" />
      </div>
    </div>
  </UiCard>
</template>
