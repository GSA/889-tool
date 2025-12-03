<script setup>
import { computed } from "vue";

const props = defineProps({
  errorMessage: {
    type: String,
    default: "We are aware that some users are experiencing issues with search functionality on the 889 Representations Search. The GSA technical team is working to resolve this and ensure accurate search results. We appreciate your patience.",
  },
  showError: {
    type: Boolean,
    default: true,
  },
});

const hasError = computed(() => {
  return props.showError && props.errorMessage;
});
</script>

<template>
  <div
    v-if="hasError"
    class="usa-alert margin-y-2 usa-alert--info"
    role="alert"
    data-test="search-error"
  >
    <div class="usa-alert__body">
      <h4
        class="usa-alert__heading"
        data-test="error-heading"
      >
        Attention
      </h4>
      <p
        class="usa-alert__text"
        data-test="error-message"
      >
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.usa-alert {
  max-width: 100%;
}
</style>
