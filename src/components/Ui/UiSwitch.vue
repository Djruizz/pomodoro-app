<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    label?: string
    name?: string
    hint?: string
    error?: string
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    required?: boolean
  }>(),
  {
    size: 'md',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const trackSizes = computed(() => {
  const sizes = {
    sm: 'w-8 h-4',
    md: 'w-10 h-5',
    lg: 'w-12 h-6',
  }
  return sizes[props.size]
})

const thumbSizes = computed(() => {
  const sizes = {
    sm: 'size-3',
    md: 'size-3.5',
    lg: 'size-4',
  }
  return sizes[props.size]
})

const translateValues = computed(() => {
  const sizes = {
    sm: 'translate-x-4',
    md: 'translate-x-5',
    lg: 'translate-x-6',
  }
  return sizes[props.size]
})

const textSizes = computed(() => {
  const sizes = {
    sm: 'text-sm',
    md: 'text-md',
    lg: 'text-lg',
  }
  return sizes[props.size]
})

const toggle = () => {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue)
  }
}
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <div
      class="flex items-center gap-3 select-none"
      :class="disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'"
      @click="toggle"
    >
      <div
        :class="[
          'shrink-0 rounded-full border transition-all duration-200 mt-0.5 flex items-center',
          trackSizes,
          modelValue
            ? 'bg-cyan-500 border-cyan-500'
            : 'bg-zinc-800/50 border-zinc-700/50 hover:border-zinc-600/50',
        ]"
      >
        <div
          :class="[
            'rounded-full bg-white shadow-md transition-all duration-200 flex',
            thumbSizes,
            modelValue ? translateValues : 'translate-x-0.5',
          ]"
        />
      </div>
      <div class="flex flex-col">
        <span v-if="label" :class="['font-medium text-zinc-300', textSizes]">
          {{ label }} <span class="text-red-500" v-if="required">*</span>
        </span>
      </div>
    </div>
    <p v-if="error" class="text-xs text-red-400">{{ error }}</p>
    <p v-else-if="hint" class="text-xs text-zinc-600">{{ hint }}</p>
  </div>
</template>
