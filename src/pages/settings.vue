<script setup lang="ts">
import { ref } from 'vue'
import { useMediaQuery } from '@vueuse/core'

import PomodoroSettings from '@/components/Settings/PomodoroSettings.vue'
import AudioSettings from '@/components/Settings/AudioSettings.vue'
import ColorSettings from '@/components/Settings/ColorSettings.vue'
import BehaviorSettings from '@/components/Settings/BehaviorSettings.vue'
import DataSettings from '@/components/Settings/DataSettings.vue'
import AboutSettings from '@/components/Settings/AboutSettings.vue'

const isDesktop = useMediaQuery('(min-width: 1024px)')
const pomodoroSettingsRef = ref<InstanceType<typeof PomodoroSettings> | null>(null)

const onReset = () => {
  pomodoroSettingsRef.value?.resetErrors()
}
</script>

<template>
  <div class="h-full">
    <div
      class="grid gap-3"
      :class="{
        'grid-cols-4 h-full ': isDesktop,
        'grid-cols-1 sm:grid-cols-2 ': !isDesktop,
      }"
    >
      <PomodoroSettings
        ref="pomodoroSettingsRef"
        :class="isDesktop ? 'col-span-2' : 'sm:col-span-2'"
      />
      <AudioSettings :class="isDesktop ? 'col-span-1' : 'sm:col-span-2'" />
      <ColorSettings :class="isDesktop ? 'col-span-1' : 'sm:col-span-1'" />
      <BehaviorSettings :class="isDesktop ? 'col-span-1' : 'sm:col-span-1'" />
      <DataSettings :class="isDesktop ? 'col-span-1' : 'sm:col-span-2'" @reset="onReset" />
      <AboutSettings :class="isDesktop ? 'col-span-2' : 'sm:col-span-2'" />
    </div>
  </div>
</template>
