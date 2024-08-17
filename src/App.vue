<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'

const route = useRoute()

const showNavBar = computed(() => route.meta.showNavBar)

</script>

<template>
  <header>
    <NavBar v-if="showNavBar" />
  </header>

  <RouterView />
</template>

<style scoped></style>
