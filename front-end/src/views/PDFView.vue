<script setup>
import { computed } from "vue";

const props = defineProps({
  "entityData": {
    type: Object,
    required: true
  }
  });

const date_generated = computed(() =>
  new Date().toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
);
const host_url = "the SmartPay 889 tool";

const address = computed(() => {
  const address = props.entityData.coreData.physicalAddress;
  const zip = address.zipCodePlus4
    ? `${address.zipCode}+${address.zipCodePlus4}`
    : address.zipCode;

  const city_state = address.stateOrProvinceCode
    ? `${address.city}, ${address.stateOrProvinceCode} ${zip}`
    : `${address.city}, ${zip}`;

  const data = [
    address.addressLine1,
    address.addressLine2,
    city_state,
    address.countryCode,
  ];

  return data.filter(Boolean).join("<br />");
});

function formatDate(date) {
  const validTo = new Date(date);
  validTo.setUTCHours(0, 0, 0, 0)
  const year = new Intl.DateTimeFormat("en", {year: "numeric", timeZone: "UTC"}).format(
      validTo,
  );
  const month = new Intl.DateTimeFormat("en", {month: "2-digit", timeZone: "UTC"}).format(
      validTo,
  );
  const day = new Intl.DateTimeFormat("en", {day: "2-digit", timeZone: "UTC"}).format(validTo);
  return `${month}-${day}-${year}`;
}
</script>

<template>
  <div class="main_div">
    <h1>Summary of SAM.gov Data</h1>
    <p>
      Generated on {{ date_generated }} by {{ host_url }} from SAM.gov data
      using the openGSA SAM.gov Entity Management API.<br>
    </p>
    <br>

    <hr>

    <h2 style="text-align: center">
      Entity Registration Summary
    </h2>
    <p style="margin-bottom: 0">
      Summary for:
    </p>
    <h2 style="margin-top: 0; margin-bottom: 0">
      {{ entityData["entityRegistration"]["legalBusinessName"] }}
    </h2>
    <p style="margin-top: 0">
      <span v-if="entityData['entityRegistration']['dbaName']">
        ({{ entityData["entityRegistration"]["dbaName"] }})<br>
      </span>
      <span v-if="entityData['coreData']['entityInformation']['entityURL']">
        {{ entityData["coreData"]["entityInformation"]["entityURL"] }}<br>
      </span>
      SAM.gov UEI: <b>{{ entityData["entityRegistration"]["ueiSAM"] }}</b>
      <br>
      CAGE: <b>{{ entityData["entityRegistration"]["cageCode"] }}</b>
    </p>

    <!--  eslint-disable-next-line vue/no-v-html -->
    <p v-html="address" />

    <p>
      Registration Status:
      <b>{{ entityData["samToolsData"]["registration"]["statusText"] }}</b><br>
      <span id="highlight">Has Active Exclusion?
        <b>{{
          entityData["samToolsData"]["exclusions"]["statusText"]
        }}</b></span><br>
      Activation Date:
      <b>{{ formatDate(entityData["entityRegistration"]["activationDate"]) }}</b><br>
      <span id="highlight">Expiration Date:
        <b>{{ formatDate(entityData["entityRegistration"]["registrationExpirationDate"]) }}</b></span><br>
    </p>
    <h3 style="text-align: center">
      (End of Entity Registration Summary)
    </h3>

    <hr>

    <h2 style="text-align: center">
      889 Representations Section
    </h2>
    <p>
      <span id="highlight">889 Representations Summary:<b>
        {{
          entityData["samToolsData"]["eightEightNine"]["elaboratedStatusText"]
        }}
      </b></span>
    </p>
    <p>
      <b>The contractor has represented as follows in FAR 52.204-26 (c)
        <span
          v-if="
            entityData['samToolsData']['eightEightNine']['farProvisionDate']
          "
        >
          ({{
            entityData["samToolsData"]["eightEightNine"]["farProvisionDate"]
          }})
        </span>
        , Covered Telecommunications Equipment or Services-Representation:
      </b>
    </p>

    <p
      v-if="
        entityData['samToolsData']['eightEightNine']['farText']['52.204-26.c.1']
      "
    >
      {{
        entityData["samToolsData"]["eightEightNine"]["farText"]["52.204-26.c.1"]
      }}
    </p>
    <p
      v-if="
        entityData['samToolsData']['eightEightNine']['farText']['52.204-26.c.2']
      "
    >
      {{
        entityData["samToolsData"]["eightEightNine"]["farText"]["52.204-26.c.2"]
      }}
    </p>

    <h3 style="text-align: center">
      (End of 889 Representations Section)
    </h3>

    <hr>

    <br>
    <p>
      The full entity record can accessed at:
      <a href="https://sam.gov/"> https://SAM.gov/ </a>
    </p>
  </div>
</template>

<style scoped>
@page {
  size: letter;
  margin: 0.25in;
}
.main_div {
  /* font-family: Helvetica Neue,Helvetica,Roboto,Arial,sans-serif!important; */
  font-family: sans-serif;
  border: 15px solid #d3d3d3;
  padding: 20px;
  letter-spacing: 0.01px; /* This avoids a jsPDF bug that adds extra space betwee letters */
}
h1 {
  font-size: 30px;
}
h2 {
  font-size: 22px;
}
h3 {
  font-size: 14px;
}
p {
  font-size: 14px;
}
#highlight {
  background-color: #d2e2fc;
  padding: 0.1em 0.2em;
}
</style>
