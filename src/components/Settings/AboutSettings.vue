<script setup lang="ts">
import UiCard from '@/components/Ui/UiCard.vue'
import { Info, Clock } from '@lucide/vue'
</script>

<template>
  <UiCard title="About" :icon="Info" iconClass="text-sky-400">
    <div class="flex flex-col gap-2">
      <div class="flex items-center gap-3">
        <img src="/ChronestLogoNoBG.png" alt="Chronest" class="size-10" />
        <div>
          <h3 class="text-lg font-semibold text-zinc-100">Chronest</h3>
          <p class="text-xs text-zinc-500">Your productivity nest</p>
        </div>
      </div>
      <p class="text-sm text-zinc-400 mt-1">
        A minimal pomodoro timer with project tracking and task management.
      </p>
      <div class="flex gap-4 mt-1">
        <div class="flex items-center gap-1.5">
          <Clock class="size-3.5 text-zinc-500" />
          <span class="text-xs text-zinc-500">v1.0.0</span>
        </div>
      </div>
    </div>
  </UiCard>
</template>
