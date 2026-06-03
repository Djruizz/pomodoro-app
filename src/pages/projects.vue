<script setup lang="ts">
import ProjectsList from '@/components/Projects/ProjectsList.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <div class="w-full h-full overflow-hidden">
    <div class="grid grid-cols-1 lg:grid-cols-4 w-full h-full gap-3">
      <div
        class="h-full overflow-hidden"
        :class="route.params.id ? 'lg:col-span-1' : 'lg:col-span-4'"
      >
        <ProjectsList :class="route.params.id ? 'hidden lg:flex' : ''" class="h-full" />
      </div>
      <div v-if="route.params.id" class="col-span-1 lg:col-span-3 h-full overflow-y-auto">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
