<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Component } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    label?: string
    name?: string
    hint?: string
    error?: string
    icon?: Component
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    required?: boolean
    colors?: string[]
    minBrightness?: number
  }>(),
  {
    size: 'md',
    minBrightness: 100,
    colors: () => [
      '#06b6d4',
      '#10b981',
      '#f59e0b',
      '#f43f5e',
      '#8b5cf6',
      '#f97316',
      '#0ea5e9',
      '#84cc16',
    ],
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const colorInputRef = ref<HTMLInputElement | null>(null)

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1] || '', 16),
        g: parseInt(result[2] || '', 16),
        b: parseInt(result[3] || '', 16),
      }
    : null
}

const getBrightness = (hex: string) => {
  const rgb = hexToRgb(hex)
  if (!rgb) return 255
  return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
}

const lightenColor = (hex: string, targetBrightness: number) => {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex
  const currentBrightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
  if (currentBrightness >= targetBrightness) return hex
  const diff = targetBrightness - currentBrightness
  const r = Math.min(255, Math.round(rgb.r + diff))
  const g = Math.min(255, Math.round(rgb.g + diff))
  const b = Math.min(255, Math.round(rgb.b + diff))
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

const ensureMinBrightness = (hex: string) => {
  if (getBrightness(hex) < props.minBrightness) {
    return lightenColor(hex, props.minBrightness)
  }
  return hex
}

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'px-2.5 py-1.5 text-sm',
    md: 'px-3 py-2 text-md',
    lg: 'px-4 py-2.5 text-lg',
  }
  return sizes[props.size]
})

const dotSizes = computed(() => {
  const sizes = {
    sm: 'size-4',
    md: 'size-5',
    lg: 'size-6',
  }
  return sizes[props.size]
})

const openPicker = () => {
  if (!props.disabled && colorInputRef.value) {
    colorInputRef.value.click()
  }
}

const onColorChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', ensureMinBrightness(target.value))
}

const selectPreset = (color: string) => {
  emit('update:modelValue', ensureMinBrightness(color))
}
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" class="text-sm font-medium text-zinc-400">
      {{ label }} <span class="text-red-500" v-if="required">*</span>
    </label>
    <div class="relative">
      <component
        v-if="icon"
        :is="icon"
        class="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none z-10"
        :class="sizeClasses"
      />
      <div
        :class="[
          'flex items-center gap-3 bg-zinc-800/50 border rounded-xl outline-none transition-all duration-150 cursor-pointer',
          'focus-within:border-cyan-500/50 focus-within:ring-1 focus-within:ring-cyan-500/20 focus-within:bg-zinc-800/80',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error
            ? 'border-red-500/50 focus-within:border-red-500/50 focus-within:ring-red-500/20'
            : 'border-zinc-700/50 hover:border-zinc-600/50',
          icon ? 'pl-9' : '',
          sizeClasses,
        ]"
        @click="openPicker"
      >
        <div
          :class="['rounded-lg shrink-0 border border-zinc-700/50', dotSizes]"
          :style="{ backgroundColor: modelValue }"
        />
        <span class="flex-1 text-zinc-300 uppercase">{{ modelValue }}</span>
        <input
          ref="colorInputRef"
          type="color"
          :name="name"
          :value="modelValue"
          :disabled="disabled"
          class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          @input="onColorChange"
        />
      </div>
    </div>
    <div v-if="colors.length > 0" class="flex gap-1.5 mt-1">
      <button
        v-for="color in colors"
        :key="color"
        type="button"
        class="w-6 h-6 rounded-full border-2 transition-all duration-150 cursor-pointer hover:scale-110"
        :class="modelValue === color ? 'border-white scale-110' : 'border-transparent'"
        :style="{ backgroundColor: color }"
        @click.stop="selectPreset(color)"
      />
    </div>
    <p v-if="error" class="text-xs text-red-400">{{ error }}</p>
    <p v-else-if="hint" class="text-xs text-zinc-600">{{ hint }}</p>
  </div>
</template>
