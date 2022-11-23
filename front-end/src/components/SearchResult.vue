<script setup>
    import { computed } from 'vue'
    const WARN_IF_FEWER_THAN_DAYS = 30

    const props = defineProps({
        'entity': Object
    })

    const dba = computed(() => props.entity.entityRegistration.dbaName)
    const hasCageCode = computed(() => props.entity.entityRegistration.cageCode)
    const hasWebsite = computed(() => props.entity.coreData.entityInformation.entityURL)
    const isSelectable = computed(() =>  props.entity.samToolsData.isSelectable )

    const websiteURL = computed(() => {
        const URL = props.entity.coreData.entityInformation.entityURL
        return URL.replace(/^http:\/\//g, '')
        .replace(/^https:\/\//g, '')
        .replace(/\/$/g, '')
        .toLowerCase(); 
    })

    const condensedAddress = computed(() => {
        const city = props.entity.coreData.physicalAddress.city
        const state = props.entity.coreData.physicalAddress.stateOrProvinceCode
        const country = props.entity.coreData.physicalAddress.countryCode

        return state
        ? `${city}, ${state} ${country}`
        : `${city} ${country}`  
    })

    const isExpiring = computed(() => {
            const validTo = new Date(props.entity.entityRegistration.registrationExpirationDate);
            const warningDaysFromNow = new Date();
            warningDaysFromNow.setDate(warningDaysFromNow.getDate() + WARN_IF_FEWER_THAN_DAYS);
            return validTo < warningDaysFromNow
        
    })
    const expirationDateText = computed(() => {
            const validTo = new Date(props.entity.entityRegistration.registrationExpirationDate);
            const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(validTo);
            const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(validTo);
            const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(validTo);
             return `Expiring registration: ${month}. ${day}, ${year}`
    })
 
</script>
<template>
    <div class="grid-row border-y-2px border-base-lighter gidr-row flex-no-wrap">
        <a v-if="isSelectable" :href="entity.samToolsData.pdfLinks.entityPDF" class="grid-row" target="_blank"  rel="noopener noreferrer"  >
            <button         
                class="item text-white usa-button flex-align-center grid-row font-sans-xl margin-right-3 radius-0">
                <svg aria-hidden="true" focusable="false" role="img" class="usa-icon" aria-labelledby="download-pdf">
                    <title id="download-pdf">Download PDF</title>
                    <use xlink:href="@/assets/images/sprite.svg#file_download">
                    </use>
                </svg>
            </button> 
        </a>
        <span v-else class="grid-row ">
            <button disabled="true"
                class="item text-white usa-button flex-align-center grid-row font-sans-xl margin-right-3 radius-0">
                <svg aria-hidden="true" focusable="false" role="img" class="usa-icon" aria-labelledby="no-download">
                    <title id="no-download">No download</title>
                    <use xlink:href="@/assets/images/sprite.svg#remove_circle">
                    </use>
                </svg>
            </button> 
        </span>

        <div class="grid-col-auto padding-y-2">    
            <div class="text-primary-dark text-bold margin-bottom-1 grid-row">
                <span class="margin-right-2" data-test="business-name">
                    {{entity.entityRegistration.legalBusinessName}}
                </span>
                <span class="usa-tag margin-right-2" data-test="889-status" :class="isSelectable ? 'bg-primary' : 'bg-base-dark'">
                    {{entity.samToolsData.eightEightNine.statusText}}
                </span>
            </div>
            <div class="margin-y-1">
                    <span v-if="isExpiring" class="text-secondary" data-test="expiration-date">
                        {{expirationDateText}}
                    </span>
                </div>
            <div v-if="dba">
                ({{entity.entityRegistration.dbaName}})
            </div>
            <div v-if="hasWebsite">
                {{websiteURL}}
            </div>
            <div>
                <span class="margin-right-2" data-test="address">{{condensedAddress}}</span>
                <span class="margin-right-2">SAM: {{entity.entityRegistration.ueiSAM}}</span>
                <span v-if="hasCageCode">CAGE: {{entity.entityRegistration.cageCode}}</span>
            </div>
            
        </div>
    </div>
</template>