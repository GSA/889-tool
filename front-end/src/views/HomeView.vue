<script setup>
import Search from "../components/Search.vue";
import GSAHeader from "../components/GSAHeader.vue"
</script>

<template>
    <GSAHeader />
    <main id="main-content">
        <div class="grid-container">
            <div class="padding-y-5 border-bottom-1px border-base-lighter">
                <h2 class="font-sans-lg margin-bottom-1"> 
                    Check to see if a vendor is section 889 compliant
                </h2>
                
                <p class="margin-top-0">Search by business name, website, CAGE code, or SAM Unique Entity ID</p>
                <Search />
                
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
            <div class="padding-y-3">
                <h3>How do I use this tool?</h3>
                <p>
                    The 889 Compliance Search checks for a vendor's section section 889 compliance in their SAM record.
                    You'll be able to download the vendor's compliance records.
                    For full vendor records, visit <a href="https://sam.gov">sam.gov</a>
                </p>
                <p>
                    <strong>Note: </strong>Although vendors only doing business within the Micro-Purchase Threshold (MPT)
                    are not required to register in SAM, vendors who do business both above and below the MPT are required
                    to register in SAM. Vendors marked as "For Official Use Only" in SAM will not appear in the search.
                    Entities without Representation & Certifications are also omitted from the search results.
                    If a vendor is not registered in SAM, you may request the vendor sign a 
                    <a href="/static/downloads/NF1883.pdf">Vendor Representation Form</a>
                </p>
            </div>
        </div>

    </main>
</template>
