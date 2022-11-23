import { ref, computed, watch} from "vue";
import { defineStore } from "pinia";
import { useRoute } from 'vue-router'

 // see https://vitejs.dev/guide/env-and-mode.html 
// for setting production env
const API_DOMAIN = import.meta.env.VITE_API_DOMAIN
const DEFAULT_PAGE_SIZE = 10;

export const useSearchStore = defineStore("search", () => {
    const data = ref([])
    const loading = ref(false)
    const error = ref(null)
    const emptyResults = ref(false)
    const search_text = ref('')
    const currentPageIndex = ref(0)
    const totalRecords = ref(0)

    const numberOfPages = computed(() => Math.ceil(totalRecords.value / DEFAULT_PAGE_SIZE ))
    const showResults = computed(() => data.value.length > 0)

    const route = useRoute()

    watch (
        () => route.params, (params, old_params) => {
            search_text.value = params.term
            currentPageIndex.value = params.page 
            ? parseInt(params.page) 
            : 0
            fetchResults()
        }
    )

    function initState() {
        search_text.value = route.params.term
        currentPageIndex.value = parseInt(route.params.page) || 0
        fetchResults()
    }

    function fetchResults() {
        loading.value = true
        error.value = null
        emptyResults.value = false
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
                emptyResults.value = totalRecords.value == 0
                loading.value = false
            })
            .catch((err) => {
                console.log("error:", err)
                loading.value = false
                error.value = err
            })
    }

    return {
        data,
        search_text,
        numberOfPages,
        emptyResults,
        currentPageIndex,
        totalRecords,
        showResults,
        loading,
        error,
        initState
    };
});
