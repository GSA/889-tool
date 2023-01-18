<script setup>
    import { computed, createApp, h } from 'vue'
    import { jsPDF } from "jspdf"; 
    import PDFView from '@/views/PDFView.vue'

    const WARN_IF_FEWER_THAN_DAYS = 30

    const props = defineProps({
        'entity': Object
    })

    function downloadPDF() {
        const doc = new jsPDF({
            orientation: 'p',
            unit: 'px',
            format: 'letter',
            putOnlyUsedFonts:true,
            floatPrecision: 16,
            hotfixes: ["px_scaling"]
        });
       
        const tempApp = createApp({
            render() {
                return h(PDFView, {
                    entityData: props.entity
                })
            }
        })

        // in Vue 3 we need real element to mount not just a v-node
        const el = document.createElement('body');
        const mountedApp = tempApp.mount(el)

        const rendered =  mountedApp.$el.outerHTML
        const doc_title = `Record of Section 889 Compliance - ${props.entity.entityRegistration.legalBusinessName}.pdf`

        doc.html(rendered, {
            callback: function (doc) {
                doc.save(doc_title);
            },
            autoPaging: 'text',
            html2canvas: {
                dpi: 300,
                scale: 1,
                letterRendering: true,
            },
            x: 50,
            y: 50,
            windowWidth: 712,
            width: 712,
        });
    }

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

    const downloadLabel = computed(() => "Download PDF for " + props.entity.entityRegistration.legalBusinessName);
 
</script>
<template>
    <div class="grid-row border-1px border-base-lighter gidr-row flex-no-wrap margin-bottom-1">
        <span v-if="isSelectable" class="grid-row ">
            <button    
                @click="downloadPDF"
                aria-label="download pdf"
                class="item text-white usa-button flex-align-center grid-row font-sans-xl margin-right-3 radius-0">
                <svg aria-hidden="true" focusable="false" role="img" class="usa-icon" :aria-labelledby=downloadLabel>
                    <title :id=downloadLabel>{{downloadLabel}}</title>
                    <use xlink:href="@/assets/images/sprite.svg#file_download">
                    </use>
                </svg>
           </button> 
        </span>            
        <span v-else class="grid-row ">
            <button disabled="true"
                aria-label="No pdf download available"
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
            <ul class="padding-0 margin-0 entity-info">
                <li class="margin-right-2" data-test="address">{{condensedAddress}}</li>
                <li class="margin-right-2"> SAM: {{entity.entityRegistration.ueiSAM}}</li>
                <li  v-if="hasCageCode"> CAGE: {{entity.entityRegistration.cageCode}}</li>
            </ul>
            
        </div>
    </div>
</template>