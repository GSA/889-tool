<script setup>
    import { onMounted } from "vue";
    import {OK_TEXT, WARN_TEXT} from "@/strings.js"
    import USWDS from "@uswds/uswds/js";
    const { accordion } = USWDS;

    onMounted(() => accordion.init())

</script>
<template>
<div class="usa-accordion">
    <h4 class="usa-accordion__heading">
        <button
        type="button"
        class="usa-accordion__button"
        aria-expanded="false"
        aria-controls="a1"
        >
        Definition of symbols 
        </button>
    </h4>
    <div id="a1" class="usa-accordion__content usa-prose">
        <ul class="usa-icon-list">
            <li class="usa-icon-list__item">
                <div class="usa-icon-list__icon text-success">
                    <svg class="usa-icon" aria-hidden="true" role="img">
                        <use xlink:href="@/assets/images/sprite.svg#check_circle"></use>
                    </svg>
                </div>
                <div class="usa-icon-list__content">
                    {{ OK_TEXT }}
                </div>
            </li>
            <li class="usa-icon-list__item">
                <div class="usa-icon-list__icon text-secondary">
                    <svg class="usa-icon" aria-hidden="true" role="img">
                        <use xlink:href="@/assets/images/sprite.svg#warning"></use>
                    </svg>
                </div>
                <div class="usa-icon-list__content">
                    {{ WARN_TEXT }}
                </div>
            </li>
        </ul>



       
    </div>
</div>
</template>