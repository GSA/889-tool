<script setup>
defineProps({
  /**
   * Total number of pages to show
   */
  linkHome: {
    type: Boolean,
    default: true,
  },
});
</script>
<template>
  <header
    class="usa-header usa-header--extended"
  >
    <div class="usa-navbar border-bottom-1px">
      <div
        v-if="linkHome"
        id="header-logo"
        class="usa-logo"
      >
        <router-link to="/">
          <img
            class="usa-logo-img"
            src="@/assets/images/gsa-smartpay-logo-reverse.svg"
            alt="GSA SmartPay Logo"
            title="U.S. General Services Administration"
          >
        </router-link>
        <router-link to="/">
          <em class="usa-logo__text">889 Representations Search</em>
        </router-link>
      </div>
      <div
        v-else
        id="header-logo"
        class="usa-logo"
      >
        <img
          class="usa-logo-img"
          src="@/assets/images/gsa-smartpay-logo-reverse.svg"
          alt="GSA SmartPay Logo"
          title="U.S. General Services Administration"
        >
        <em class="usa-logo__text">889 Representations Search</em>
      </div>
    </div>
  </header>
</template>
