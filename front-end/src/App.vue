<script setup>
import { RouterView } from "vue-router";
import Banner from "./components/Banner.vue";
import PrototypeAlert from "./components/PrototypeAlert.vue";

</script>

<template>
    <Banner />
    <PrototypeAlert />
    <div id="main-container" class="wide-layout">
        <RouterView />
    </div>

</template>

<style scoped lang="scss">

</style>
