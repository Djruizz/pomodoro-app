<script setup lang="ts">
import { computed } from 'vue'
import { Check } from '@lucide/vue'

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

const boxSizes = computed(() => {
  const sizes = {
    sm: 'size-4',
    md: 'size-5',
    lg: 'size-6',
  }
  return sizes[props.size]
})

const iconSizes = computed(() => {
  const sizes = {
    sm: 'size-3',
    md: 'size-3.5',
    lg: 'size-4',
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
      class="flex items-center gap-3 cursor-pointer select-none"
      :class="disabled ? 'opacity-50 cursor-not-allowed' : ''"
      @click="toggle"
    >
      <div
        :class="[
          'shrink-0 rounded-lg border flex items-center justify-center transition-all duration-150 mt-0.5',
          boxSizes,
          modelValue
            ? 'bg-cyan-500 border-cyan-500'
            : 'bg-zinc-800/50 border-zinc-700/50 hover:border-zinc-600/50',
        ]"
      >
        <Transition
          enter-active-class="transition-all duration-150 ease-out"
          enter-from-class="scale-50 opacity-0"
          enter-to-class="scale-100 opacity-100"
          leave-active-class="transition-all duration-100 ease-in"
          leave-from-class="scale-100 opacity-100"
          leave-to-class="scale-50 opacity-0"
        >
          <Check v-if="modelValue" :class="['text-white', iconSizes]" />
        </Transition>
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
