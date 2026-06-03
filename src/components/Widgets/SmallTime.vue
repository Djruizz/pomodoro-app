<script setup lang="ts">
import { ref } from 'vue'
import { Clock } from '@lucide/vue'

const time = ref('')
const updateTime = () => {
  time.value = new Date().toLocaleTimeString('es-GT', { hour: '2-digit', minute: '2-digit' })
}
updateTime()
setInterval(updateTime, 9999)
</script>
<template>
  <div class="px-3 py-1.5 bg-zinc-800/50 border border-zinc-700/50 rounded-full text-zinc-300 flex items-center gap-2 text-sm tabular-nums">
    <Clock class="size-3.5 text-zinc-500" />
    <span>{{ time }}</span>
  </div>
</template>
