import { ref, computed} from "vue";
import { defineStore } from "pinia";
import { useRoute } from 'vue-router'

 // see https://vitejs.dev/guide/env-and-mode.html 
// for setting production env
const API_DOMAIN = import.meta.env.VITE_API_DOMAIN
const DEFAULT_PAGE_SIZE = 10;

export const useSearchStore = defineStore("search", () => {
    const data = ref([])
    const error = ref(null)
    const search_text = ref('')
    const currentPageIndex = ref(0)
    const totalRecords = ref(0)

    const numberOfPages = computed(() => Math.ceil(totalRecords.value / DEFAULT_PAGE_SIZE ))
    const showResults = computed(() => data.value.length > 0)

    function gotToPage(page) {
        currentPageIndex.value = page
        fetchResults()
    }

    function fetchResults() {
        error.value = null
        const url_params = {
            samToolsSearch:  search_text.value,
            includeSections: 'samToolsData,entityRegistration,coreData',
            registrationStatus: 'A',
            purposeOfRegistrationCode: 'Z2~Z5',
            entityEFTIndicator: '',
            page: currentPageIndex.value
        }
        const url = new URL(`${API_DOMAIN}/api/entity-information/v3/entities`);
        url.search = new URLSearchParams(url_params);

        fetch(url)
            .then((res) => res.json())
            .then((json) => {
                data.value =  json.entityData
                totalRecords.value = json.totalRecords
            })
            .catch((err) => (error.value = err))
    }

    return {
        data,
        search_text,
        numberOfPages,
        currentPageIndex,
        totalRecords,
        showResults,
        gotToPage,
        fetchResults
    };
});
