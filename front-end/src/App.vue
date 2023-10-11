<script setup>
import { RouterView } from "vue-router";
import Banner from "./components/Banner.vue";
import GSAFooter from "./components/GSAFooter.vue";
import USAIdentifier from "./components/USAIdentifier.vue";
</script>

<template>
  <Banner />
  <RouterView />
  <footer class="flex-shrink-0">
    <GSAFooter />
    <USAIdentifier />
  </footer>
</template>
