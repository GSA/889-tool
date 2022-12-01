<script setup>
    import LoadingResult from './LoadingResult.vue'
</script>
<template>
    <div class="margin-top-3">
        <div  v-for="index in 10" :key="index">
            <LoadingResult />
        </div>
    </div>
</template>