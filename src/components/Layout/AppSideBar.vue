<script setup lang="ts">
import { AlarmClockCheck, Home, Folder, Settings } from '@lucide/vue'
import { compile, computed, type Component } from 'vue'
import { useRoute, useRouter } from 'vue-router'

type Link = {
  label: string
  icon: Component
  to: string
}
const links: Link[] = [
  { label: 'Home', icon: Home, to: '/' },
  { label: 'Pomodoro', icon: AlarmClockCheck, to: '/pomodoro' },
  { label: 'Projects', icon: Folder, to: '/projects' },
]
const endLinks: Link[] = [{ label: 'Settings', icon: Settings, to: '/settings' }]
const route = useRoute()
const router = useRouter()
const isActive = (to: string) => {
  if (to === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(to)
}
const goTo = (to: string) => {
  if (to === '/') {
    router.push(to)
  }
  router.push(to)
}
</script>
<template>
  <aside
    class="w-14 2xl:w-48 shrink-0 bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-2xl p-2.5 flex flex-col gap-1.5"
  >
    <div>
      <a
        v-for="link in links"
        :key="link.to"
        class="flex items-center justify-center 2xl:justify-start gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 cursor-pointer"
        :class="
          isActive(link.to)
            ? 'bg-cyan-500/10 text-cyan-400'
            : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
        "
        @click="goTo(link.to)"
      >
        <component :is="link.icon" class="size-[18px] shrink-0" />
        <span class="hidden 2xl:block truncate">{{ link.label }}</span>
        <span
          v-if="$route.path === link.to"
          class="hidden 2xl:block ml-auto size-1.5 rounded-full bg-cyan-400"
        />
      </a>
    </div>
    <div class="mt-auto">
      <a
        v-for="link in endLinks"
        :key="link.to"
        class="flex items-center justify-center 2xl:justify-start gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 cursor-pointer"
        :class="
          isActive(link.to)
            ? 'bg-cyan-500/10 text-cyan-400'
            : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
        "
        @click="goTo(link.to)"
      >
        <component :is="link.icon" class="size-[18px] shrink-0" />
        <span class="hidden 2xl:block truncate">{{ link.label }}</span>
        <span
          v-if="$route.path === link.to"
          class="hidden 2xl:block ml-auto size-1.5 rounded-full bg-cyan-400"
        />
      </a>
    </div>
  </aside>
</template>
