<script setup>
import { useSearchStore } from "@/stores/search";
import { useRouter } from "vue-router";

const store = useSearchStore();
const router = useRouter();

function setSearchParam() {
  router.push({ name: "search", params: { term: store.search_text } });
}
</script>
<template>
  <form
    id="form"
    role="search"
    class="usa-search usa-search--big"
    @submit.prevent="setSearchParam"
  >
    <label
      class="usa-sr-only"
      for="search-field-en-big"
    >
      Search by business name, website, CAGE code, or SAM.gov Unique Entity ID
      (UEI)
    </label>
    <input
      id="input"
      v-model="store.search_text"
      class="usa-input border-base-lighter grid-col flex-12"
      type="search"
      required
      pattern=".*\S+.*"
      title="Enter a search term"
      maxlength="100"
    >
    <button
      class="usa-button"
      type="submit"
    >
      <span class="usa-search__submit-text">Search </span><img
        src="@/assets/images/usa-icons-bg/search--white.svg"
        class="usa-search__submit-icon"
        alt="Search"
      >
    </button>
  </form>
</template>
