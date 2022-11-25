<script setup>
import {onMounted } from 'vue'
import { useSearchStore } from '@/stores/search'

import SearchInput from "../components/SearchInput.vue";
import SearchResults from "../components/SearchResults.vue";
import GSAHeader from "../components/GSAHeader.vue";
import Alert from "../components/Alert.vue";

const store = useSearchStore()

onMounted(() => {
    store.initState()
})

</script>

<template>
    <div class="wide-layout flex-fill">

        <div class="background padding-bottom-2">
            <GSAHeader />
            <div id="main-container" >
                <main id="main-content">
                    <div class="grid-container">
                        <div class="padding-top-2">
                            <p class="margin-top-0">Search by business name, website, CAGE code, or SAM Unique Entity ID</p>                  
                            <SearchInput />
                        </div>
                    </div>
                </main>
            </div>
        </div>
        <div class="grid-container" v-show="store.loading">
            <h3>Fancy loading animation goes here</h3>
        </div>
        <div class="grid-container" v-show="!store.loading">
            <SearchResults />

            <Alert v-if="store.APIMessage" heading="No Results">{{store.APIMessage}}</Alert>
            <Alert v-if="store.error"  heading="Error" status="error">{{store.error}}</Alert>
        </div>
    </div>
</template>
