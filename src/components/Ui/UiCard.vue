<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  title?: string
  icon?: Component
  iconClass?: string
}>()
</script>
<template>
  <div
    class="flex flex-col bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-2xl p-4 gap-3 min-h-0 overflow-hidden"
  >
    <div
      v-if="title || $slots.right || icon"
      class="flex"
      :class="{ 'justify-end': !(title || icon), 'justify-between': title || icon }"
    >
      <div class="flex items-center gap-2">
        <component v-if="icon" :is="icon" class="size-5 shrink-0" :class="iconClass" />
        <h2
          v-if="title"
          class="text-sm font-semibold text-zinc-400 uppercase tracking-wider shrink-0"
        >
          {{ title }}
        </h2>
      </div>
      <div class="flex gap-1 items-center"><slot name="right" /></div>
    </div>
    <div class="flex flex-col flex-1 min-h-0 gap-3">
      <slot></slot>
    </div>
  </div>
</template>
