<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings'
import UiCard from '@/components/Ui/UiCard.vue'
import UiSwitch from '@/components/Ui/UiSwitch.vue'
import { Zap } from '@lucide/vue'

const settingsStore = useSettingsStore()
</script>

<template>
  <UiCard title="Behavior" :icon="Zap" iconClass="text-violet-400">
    <div class="flex flex-col gap-3">
      <UiSwitch
        label="Auto-start breaks"
        hint="Start break timer automatically when focus ends"
        v-model="settingsStore.settings.behavior.autoStartBreaks"
      />
      <UiSwitch
        label="Auto-start focus"
        hint="Start focus timer automatically when break ends"
        v-model="settingsStore.settings.behavior.autoStartPomodoros"
      />
      <UiSwitch
        label="Track project time"
        hint="Add focus time to current project by default"
        v-model="settingsStore.settings.behavior.defaultAddProject"
      />
    </div>
  </UiCard>
</template>
