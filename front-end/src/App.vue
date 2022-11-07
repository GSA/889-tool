<script setup>
import { RouterLink, RouterView } from "vue-router";
import Banner from "./components/Banner.vue";
import GSAHeader from "./components/GSAHeader.vue";
import PrototypeAlert from "./components/PrototypeAlert.vue";

</script>

<template>
    <Banner />
    <PrototypeAlert />
    <GSAHeader />
    <div id="main-container" class="wide-layout">
        <RouterView />
    </div>

</template>

<style scoped lang="scss">

</style>
