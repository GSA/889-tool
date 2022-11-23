<script setup>
import SearchInput from "../components/SearchInput.vue";
import GSAHeader from "../components/GSAHeader.vue"
</script>

<template >
    <div  class="background flex-fill">
    
    <GSAHeader />
        <div id="main-container" class="wide-layout">
            <main id="main-content">
                <div class="grid-container">
                    <div class="padding-top-10">
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
                        <p>This search checks for section 889 compliance in a vendor's SAM record. Although vendors only doing business within the Micro-Purchase Threshold (MPT) are not required to register in SAM, vendors who do business both above and below the MPT are required to register in SAM. Vendors marked as "For Official Use Only" in SAM will not appear in this search. Entities without Representations & Certifications are omitted from the search results. If a vendor is not registered in SAM, you may request the vendor sign a <a href="/static/downloads/NF1883.pdf">Vendor Representation Form</a>.</p>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>
