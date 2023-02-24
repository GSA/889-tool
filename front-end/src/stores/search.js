import { ref, computed, watch} from "vue";
import { defineStore } from "pinia";
import { useRoute } from 'vue-router'

 // see https://vitejs.dev/guide/env-and-mode.html 
// for setting production env
const API_DOMAIN = import.meta.env.VITE_API_DOMAIN
const DEFAULT_PAGE_SIZE = 10;
const NO_RESULT_MESSAGE = `
    Only entities doing business above the Micro-Purchase Threshold (MPT) are required to register in SAM.gov. Contracts that are classified/FOUO or contractors that do not wish for their information to be publicly available will not show up in search results.
    <br/><br /><b>Please Note:</b> If an entity representation is not available, cardholders may still be permitted to purchase from a listed entity. However, the cardholder would be responsible for documenting compliance with Section 889 in accordance with any applicable agency requirements.`
const API_ERROR_MESSAGE = "Sorry, we weren't able to connect to SAM.gov. Please try again later."

export const useSearchStore = defineStore("search", () => {
    const data = ref([])
    const loading = ref(false)
    const error = ref('')
    const APIMessage = ref('')
    const search_text = ref('')
    const currentPageIndex = ref(0)
    const totalRecords = ref(0)

    const numberOfPages = computed(() => Math.ceil(totalRecords.value / DEFAULT_PAGE_SIZE ))
    const showResults = computed(() => data.value.length > 0)

    const route = useRoute()

    watch (
        () => route.params, (params, old_params) => {
            if ('term' in params || 'page' in params) {
                search_text.value = params.term
                currentPageIndex.value = params.page 
                ? parseInt(params.page) 
                : 0
                fetchResults()
            }
        }
    )

    function resetState() {
        search_text.value = ''
        currentPageIndex.value = 0
    }

    function initState() {
        search_text.value = route.params.term
        currentPageIndex.value = parseInt(route.params.page) || 0
        fetchResults()
    }

    function fetchResults() {
        loading.value = true
        error.value = ''
        APIMessage.value = ''
        const url_params = {
            samToolsSearch:  search_text.value,
            includeSections: 'samToolsData,entityRegistration,coreData',
            registrationStatus: 'A',
            purposeOfRegistrationCode: 'Z2~Z5',
            entityEFTIndicator: '',
            page: currentPageIndex.value || 0
        }
        const url = new URL(`${API_DOMAIN}/api/entity-information/v3/entities`);
        url.search = new URLSearchParams(url_params);

        fetch(url)
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(res)
            })
            .then(json => {
                data.value =  json.entityData
                totalRecords.value = json.totalRecords
                if (totalRecords.value == 0){
                    APIMessage.value = NO_RESULT_MESSAGE
                }
                loading.value = false
            })
            .catch((err) => {
                loading.value = false
                error.value = API_ERROR_MESSAGE
            })
    }

    return {
        data,
        search_text,
        numberOfPages,
        APIMessage,
        currentPageIndex,
        totalRecords,
        showResults,
        loading,
        error,
        initState,
        resetState
    };
});
