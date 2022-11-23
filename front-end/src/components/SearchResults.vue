<script setup>
    import SearchResult from './SearchResult.vue'
    import PageNavigation from './PageNavigation.vue'
    import { useSearchStore } from '@/stores/search'
    import { useRouter } from 'vue-router'

    const store = useSearchStore()
    const router = useRouter()
    
    function setPageParam(page) {
        router.push({ name: 'search', params: { page: page } })
    }

</script>
<template>
    <div id="results"  class="margin-top-3">
        <div v-for="item in store.data" >
            <SearchResult :entity="item" />
        </div>
    </div>
    
    <PageNavigation 
        v-if='store.numberOfPages > 1' 
        :numberOfPages="store.numberOfPages" 
        :currentPage="store.currentPageIndex" 
        @goto-page="setPageParam" />
    
</template>
