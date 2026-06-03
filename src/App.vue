<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/Layout/AppHeader.vue'
import AppSideBar from './components/Layout/AppSideBar.vue'
</script>

<template>
  <div class="h-screen flex flex-col bg-zinc-950 p-3 gap-3">
    <AppHeader />
    <div class="flex flex-1 min-h-0 gap-3">
      <AppSideBar />
      <main class="flex-1 min-w-0 overflow-y-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style>
@import './assets/main.css';
</style>
