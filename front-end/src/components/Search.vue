<script setup>
    import { computed } from 'vue'
    import SearchResult from './SearchResult.vue'
    import PageNavigation from './PageNavigation.vue'

    import { ref } from 'vue'
    
    // see https://vitejs.dev/guide/env-and-mode.html 
    // for setting production env
    const API_DOMAIN = import.meta.env.VITE_API_DOMAIN

    const DEFAULT_PAGE_SIZE = 10;

    const search_text = ref('')
    const data = ref([])
    const totalRecords = ref(0)
    const currentPageIndex = ref(0)
    const error = ref(null)

    const numberOfPages = computed(() => Math.ceil(totalRecords.value / DEFAULT_PAGE_SIZE ))

    function navigate(index) {
        currentPageIndex.value = index
        fetchResults()
    }

    function getInitialResults() {
        currentPageIndex.value = 0
        fetchResults()
    }

    function fetchResults() {
        //data.value = []
        //totalRecords.value = 0 
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


</script>
<template>
    <form role="search" class="usa-search usa-search--big" id="form" @submit.prevent="getInitialResults">
        <label class="usa-sr-only" for="search-field-en-big">
            Search by business name, website, CAGE code, or SAM Unique Entity ID
        </label>
        <input 
            v-model="search_text"
            id="input" 
            class="usa-input border-base-lighter grid-col flex-12" 
            type="search" 
            placeholder="Search by business name, website, CAGE code, or SAM Unique Entity ID" 
            required pattern=".*\S+.*" 
            title="Enter a search term" 
            autofocus
        >
        <button class="usa-button" type="submit">
            <span class="usa-search__submit-text">Search </span
            ><img
                    src="@/assets/images/usa-icons-bg/search--white.svg"
                    class="usa-search__submit-icon"
                    alt="Search"
            />
        </button>
    </form>
    <div v-if="data" class="margin-top-3">
        <div v-for="item in data" >
            <SearchResult :entity="item" />
        </div>
    </div>
    <PageNavigation v-if='numberOfPages > 1' :numberOfPages="numberOfPages" :currentPage="currentPageIndex" @goto-page="navigate" />
    
</template>
