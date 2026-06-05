<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings'
import UiCard from '@/components/Ui/UiCard.vue'
import { Palette } from '@lucide/vue'

const settingsStore = useSettingsStore()

const colorPresets = [
  { value: '#22d3ee', label: 'Cyan' },
  { value: '#34d399', label: 'Emerald' },
  { value: '#fbbf24', label: 'Amber' },
  { value: '#f43f5e', label: 'Rose' },
  { value: '#a78bfa', label: 'Violet' },
  { value: '#f97316', label: 'Orange' },
  { value: '#0ea5e9', label: 'Sky' },
  { value: '#84cc16', label: 'Lime' },
]
</script>

<template>
  <UiCard title="Colors" :icon="Palette" iconClass="text-amber-400">
    <div class="flex flex-col gap-3">
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-zinc-500 uppercase tracking-wider">Focus</label>
        <div class="flex gap-1.5 flex-wrap">
          <button
            v-for="color in colorPresets"
            :key="'p-' + color.value"
            class="size-6 sm:size-7 rounded-lg border-2 transition-all cursor-pointer"
            :class="
              settingsStore.settings.colors.pomodoro === color.value
                ? 'border-white scale-110'
                : 'border-transparent hover:border-zinc-600'
            "
            :style="{ backgroundColor: color.value }"
            @click="settingsStore.settings.colors.pomodoro = color.value"
          />
        </div>
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-zinc-500 uppercase tracking-wider"
          >Short Break</label
        >
        <div class="flex gap-1.5 flex-wrap">
          <button
            v-for="color in colorPresets"
            :key="'s-' + color.value"
            class="size-6 sm:size-7 rounded-lg border-2 transition-all cursor-pointer"
            :class="
              settingsStore.settings.colors.shortBreak === color.value
                ? 'border-white scale-110'
                : 'border-transparent hover:border-zinc-600'
            "
            :style="{ backgroundColor: color.value }"
            @click="settingsStore.settings.colors.shortBreak = color.value"
          />
        </div>
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-zinc-500 uppercase tracking-wider">Long Break</label>
        <div class="flex gap-1.5 flex-wrap">
          <button
            v-for="color in colorPresets"
            :key="'l-' + color.value"
            class="size-6 sm:size-7 rounded-lg border-2 transition-all cursor-pointer"
            :class="
              settingsStore.settings.colors.longBreak === color.value
                ? 'border-white scale-110'
                : 'border-transparent hover:border-zinc-600'
            "
            :style="{ backgroundColor: color.value }"
            @click="settingsStore.settings.colors.longBreak = color.value"
          />
        </div>
      </div>
    </div>
  </UiCard>
</template>
