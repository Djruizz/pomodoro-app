<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings'
import UiCard from '@/components/Ui/UiCard.vue'
import UiSwitch from '@/components/Ui/UiSwitch.vue'
import UiSelect from '@/components/Ui/UiSelect.vue'
import { Volume2, VolumeX, Music } from '@lucide/vue'

const settingsStore = useSettingsStore()

const soundOptions = [
  { value: 'PomodoroEnd.mp3', label: 'Pomodoro End' },
  { value: 'BreakEnd.mp3', label: 'Break End' },
]
</script>

<template>
  <UiCard
    title="Audio"
    :icon="settingsStore.settings.audio.muted ? VolumeX : Volume2"
    iconClass="text-emerald-400"
  >
    <div class="flex flex-col gap-4">
      <UiSwitch label="Mute all sounds" v-model="settingsStore.settings.audio.muted" />
      <div class="flex flex-col gap-1.5">
        <label class="text-sm font-medium text-zinc-400">Volume</label>
        <div class="flex items-center gap-3">
          <input
            type="range"
            v-model.number="settingsStore.settings.audio.volume"
            min="0"
            max="1"
            step="0.05"
            class="flex-1 h-1.5 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-cyan-500"
            :disabled="settingsStore.settings.audio.muted"
          />
          <span class="text-sm text-zinc-400 w-10 text-right">
            {{ Math.round(settingsStore.settings.audio.volume * 100) }}%
          </span>
        </div>
      </div>
      <UiSelect
        v-model="settingsStore.settings.audio.alertSound"
        :options="soundOptions"
        label="Alert sound"
        :icon="Music"
        :disabled="settingsStore.settings.audio.muted"
      />
    </div>
  </UiCard>
</template>
