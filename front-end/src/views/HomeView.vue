<script setup>
    import { onMounted } from 'vue'
    import { useSearchStore } from '@/stores/search'

    import SearchInput from "../components/SearchInput.vue";
    import GSAHeader from "../components/GSAHeader.vue"

    // reset input when coming back to homepage
    const store = useSearchStore()
    onMounted(() => {store.resetState()})
</script>

<template >
    <div  class="background flex-fill">
    
    <GSAHeader :linkHome="false" />
        <div id="main-container" class="wide-layout">
            <main id="main-content">
                <div class="grid-container">
                    <div class="padding-top-8">
                        <h2 class="font-sans-lg margin-bottom-1"> 
                            Check to see if a vendor is section 889 compliant
                        </h2>
                    
                        <p class="margin-top-0">Search by business name, website, CAGE code, or SAM Unique Entity ID</p>
                    
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
                
                            
                        </div>
                    </div>
                    <div class="padding-bottom-10">
                        <p>This tool only checks for Section 889 compliance in a vendor's SAM.gov record. Only vendors doing business above the Micro-Purchase Threshold (MPT) are required to register in SAM.gov. </p>

                        <p><b>Please Note:</b> If a vendor representation is not available, cardholders may still be permitted to purchase from a listed vendor. However, the cardholder would be responsible for Section 889 compliance documentation.</p>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>
