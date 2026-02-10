# GSA SmartPay 889 Representations SAM.gov Tool

[![DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/GSA/889-tool)

Jump to:
* [Development setup](#development-and-testing)
* [Production deployment](#production-deployment)
* [Features and API description](#features)

## Overview
The SmartPay 889 Representations SAM.gov Tool is composed of a backend API written in python, and a web-based frontend.

This tool's search capability uses the openGSA SAM.gov Entity Management API. Vendors that have selected "DOES NOT" for both FAR 52.204-26(c)(1) and (2) are marked as compliant. A vendor is not selectable if they do not meet this requirement, do not have an active registration status, or have active exclusions. Selecting a compliant vendor will download PDF record of their compliance.

[You can find more information about the SAM.gov's API here](https://open.gsa.gov/api/entity-api/).

Search results omit entities without representations and certifications, which are those with a "purpose of registration code" of "Federal Assistance Awards" only (Code Z1) and child entities (non-zero/non-null EFT Indicator).

### Objective

The purpose of this tool is to enable the broadest possible user-base, including non-procurement-experts, the ability to determine vendor 889 compliance from their SAM.gov record as quickly as possible and with little or no training.

## Features

The tool performs two main tasks.

1. Search term pre-processing. - Improves the quality of search results returned by the SAM.gov Entities API by modifying the search expression provided by the user. Regular expressions are used to identify SAM.gov UEIs, and US and NATO cage codes. See the search_preprocessor.py file and associated tests in tests/test_search_preprocessor.py
2. Determine entity compliance status. - Call the SAM.gov Entities API and append the response data with a "samToolsData" section for each vendor containing compliance information. See compliance/compliance_rules.py for compliance rules and associated tests in tests/test_compliance_rules.py.

### API Endpoints

The 889 Representations SAM.gov Tool provides a single API endpoint. This endpoint allow for other tools (like the Vue.js front-end) that require 889 compliance data from SAM.gov to obtain this from the tool's. The endpoint is defined in `__init__.py`.

`<HOST_URL>/api/entity-information/v3/entities`

The entity-information endpoint returns the complete information for all vendors in the search results.

The file-download endpoint will return a PDF summary of 889 compliance information, only if there is a single vendor returned by the search, otherwise it will raise an error. CAGE codes are unique to individual entities in SAM.gov. SAM.gov UEIs however include child entities that share the SAM.gov UEI of their parent entity. Therefor if searching using SAM.gov UEIs you must include `&entityEFTIndicator=` to ensure only the parent entities (which have entityEFTIndicator of 0000 - implemented as null) are returned.

Both endpoints use the same arguments as the OpenGSA Entities API, but with two additional arguments.

- A additional argument, 'samToolsSearch' can be used and will use the previously described search pre-processor to set the search arguments before it is passed to the SAM.gov Entities API.
- 'samToolsData' can be included in the 'includeSections' argument of the SAM.gov Entities Management API

Example:

`<HOST_URL>/api/entity-information/v3/entities?samToolsSearch=mcmaster&includeSections=[samToolsData,entityRegistration,coreData]&registrationStatus=A`

## Development and Testing ##
### Prerequisites ###
Before beginning, ensure that you have Python >= 3.8 and that LTS version of Node.js installed on your sytem.
  
Additionally, you **will need to register for a SAM.gov API key**. [You can find more information here](https://open.gsa.gov/api/entity-api/).

Once you have a key, you will need to set the corresponding environment variable locally, for example:

```
export SAM_API_KEY=YOUR_API_KEY
```

### Setting up the backend (Python/FastAPI) environment ###
#### Create a python virtual environment

The SAM.gov Tool comes with a bash script that automates several of the build steps. Alternatively, you can look at the contenst of the script and run the commands as desired. It is just building a python virtual-env and installing dependencies:

```
bash build_samtools.sh
source venv/bin/activate
```
Then install the development dependencies:
```
pip install -r requirements.dev.txt  # install development-only python requirements
```
  
### Setting up the frontend (Node.js/Vue.js) environment ###
Install the required Node.js dependencies:
```sh
npm install
```

### Quickstart for dev ###
To run both the backend and frontend at the same time with a single command:
```sh
npm run dev
```
  
To run just the backend:
```sh
npm run dev:backend
```
  
And to run just the frontend:
```sh
npm run dev:frontend
```

### Running the backend manually ###

#### Run the FastAPI application using uvicorn. The `--reload` will watch for changes and reload the app.

```
uvicorn samtools.wsgi:app --reload
```

#### Optional: use gunicorn as a web server gateway interface (WSGI)

This is not required to run a development instance of FastAPI application, but is the recommended way to run in production.
If you would like to run gunicorn with uvicorn workers (for nice async IO):

```
gunicorn samtools.wsgi:app --workers 2 --worker-class uvicorn.workers.UvicornWorker
```

NOTE: gunicorn runs on port 8000 by default.
  
### Running Tests ###
#### Backend Tests ####
To quickly run the backend tests:
```sh
npm run test:backend
```
  
#### Frontend Tests ####
To quickly run basic frontend tests:
```sh
npm run test:frontend
```
  
##### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

##### Run End-to-End Tests with [Cypress](https://www.cypress.io/)
**NOTE: the framework stubs these e2e tests by default, but we do not have any e2e test cases currently**. We are keeping the capability here for potential future use.
```sh
npm run build
npm run test:e2e # or `npm run test:e2e:ci` for headless testing
```

##### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
 
### Additional frontend commands ###
#### Compile and Hot-Reload for Development

```sh
npm run dev
```

#### Compile and Minify for Production

```sh
npm run build
```
  
#### Build USWDS assets:
The site uses USWDS for most styling rather than in-component styles. This may not be the right choice; we should iterate and find the technique that balances ease-of-use with maintainability. 
  
``` sh
npx gulp compile
```

This will build css files from sources in `src/scss` and `node_modules/@uswds` and deposit results in `src/assets`.

See `gulpfile.js` for settings.

## Production Deployment 
### Frontend (Cloud.gov Pages)
Because the Vue simply builds a static html/javascript site, it can run from any system that can serve static content. This includes Cloud.gov-Pages (Federalist). The current configuration in `vite.config.mjs` outputs build artifacts to `_site` where federalist expects to find them. `package.json` includes a `federalist"` script that runs `vite build`. Cloud.gov Pages will watch the github repo for changes on the main branch and re-build files when it changes. 

Currently, using Cloud.gov requires the use of the `createWebHashHistory` style urls. This allows the Vue Router to use URLS that include `#` like `#/search/some_company/2` without trying to load a page at a different path. This allows users to refresh the page or share a link. 

#### Environment variables
The production build will expect to find an env `VITE_API_DOMAIN` pointing to the 889 tool API. This is currently running on cloud.gov.

### Backend (FastAPI on Cloud.gov)

#### Create a cloud.gov instance
Your cloud.gov account must have the `SpaceDeveloper` role in each space in order to run these scripts.

#### Bootstrap the cloud.gov environment
Before the first deployment, you need to run the bootstrap script, where `SPACE` is one of `dev`, `test`, `staging`, or `prod`. This will create all the necessary services that are required to deploy the app in that space.

```
bin/cg-bootstrap-space.sh SPACE
```

You can monitor the services deployment status with `cf services`. It can take quite a while to fully provision everything. Once the services are ready, you can bootstrap the application:

```
bin/cg-bootstrap-app.sh SPACE
```

#### Create cloud.gov service accounts
*Note: Only one service account is needed for a cloud.gov space. We don't need to do this if there is an existing service*
Create a service account for each space. These accounts will be used by GitHub Actions to deploy the app. Since we are currently manually deploying to the `test` space, we do not need a service account for that space.

```
bin/cg-service-account-create.sh SPACE
```

Take note of the username and password it creates for each space.

#### Configure the GitHub environments

1. [Create environments in the GitHub repository](https://github.com/GSA/889-tool/settings/environments) that correspond with each space that GitHub Actions will deploy to (i.e., `dev`, `staging`, and `prod`)
2. Within each GitHub environment, configure:
    * The app's secrets
        * `CG_USERNAME`: The service account username for this space
        * `CG_PASSWORD`: The service account password for this space
        * `SAM_API_KEY`: The API Key for making requests to the SAM API


### Confirm GitHub Actions are working

At this point, GitHub Actions should be able to deploy to all configured environments.
### Deploying for Google Cloud Platform
Although this application can be hosted in many environments, the configuration is currently designed for hosting on Google App Engine. 

In order to deploy to App Engine you will need to install Google's [CLI tool](https://cloud.google.com/sdk), which will give you access to the `gcloud` command line command. See the [deployment guide](https://cloud.google.com/build/docs/deploying-builds/deploy-appengine) for more information.

When deploying we send both the Python app and a production build of the Vue front end appliction. This means if you make changes to the Vue app, you need to run rebuild it. See also `/front-end/README` folder for details on running the Vue App.

```
cd front-end
npm run build
```

There are a few configuration files that influence how this is built:

- `/front-end/env.procuction` [or `env.devleopment`] - This should have the environmental variable `VITE_API_DOMAIN` pointing to the root url.
- `/front-end/vite.config.mjs` - make sure the base url is set correctly. It should just be `'/'` for app engine but might be different on a gloud.gov sandbox that is served from a different url. The output directory should be `../www` which will create the build folder which is sent to Google.

Once the front-end is built, we can upload everything to App Engine. App Engine settings are defined in:

`/app.yaml`   
set up urls, instance type, etc. This also imports a file `env_variables.yaml` which is not in the git repo. You can create this file and add environmental variables to it that you don't want checked into git. For example, you might make:

`/env_variables.yaml`:
```
env_variables:
  SAM_API_KEY: MY_API_KEY
```

`/.gcloudignore` you shouldn't upload everything to app engine (especially big folders like virtual envs and node_modules). You can ask it not to send these things in a way similar to .gitignore.

You will need to authenticate with [following these instructions](`https://cloud.google.com/sdk/gcloud/reference/auth/login`). Probably just:

```
gcloud auth login
```

Then from the same directory as `app.yaml` run:

```
gcloud app deploy
```

You can see if any packages have newer versions with `pip list --outdated` and `npm outdated`

---

## Acknowledgements

The NASA 889 Representations SAM.gov Tool was developed by Benjamin Jensen, Godfrey Sauti, Anne Haley, Charles Liles, Sally Kim, and Emilie Siochi. Policy guidance from Tracy Hall. Please contact us at benjamin.d.jensen@nasa.gov, godfrey.sauti-1@nasa.gov, tracy.h.hall@nasa.gov.

---

## Note

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
