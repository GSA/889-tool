<script setup>
import { onMounted, watch } from "vue";
import { useSearchStore } from "@/stores/search";
import { useRoute } from "vue-router";

import SearchInput from "../components/SearchInput.vue";
import LoadingPage from "../components/LoadingPage.vue";
import SearchResults from "../components/SearchResults.vue";
import GSAHeader from "../components/GSAHeader.vue";
import Alert from "../components/Alert.vue";
import AccordionKey from "../components/AccordionKey.vue";
import SearchError from "../components/SearchError.vue";

const route = useRoute();
const store = useSearchStore();

onMounted(() => {
  store.initState();
});
watch(
  () => route.params,
  () => {
    window.scrollTo(0, 0);
  },
);
</script>

<template>
  <main
    id="main-content"
    class="wide-layout flex-fill"
  >
    <div class="background padding-bottom-2">
      <GSAHeader />
      <div id="main-container">
        <div class="grid-container">
           <SearchError
            />
          <div class="padding-top-2">
            <p class="margin-top-0">
              Search by business name, website, CAGE code, or SAM.gov Unique
              Entity ID (UEI)
            </p>
            <SearchInput />
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="store.loading"
      class="grid-container"
    >
      <LoadingPage />
    </div>
    <div
      v-else
      class="grid-container"
    >
      <div class="margin-y-1em grid-row">
        Displaying {{ store.totalRecords }} results
      </div>
      <AccordionKey v-if="!store.APIMessage && !store.error" />
      <SearchResults />
      <Alert
        v-if="store.APIMessage"
        heading="No Results"
      >
        <!--  eslint-disable-next-line vue/no-v-html -->
        <span v-html="store.APIMessage" />
      </Alert>
      <Alert
        v-if="store.error"
        heading="Error"
        status="error"
      >
        {{
          store.error
        }}
      </Alert>
    </div>
  </main>
</template>
