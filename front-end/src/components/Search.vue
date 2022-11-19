<script setup>
    import SearchResult from './SearchResult.vue'
    import PageNavigation from './PageNavigation.vue'
    import { useSearchStore } from '@/stores/search'

    const store = useSearchStore()

</script>
<template>
    <form role="search" class="usa-search usa-search--big" id="form" @submit.prevent="store.fetchResults">
        <label class="usa-sr-only" for="search-field-en-big">
            Search by business name, website, CAGE code, or SAM Unique Entity ID
        </label>
        <input 
            v-model="store.search_text"
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
    <div v-if="store.data" class="margin-top-3">
        <div v-for="item in store.data" >
            <SearchResult :entity="item" />
        </div>
    </div>
    
    <PageNavigation 
        v-if='store.numberOfPages > 1' 
        :numberOfPages="store.numberOfPages" 
        :currentPage="store.currentPageIndex" 
        @goto-page="store.gotToPage" />
    
</template>
