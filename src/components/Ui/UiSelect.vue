<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import type { Component } from 'vue'
import { ChevronDown, Check } from '@lucide/vue'

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    options: { value: string | number; label: string; icon?: Component }[]
    label?: string
    name?: string
    placeholder?: string
    hint?: string
    error?: string
    icon?: Component
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    required?: boolean
  }>(),
  {
    size: 'md',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const isOpen = ref(false)
const containerRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLElement | null>(null)
const dropdownPos = ref({ top: 0, left: 0, width: 0 })

const selectedOption = computed(() => props.options.find((o) => o.value === props.modelValue))

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'px-2.5 py-1.5 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-2.5 text-base',
  }
  return sizes[props.size]
})

const optionSizeClasses = computed(() => {
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

const updatePosition = () => {
  if (triggerRef.value) {
    const rect = triggerRef.value.getBoundingClientRect()
    dropdownPos.value = {
      top: rect.bottom + window.scrollY + 6,
      left: rect.left + window.scrollX,
      width: rect.width,
    }
  }
}

const toggle = () => {
  if (props.disabled) return
  if (!isOpen.value) updatePosition()
  isOpen.value = !isOpen.value
}

const select = (value: string | number) => {
  emit('update:modelValue', value)
  isOpen.value = false
}

const handleClickOutside = (e: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

const handleScroll = () => {
  if (isOpen.value) updatePosition()
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', handleScroll, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', handleScroll, true)
})
</script>

<template>
  <div class="flex flex-col gap-1.5" ref="containerRef">
    <label v-if="label" class="text-sm font-medium text-zinc-400">
      {{ label }} <span class="text-red-500" v-if="required">*</span>
    </label>

    <div class="relative">
      <component
        v-if="icon"
        :is="icon"
        class="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none z-10"
        :class="iconSizeClasses"
      />

      <button
        ref="triggerRef"
        type="button"
        :disabled="disabled"
        :class="[
          'w-full flex items-center justify-between text-zinc-100 bg-zinc-800/50 border rounded-xl text-left outline-none transition-all duration-150 cursor-pointer',
          'focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 focus:bg-zinc-800/80',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error
            ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
            : isOpen
              ? 'border-cyan-500/50 ring-1 ring-cyan-500/20 bg-zinc-800/80'
              : 'border-zinc-700/50 hover:border-zinc-600/50',
          icon ? 'pl-9' : '',
          sizeClasses,
        ]"
        @click="toggle"
      >
        <span class="flex items-center gap-2 min-w-0">
          <template v-if="selectedOption">
            <component
              v-if="selectedOption.icon"
              :is="selectedOption.icon"
              class="size-4 shrink-0"
            />
            <span class="truncate">{{ selectedOption.label }}</span>
          </template>
          <span v-else class="text-zinc-600">{{ placeholder }}</span>
        </span>
        <ChevronDown
          class="size-4 text-zinc-500 shrink-0 transition-transform duration-200"
          :class="{ 'rotate-180': isOpen }"
        />
      </button>

      <Teleport to="body">
        <Transition
          enter-active-class="transition-all duration-150 ease-out"
          enter-from-class="opacity-0 -translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-100 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-1"
        >
          <div
            v-if="isOpen"
            class="fixed z-9999 bg-zinc-800 border border-zinc-700/50 rounded-xl shadow-lg shadow-black/30"
            :style="{
              top: dropdownPos.top + 'px',
              left: dropdownPos.left + 'px',
              width: dropdownPos.width + 'px',
            }"
          >
            <div class="max-h-60 overflow-y-auto py-1">
              <button
                v-for="option in options"
                :key="option.value"
                type="button"
                :class="[
                  'w-full flex items-center gap-2 text-left transition-colors cursor-pointer',
                  optionSizeClasses,
                  option.value === modelValue
                    ? 'bg-cyan-500/10 text-cyan-400'
                    : 'text-zinc-300 hover:bg-zinc-700/50 hover:text-zinc-100',
                ]"
                @click.stop="select(option.value)"
              >
                <component v-if="option.icon" :is="option.icon" class="size-4 shrink-0" />
                <span class="flex-1 truncate">{{ option.label }}</span>
                <Check v-if="option.value === modelValue" class="size-4 shrink-0 text-cyan-400" />
              </button>
            </div>
          </div>
        </Transition>
      </Teleport>
    </div>

    <p v-if="error" class="text-xs text-red-400">{{ error }}</p>
    <p v-else-if="hint" class="text-xs text-zinc-600">{{ hint }}</p>
  </div>
</template>
