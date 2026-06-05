<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date'
    label?: string
    name?: string
    placeholder?: string
    hint?: string
    error?: string
    icon?: Component
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    required?: boolean
    min?: number
    max?: number
  }>(),
  {
    type: 'text',
    size: 'md',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  blur: [event: FocusEvent]
}>()

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'px-2.5 py-1.5 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-2.5 text-base',
  }
  return sizes[props.size]
})

const iconSizeClasses = computed(() => {
  const iconSizes = {
    sm: 'size-3.5',
    md: 'size-4',
    lg: 'size-5',
  }
  return iconSizes[props.size]
})

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', props.type === 'number' ? Number(target.value) : target.value)
}
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" class="text-sm font-medium text-zinc-400"
      >{{ label }} <span class="text-red-500" v-if="required">*</span></label
    >
    <div class="relative">
      <component
        v-if="icon"
        :is="icon"
        class="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
        :class="iconSizeClasses"
      />
      <input
        :name="name"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :min="min"
        :max="max"
        :class="[
          'w-full bg-zinc-800/50 border rounded-xl text-zinc-100 placeholder-zinc-600 outline-none transition-all duration-150',
          'focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 focus:bg-zinc-800/80',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error
            ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
            : 'border-zinc-700/50 hover:border-zinc-600/50',
          icon ? 'pl-9' : '',
          sizeClasses,
        ]"
        @input="onInput"
        @blur="emit('blur', $event)"
      />
    </div>
    <p v-if="error" class="text-xs text-red-400">{{ error }}</p>
    <p v-else-if="hint" class="text-xs text-zinc-600">{{ hint }}</p>
  </div>
</template>
