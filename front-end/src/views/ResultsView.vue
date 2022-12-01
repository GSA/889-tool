<script setup>
import {onMounted, watch} from 'vue'
import { useSearchStore } from '@/stores/search'
import { useRoute } from 'vue-router'

import SearchInput from "../components/SearchInput.vue";
import LoadingPage from "../components/LoadingPage.vue"
import SearchResults from "../components/SearchResults.vue";
import GSAHeader from "../components/GSAHeader.vue";
import Alert from "../components/Alert.vue";

const route = useRoute()
const store = useSearchStore()

onMounted(() => {
    store.initState()
  
})
watch (
    () => route.params, () => {
        window.scrollTo(0,0);
    }
)
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
        <div class="grid-container" v-if="store.loading">
            <LoadingPage />
        </div>
        <div class="grid-container" v-else>
            <SearchResults />
            <Alert v-if="store.APIMessage" heading="No Results">{{store.APIMessage}}</Alert>
            <Alert v-if="store.error"  heading="Error" status="error">{{store.error}}</Alert>
        </div>
    </div>
</template>
