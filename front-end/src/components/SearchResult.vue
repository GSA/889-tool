<script setup>
import {computed, createApp, h} from "vue";
import {OK_TEXT, WARN_TEXT} from "@/strings.js";
import {jsPDF} from "jspdf";
import PDFView from "@/views/PDFView.vue";

const props = defineProps({
  entity: {
    type: Object,
    required: true
  }
});

function downloadPDF() {
  const doc = new jsPDF({
    orientation: "p",
    unit: "px",
    format: "letter",
    putOnlyUsedFonts: true,
    floatPrecision: 16,
    hotfixes: ["px_scaling"],
  });

  const tempApp = createApp({
    render() {
      return h(PDFView, {
        entityData: props.entity,
      });
    },
  });

  // in Vue 3 we need real element to mount not just a v-node
  const el = document.createElement("body");
  const mountedApp = tempApp.mount(el);

  const rendered = mountedApp.$el.outerHTML;
  const doc_title = `Record of Section 889 Representations - ${props.entity.entityRegistration.legalBusinessName}.pdf`;

  doc.html(rendered, {
    callback: function (doc) {
      doc.save(doc_title);
    },
    autoPaging: "text",
    html2canvas: {
      dpi: 300,
      scale: 1,
      letterRendering: true,
    },
    x: 50,
    y: 50,
    windowWidth: 712,
    width: 712,
  });
}

const dba = computed(() => props.entity.entityRegistration.dbaName);
const hasCageCode = computed(() => props.entity.entityRegistration.cageCode);
const hasWebsite = computed(
    () => props.entity.coreData.entityInformation.entityURL,
);
const isSelectable = computed(() => props.entity.samToolsData.isSelectable);

const websiteURL = computed(() => {
  const URL = props.entity.coreData.entityInformation.entityURL;
  return URL.replace(/^http:\/\//g, "")
      .replace(/^https:\/\//g, "")
      .replace(/\/$/g, "")
      .toLowerCase();
});

const condensedAddress = computed(() => {
  const city = props.entity.coreData.physicalAddress.city;
  const state = props.entity.coreData.physicalAddress.stateOrProvinceCode;
  const country = props.entity.coreData.physicalAddress.countryCode;

  return state ? `${city}, ${state} ${country}` : `${city} ${country}`;
});

const formattedExpirationDateText = computed(() => {
  const validTo = new Date(
      props.entity.entityRegistration.registrationExpirationDate,
  );
  validTo.setUTCHours(0, 0, 0, 0)
  const year = new Intl.DateTimeFormat("en", {year: "numeric", timeZone: "UTC"}).format(
      validTo,
  );
  const month = new Intl.DateTimeFormat("en", {month: "2-digit", timeZone: "UTC"}).format(
      validTo,
  );
  const day = new Intl.DateTimeFormat("en", {day: "2-digit", timeZone: "UTC"}).format(validTo);
  return `Expiration Date: ${month}-${day}-${year}`;
});

const downloadLabel = computed(
    () => "Download PDF for " + props.entity.entityRegistration.legalBusinessName,
);

const downloadLabelId = computed(
    () => downloadLabel.value.toLowerCase().replace(/\s+/g, '-'),
);


</script>
<template>
  <div
      class="grid-row border-1px border-base-lighter flex-no-wrap margin-bottom-1"
  >
    <span
        v-if="isSelectable"
        class="grid-row"
    >
      <button
          aria-label="download pdf"
          class="item text-white usa-button flex-align-center grid-row font-sans-xl margin-right-3 radius-0"
          @click="downloadPDF"
      >
        <svg
            aria-hidden="true"
            focusable="false"
            role="img"
            class="usa-icon"
            :aria-label="downloadLabel"
        >
          <title :id="downloadLabelId">{{ downloadLabel }}</title>
          <use xlink:href="@/assets/images/sprite.svg#file_download"/>
        </svg>
      </button>
    </span>
    <span
        v-else
        class="grid-row"
    >
      <button
          disabled="true"
          aria-label="No pdf download available"
          class="item text-white usa-button flex-align-center grid-row font-sans-xl margin-right-3 radius-0"
      >
        <svg
            focusable="true"
            role="img"
            class="usa-icon"
            :aria-label="WARN_TEXT"
        >
          <title id="no-download">{{ WARN_TEXT }}</title>
          <use xlink:href="@/assets/images/sprite.svg#remove_circle"/>
        </svg>
      </button>
    </span>
    <div class="grid-col margin-1 margin-left-0">
      <div class="grid-row margin-bottom-1">
        <div class="grid-col-12 tablet:grid-col">
          <div class="text-primary-dark text-bold">
                  <span
                      class="margin-right-1"
                      data-test="business-name"
                  >
                    {{ entity.entityRegistration.legalBusinessName }}
                  </span>
            <span
                v-if="isSelectable"
                class="text-success font-body-md text-middle"
                data-test="889-status"
                data-position="top"
                :title="OK_TEXT"
            >
                    <svg
                        class="usa-icon"
                        focusable="true"
                        :aria-label="OK_TEXT"
                        role="img"
                    >
                      <title id="green-check">{{ OK_TEXT }}</title>
                      <use xlink:href="@/assets/images/sprite.svg#check_circle"/>
                    </svg>
                  </span>
            <span
                v-else
                class="text-secondary font-body-md text-middle"
                data-test="889-status"
                data-position="top"
                :title="WARN_TEXT"
            >
                    <svg
                        class="usa-icon"
                        aria-hidden="true"
                        :aria-label="WARN_TEXT"
                        focusable="false"
                        role="img"
                    >
                      <title id="warning-icon">{{ WARN_TEXT }}</title>
                      <use xlink:href="@/assets/images/sprite.svg#warning"/>
                    </svg>
                  </span>
          </div>
        </div>
        <div class="grid-col-12 tablet:grid-col-auto">
          <span data-test="expiration-date">{{ formattedExpirationDateText }}</span>
        </div>
      </div>
      <div class="grid-row">
        <div class="grid-col-auto">
          <div v-if="dba">
            ({{ entity.entityRegistration.dbaName }})
          </div>
          <div v-if="hasWebsite">
            {{ websiteURL }}
          </div>
          <ul class="padding-0 margin-0 entity-info">
            <li
                class="margin-right-2"
                data-test="address"
            >
              {{ condensedAddress }}
            </li>
            <li class="margin-right-2">
              SAM.gov UEI: {{ entity.entityRegistration.ueiSAM }}
            </li>
            <li v-if="hasCageCode">
              CAGE: {{ entity.entityRegistration.cageCode }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
