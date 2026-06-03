<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Timer, ListTodo } from '@lucide/vue'

const router = useRouter()
</script>
<template>
  <div class="flex flex-col items-center justify-center h-full gap-6">
    <div class="flex flex-col items-center gap-2 text-center">
      <h1 class="text-3xl font-bold text-zinc-100 tracking-tight">Welcome back</h1>
      <p class="text-sm text-zinc-500">What would you like to focus on today?</p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
      <button
        class="flex flex-col items-center gap-3 p-5 bg-zinc-900/80 border border-zinc-800 rounded-2xl hover:border-cyan-500/30 hover:bg-zinc-900 transition-all duration-200 group"
        @click="router.push('/pomodoro')"
      >
        <div class="size-10 rounded-xl bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
          <Timer class="size-5 text-cyan-400" />
        </div>
        <div class="text-center">
          <p class="text-sm font-medium text-zinc-200">Start Focus</p>
          <p class="text-xs text-zinc-500 mt-0.5">25 min session</p>
        </div>
      </button>
      <button
        class="flex flex-col items-center gap-3 p-5 bg-zinc-900/80 border border-zinc-800 rounded-2xl hover:border-cyan-500/30 hover:bg-zinc-900 transition-all duration-200 group"
        @click="router.push('/pomodoro')"
      >
        <div class="size-10 rounded-xl bg-zinc-800/50 flex items-center justify-center group-hover:bg-zinc-800 transition-colors">
          <ListTodo class="size-5 text-zinc-400" />
        </div>
        <div class="text-center">
          <p class="text-sm font-medium text-zinc-200">View Tasks</p>
          <p class="text-xs text-zinc-500 mt-0.5">Manage your work</p>
        </div>
      </button>
    </div>
  </div>
</template>
