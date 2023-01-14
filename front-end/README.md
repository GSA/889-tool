# USWDS_vue

This is a front end experimental design testing the viability of using Vue + USWDS to interact with the 889 tool API.


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run build
npm run test:e2e # or `npm run test:e2e:ci` for headless testing
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## USWDS
The site uses USWDS for most styling rather than in-component styles. This may not be the right choice; we should iterate and find the technique that balances ease-of-use with maintainability. 

### Build USWDS assers:

``` sh
npx gulp compile
```

This will build css files from sources in `src/scss` and `node_modules/@uswds` and deposit results in `src/assets`.

See `gulpfile.js` for settings.

## Deploying to Cloud.gov Pages
Because the Vue simply builds a static html/javascript site, it can run from any system that can serve static content. This includes Cloud.gov-Pages (Federalist). The current configuration in `vite.config.js` outputs build artifacts to `_site` where federalist expects to find them. `package.json` includes a `federalist"` script that runs `vite build`. Cloud.gov Pages will watch the github repo for changes on the main branch and re-build files when it changes. 

Currently, using Cloud.gov requires the use of the `createWebHashHistory` style urls. This allows the Vue Router to use URLS that include `#` like `#/search/some_company/2` without trying to load a page at a different path. This allows users to refresh the page or share a link. 

### Environmental variables
The production build will expect to find an env `VITE_API_DOMAIN` pointing to the 889 tool API. This is currently running on cloud.gov.