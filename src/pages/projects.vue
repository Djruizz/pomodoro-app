<script setup lang="ts">
import ProjectsList from '@/components/Projects/ProjectsList.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-4 w-full h-full gap-3">
    <ProjectsList :class="route.params.id ? 'col-span-1' : 'col-span-4'" />
    <div v-if="route.params.id" class="col-span-1 md:col-span-3 xl:col-span-3 h-full">
      <router-view></router-view>
    </div>
  </div>
</template>
