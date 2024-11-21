<script setup>

import {onMounted} from "vue";

onMounted (() => {
  let recaptchaScript = document.createElement('script')
  recaptchaScript.async = true;
  recaptchaScript.setAttribute('src', 'https://touchpoints.app.cloud.gov/touchpoints/55c3c7c9.js')
  document.head.appendChild(recaptchaScript)
})

</script>

<template>
  <div class="usa-footer usa-footer--slim">
    <div class="usa-footer__primary-section">
      <div class="usa-footer__primary-container grid-row">
        <div class="mobile-lg:grid-col-8">
          <p class="font-sans-3xs">
            This tool was built by NASA using the <a
              class="text-primary-dark"
              href="https://sam.gov/content/home"
          >SAM.gov</a> Entity Management API.<br>
            We encourage input! Please provide feedback and suggestions to
            <a
              class="text-primary-dark"
              href="mailto:gsa_smartpay@gsa.gov"
            >gsa_smartpay@gsa.gov</a>.
            <br>
          </p>
          <p class="font-sans-3xs">
            <a
              class="text-primary-dark"
              href="https://sam.gov/content/about/disclaimers"
            >Limitation on Permissible Use of Dun & Bradstreet, Inc. (D&B)
              Data</a>
          </p>
        </div>
        <div class="mobile-lg:grid-col-4">
          <button id="touchpoint-survey-889" class="usa-button margin-top-2 margin-bottom-2" type="button">Leave us your feedback</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
</script>