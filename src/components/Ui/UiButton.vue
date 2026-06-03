<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'
import { Loader2 } from '@lucide/vue'

const props = withDefaults(
  defineProps<{
    label?: string
    icon?: Component
    size?: 'sm' | 'md' | 'lg'
    variant?: 'solid' | 'outline' | 'ghost'
    loading?: boolean
    disabled?: boolean
  }>(),
  {
    size: 'md',
    variant: 'solid',
    loading: false,
  },
)

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'px-2 py-1 text-sm gap-1.5',
    md: 'px-3 py-2 text-md gap-2',
    lg: 'px-4 py-2.5 text-base gap-2.5',
  }
  return sizes[props.size]
})

const iconSizeClasses = computed(() => {
  const iconSizes = {
    sm: 'size-4',
    md: 'size-5',
    lg: 'size-6',
  }
  return iconSizes[props.size]
})

const variantClasses = computed(() => {
  const variants = {
    solid: 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200',
    outline: 'border border-zinc-600 hover:bg-zinc-800 text-zinc-200',
    ghost: 'hover:bg-zinc-800 text-zinc-200',
  }
  return variants[props.variant]
})
</script>
<template>
  <button
    :class="[
      'flex items-center rounded-lg transition-colors font-medium',
      sizeClasses,
      variantClasses,
    ]"
    :disabled="disabled || loading"
    class="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <component
      :is="loading ? Loader2 : icon"
      :class="[iconSizeClasses, loading ? 'animate-spin' : '']"
    />
    <span v-if="label">{{ label }}</span>
  </button>
</template>
