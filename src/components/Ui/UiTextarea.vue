<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    label?: string
    name?: string
    placeholder?: string
    hint?: string
    error?: string
    rows?: number
    resize?: 'none' | 'sm' | 'md' | 'lg'
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    required?: boolean
    maxlength?: number
  }>(),
  {
    rows: 3,
    resize: 'md',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'px-2.5 py-1.5 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-2.5 text-base',
  }
  return sizes[props.size ?? 'md']
})

const resizeClasses = computed(() => {
  const resizes = {
    none: 'resize-none',
    sm: 'resize-y',
    md: 'resize-y',
    lg: 'resize',
  }
  return resizes[props.resize]
})
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" class="text-sm font-medium text-zinc-300">
      {{ label }} <span class="text-red-500" v-if="required">*</span>
    </label>
    <textarea
      :value="modelValue"
      :name="name"
      :placeholder="placeholder"
      :rows="rows"
      :disabled="disabled"
      :required="required"
      :maxlength="maxlength"
      :class="[
        'rounded-lg border bg-zinc-800/50 text-zinc-100 placeholder-zinc-500 transition-colors duration-150 h-full',
        'focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20',
        error
          ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
          : 'border-zinc-700/50 hover:border-zinc-600/50',
        sizeClasses,
        resizeClasses,
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-text',
      ]"
      @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
    <div class="flex justify-between items-center">
      <p v-if="error" class="text-xs text-red-400">{{ error }}</p>
      <p v-else-if="hint" class="text-xs text-zinc-600">{{ hint }}</p>
      <span v-if="maxlength" class="text-xs text-zinc-600">
        {{ String(modelValue ?? '').length }} / {{ maxlength }}
      </span>
    </div>
  </div>
</template>
