<script setup>
import {onMounted } from 'vue'
import { useSearchStore } from '@/stores/search'

import SearchInput from "../components/SearchInput.vue";
import SearchResults from "../components/SearchResults.vue";
import GSAHeader from "../components/GSAHeader.vue"

const store = useSearchStore()

onMounted(() => {
    store.initState()
})

</script>

<template>
    <div class="background padding-bottom-2">
    <GSAHeader />
        <div id="main-container" class="wide-layout">
            <main id="main-content">
                <div class="grid-container">
                    <div class="padding-top-2">
                        
                    
                        <SearchInput />
                    
                        <div>
                            <div id="error-message" class="ui negative message" style="display:none"></div>
                            
                            <div id="results-box" class="margin-top-3" > 
                                <!-- style="display:none" -->
                                <!--Contents from AJAX call go here -->
                                <div id="results-list" class="grid-container"></div>

                                <div id="loading-box" class="ui loading placeholder basic segment"></div>
                            </div>
                            
                            
                            <button id="show-more" class="fluid ui bottom attached button"
                                style="margin: none; display: none">
                                <i id="show-more-icon" class="angle double down icon"></i>
                                <p id="show-more-text" style="display: inline"></p>
                            </button>
                
                            <div id="no-results" class="ui segment" style="display:none">
                                No results. Vendors marked “For Official Use Only” will not appear in this search.
                            </div>
                        </div>
                    </div>
                   
                </div>
            </main>
        </div>
    </div>
    <div class="grid-container" v-show="store.loading">
        <h3>Fancy loading animation goes here</h3>
    </div>
    <div class="grid-container" v-show="!store.loading">
        <SearchResults  />
    </div>
</template>
