<template>
  <div
    class="grid-row border-1px border-base-lighter gidr-row flex-no-wrap height-10 margin-bottom-1 bg-base-lightest pulse"
  >
    <span class="grid-row width-10 bg-base-light" />
    <div class="grid-col-auto padding-y-2 margin-bottom-1" />
  </div>
</template>
<style scoped>
@keyframes pulse {
  0% {
    transform: scaleY(0.95);
    opacity: 0.2;
  }
  50% {
    transform: scaleY(1);
    opacity: 0.5;
  }
  100% {
    transform: scaleY(0.95);
    opacity: 0.2;
  }
}
.pulse {
  animation: pulse 2s infinite ease-in-out;
}
</style>
