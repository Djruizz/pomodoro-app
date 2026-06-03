<script setup lang="ts">
import { computed, watch, onMounted, onUnmounted } from 'vue'
import { X } from '@lucide/vue'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    title?: string
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    size: 'md',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  }
  return sizes[props.size]
})

const close = () => {
  emit('update:modelValue', false)
}

const onBackdropClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget) close()
}

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.modelValue) close()
}

watch(
  () => props.modelValue,
  (open) => {
    document.body.style.overflow = open ? 'hidden' : ''
  },
)

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        @click="onBackdropClick"
      >
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-2"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-2"
        >
          <div
            v-if="modelValue"
            :class="[
              'w-full bg-zinc-900/95 backdrop-blur-md border border-zinc-800 rounded-2xl shadow-2xl shadow-black/40 flex flex-col',
              sizeClasses,
            ]"
          >
            <div
              v-if="title || $slots.header"
              class="flex items-center justify-between px-6 py-4 border-b border-zinc-800/80"
            >
              <slot name="header">
                <h2 class="text-base font-semibold text-zinc-100">{{ title }}</h2>
              </slot>
              <button
                class="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
                @click="close"
              >
                <X class="size-4" />
              </button>
            </div>

            <div class="px-6 py-5 flex-1 overflow-y-auto">
              <slot></slot>
            </div>

            <div
              v-if="$slots.footer"
              class="px-6 py-4 border-t border-zinc-800/80 flex items-center justify-end gap-2"
            >
              <slot name="footer"></slot>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
