<script setup>
import { RouterView } from "vue-router";
import Banner from "./components/Banner.vue";
import PrototypeAlert from "./components/PrototypeAlert.vue";
import GSAFooter from "./components/GSAFooter.vue";
import USAIdentifier from "./components/USAIdentifier.vue";

</script>

<template>
    <Banner />
    <PrototypeAlert />
    <div id="main-container" class="wide-layout">
        <RouterView />
    </div>
    <GSAFooter />
    <USAIdentifier />

</template>

<style scoped lang="scss">

</style>
