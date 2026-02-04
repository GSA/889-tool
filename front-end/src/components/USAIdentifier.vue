<template>
  <div class="usa-identifier">
    <section
      class="usa-identifier__section usa-identifier__section--masthead"
      aria-label="Agency identifier,"
    >
      <div class="usa-identifier__container grid-row">
        <div class="grid-col-12 desktop:grid-col-8 display-flex flex-column desktop:flex-row">
          <div class="usa-identifier__logos tablet:margin-top-0 display-flex desktop:display-block ">
            <a
                href=""
                class="usa-identifier__logo"
            ><img
                class="usa-identifier__logo-img"
                src="@/assets/images/gsa-logo.svg"
                alt="GSA logo"
            ></a>
          </div>
          <section
              class="usa-identifier__identity margin-top-2 desktop:margin-top-0"
              aria-label="Agency description,"
          >
            <p class="usa-identifier__identity-domain">
              889.smartpay.gsa.gov
            </p>
            <p class="usa-identifier__identity-disclaimer">
              An official website of the
              <a href="https://gsa.gov">General Services Administration</a>
            </p>
          </section>
        </div>
        <div class="grid-col-12 desktop:grid-col-4 display-flex flex-row flex-align-center padding-top-4 desktop:padding-top-0 desktop:flex-justify-end">
          <section class="usa-identifier__identity flex-align-end flex-column desktop:display-flex grid-col-auto desktop:grid-col-5 margin-top-0"
                   aria-label="NASA">
            <p class="usa-identifier__identity-domain text-right">
              Created in partnership with
            </p>
          </section>
          <div class="margin-left-1">
            <img
                class="usa-identifier__logo-img height-7"
                src="@/assets/images/nasa-logo.svg"
                alt="NASA logo"
            >
          </div>
        </div>
      </div>
    </section>
    <nav
      class="usa-identifier__section usa-identifier__section--required-links"
      aria-label="Important links,"
    >
      <div class="usa-identifier__container">
        <ul class="usa-identifier__required-links-list">
          <li class="usa-identifier__required-links-item">
            <a
              href="https://www.gsa.gov/about-us"
              class="usa-identifier__required-link usa-link"
            >About GSA</a>
          </li>
          <li class="usa-identifier__required-links-item">
            <a
              href="https://www.gsa.gov/website-information/accessibility-statement"
              class="usa-identifier__required-link usa-link"
            >Accessibility statement</a>
          </li>
          <li class="usa-identifier__required-links-item">
            <a
              href="https://www.gsa.gov/reference/freedom-of-information-act-foia"
              class="usa-identifier__required-link usa-link"
            >FOIA requests</a>
          </li>
          <li class="usa-identifier__required-links-item">
            <a
              href="https://www.gsa.gov/reference/civil-rights-programs/notification-and-federal-employee-antidiscrimination-and-retaliation-act-of-2002"
              class="usa-identifier__required-link usa-link"
            >No FEAR Act data</a>
          </li>
          <li class="usa-identifier__required-links-item">
            <a
              href="https://www.gsaig.gov/"
              class="usa-identifier__required-link usa-link"
            >Office of the Inspector General</a>
          </li>
          <li class="usa-identifier__required-links-item">
            <a
              href="https://www.gsa.gov/reference/reports/budget-performance"
              class="usa-identifier__required-link usa-link"
            >Performance reports</a>
          </li>
          <li class="usa-identifier__required-links-item">
            <a
              href="https://www.gsa.gov/website-information/website-policies"
              class="usa-identifier__required-link usa-link"
            >Privacy policy</a>
          </li>
          <li class="usa-identifier__required-links-item">
            <a
              href="https://www.whitehouse.gov/america250/"
              class="usa-identifier__required-link usa-link"
            >White House America 250</a>
          </li>
          <li class="usa-identifier__required-links-item">
            <a
              href="https://america250.org/"
              class="usa-identifier__required-link usa-link"
            >America 250</a>
          </li>
        </ul>
      </div>
    </nav>
    <section
      class="usa-identifier__section usa-identifier__section--usagov"
      aria-label="U.S. government information and services,"
    >
      <div class="usa-identifier__container">
        <div class="usa-identifier__usagov-description">
          Looking for U.S. government information and services?&nbsp;
        </div>

        <a
          href="https://www.usa.gov/"
          class="usa-link--external"
        >Visit USA.gov</a>
      </div>
    </section>
  </div>
</template>
<script setup>
</script>