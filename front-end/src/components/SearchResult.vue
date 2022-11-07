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
    <div class="grid-row padding-y-3 border-bottom-1px border-base-lighter">
        <div v-if="isSelectable" class="grid-col-auto flex-align-center padding-1 bg-primary margin-right-1 font-sans-xl">
            <a 
                :href="entity.samToolsData.pdfLinks.entityPDF"
                target="_blank" 
                rel="noopener noreferrer" 
                class="item text-white">
                <svg aria-hidden="true" focusable="false" role="img" class="usa-icon">
                    <use xlink:href="@/assets/images/sprite.svg#file_download">
                    </use>
                </svg>
            </a> 
        </div>
        <div class="grid-col-auto">
           
            <div class="text-primary-dark text-bold margin-bottom-1">
                {{entity.entityRegistration.legalBusinessName}}
                <span class="usa-tag margin-left-2" :class="isSelectable ? 'bg-primary' : 'bg-base-dark'">
                    {{entity.samToolsData.eightEightNine.statusText}}
                </span>
                <div class="margin-top-1">
                    <span v-if="isExpiring" class="text-secondary">
                        {{expirationDateText}}
                    </span>
                </div>
            </div>
            <div v-if="dba">
                ({{entity.entityRegistration.dbaName}})
            </div>
            <div v-if="hasWebsite">
                {{websiteURL}}
            </div>
            <div>
                <span class="margin-right-2">{{condensedAddress}}</span>
                <span class="margin-right-2">SAM: {{entity.entityRegistration.ueiSAM}}</span>
                <span v-if="hasCageCode">CAGE: {{entity.entityRegistration.cageCode}}</span>
            </div>
            
        </div>
    </div>
</template>