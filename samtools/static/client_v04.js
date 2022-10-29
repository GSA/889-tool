// capture some HTML elements as referencable objects
const resultsBox = document.getElementById('results-box');
const loadingBox = document.getElementById('loading-box');
const resultsList = document.getElementById('results-list');
const errorMessage = document.getElementById('error-message');
const form = document.getElementById('form');
const input = document.getElementById('input');
const showMore = document.getElementById('show-more');
const showMoreText = document.getElementById('show-more-text');
const showMoreIcon = document.getElementById('show-more-icon');
const noResults = document.getElementById('no-results');
const WARN_IF_FEWER_THAN_DAYS = 30;
const LOTS_OF_RESULTS = 40;
const DEFAULT_PAGE_SIZE = 10;

const getNonSelectableElement = function (
  legalBusinessName,
  eightEightNine,
  exclusions,
  dbaName,
  entityURL,
  city,
  stateOrProvinceCode,
  countryCode,
  ueiSAM,
  cageCode,
) {
  const resultRow = document.createElement('div');
  resultRow.className = 'grid-row padding-y-3 border-bottom-1px border-base-lighter';
  const link_col = document.createElement('div')
  link_col.className = 'grid-col-auto'

  const downloadIcon = getDownloadIcon();
  downloadIcon.style = 'visibility:hidden';
  link_col.appendChild(downloadIcon);
  resultRow.appendChild(link_col)

  const content_col = document.createElement('div');
  content_col.className = 'grid-col-auto';

  const listItemContentHeader = document.createElement('div');
  listItemContentHeader.innerHTML = legalBusinessName;

  // It may be confusing to users if a non-selectable entity has mixed acceptable and non-acceptable labels.
  // Therefore, only show the reason the entity is non-selectable and hide check that passed.
  if (!eightEightNine.isCompliant) {
    const entityComplianceLabel = document.createElement('div');
    entityComplianceLabel.className = 'ui horizontal black label';
    entityComplianceLabel.innerHTML = eightEightNine.statusText;
    listItemContentHeader.appendChild(entityComplianceLabel);
  }
  if (exclusions.has_exclusions) {
    const entityComplianceLabel = document.createElement('div');
    entityComplianceLabel.className = 'ui horizontal black label';
    entityComplianceLabel.innerHTML = exclusions.statusText;
    listItemContentHeader.appendChild(entityComplianceLabel);
  }
  content_col.appendChild(listItemContentHeader);

  if (dbaName) {
    resultsListItemContent.appendChild(getDbaNameElement(dbaName));
  }

  if (entityURL) {
    resultsListItemContent.appendChild(getWebsiteElement(entityURL));
  }

  const resultsListItemContent = document.createElement('div');
  resultsListItemContent.appendChild(
    getAddressAndCodesElement(city, stateOrProvinceCode, countryCode, ueiSAM, cageCode),
  );
  content_col.appendChild(resultsListItemContent);
  resultRow.appendChild(content_col)
  return resultRow;};

const getSelectableElement = function (
  legalBusinessName,
  pdfLinks,
  eightEightNine,
  registrationExpirationDate,
  dbaName,
  entityURL,
  city,
  stateOrProvinceCode,
  countryCode,
  ueiSAM,
  cageCode,
) {
  const resultRow = document.createElement('div');
  resultRow.className = 'grid-row padding-y-3 border-bottom-1px border-base-lighter';
  const link_col = document.createElement('div')
  link_col.className = 'grid-col-auto'

  const resultsListItemAnchor = document.createElement('a');
  resultsListItemAnchor.href = pdfLinks.entityPDF;
  resultsListItemAnchor.target = '_blank';
  resultsListItemAnchor.rel = 'noopener noreferrer';
  resultsListItemAnchor.className = 'item';

  resultsListItemAnchor.appendChild(getDownloadIcon());
  link_col.appendChild(resultsListItemAnchor)
  resultRow.appendChild(link_col)

  const content_col = document.createElement('div')
  content_col.className = 'grid-col-auto'

  const resultsListItemContent = document.createElement('div');

  resultsListItemContent.appendChild(
    getSelectableItemHeader(legalBusinessName, eightEightNine, registrationExpirationDate),
  );

  if (dbaName) {
    resultsListItemContent.appendChild(getDbaNameElement(dbaName));
  }

  if (entityURL) {
    resultsListItemContent.appendChild(getWebsiteElement(entityURL));
  }

  resultsListItemContent.appendChild(
    getAddressAndCodesElement(city, stateOrProvinceCode, countryCode, ueiSAM, cageCode),
  );
  content_col.appendChild(resultsListItemContent);
  resultRow.appendChild(content_col)
  return resultRow;
};

const getSelectableItemHeader = function (
  legalBusinessName,
  eightEightNine,
  registrationExpirationDate,
) {
  const itemHeader = document.createElement('div');
  itemHeader.className = 'text-primary-dark text-bold';
  itemHeader.innerHTML = legalBusinessName;

  itemHeader.appendChild(getSelectableComplianceLabel(eightEightNine));

  const registrationExpirationLabel = getRegistrationExpirationLabel(registrationExpirationDate);
  if (registrationExpirationLabel) {
    itemHeader.appendChild(registrationExpirationLabel);
  }
  return itemHeader;
};

const getSelectableComplianceLabel = function (eightEightNine) {
  const complianceLabel = document.createElement('span');
  complianceLabel.className = 'usa-tag';
  complianceLabel.innerHTML = eightEightNine.statusText;
  return complianceLabel;
};

const getRegistrationExpirationLabel = function (registrationExpirationDate) {
  const validTo = new Date(registrationExpirationDate);
  const today = new Date();
  const warningDaysFromNow = today.addDays(WARN_IF_FEWER_THAN_DAYS);
  if (validTo < warningDaysFromNow) {
    const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(validTo);
    const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(validTo);
    const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(validTo);
    const entityValidToLabel = document.createElement('div');
    entityValidToLabel.className = 'ui horizontal orange label';
    entityValidToLabel.innerHTML = `Expiring registration: ${month}. ${day}, ${year}`;
    return entityValidToLabel;
  }
};

const getDownloadIcon = function () {
  const downloadIcon = document.createElement('i');
  downloadIcon.className = 'large file download middle aligned icon';
  return downloadIcon;
};

const getDbaNameElement = function (dbaName) {
  const element = document.createElement('div');
  element.className = 'description';
  element.style = 'padding-top: 0.2em;';
  element.innerHTML += '(' + dbaName + ')';
  return element;
};

const getWebsiteElement = function (URL) {
  const element = document.createElement('div');
  element.className = 'description';
  element.style = 'padding-top: 0.2em;';
  element.innerHTML += URL.replace(/^http:\/\//g, '')
    .replace(/^https:\/\//g, '')
    .replace(/\/$/g, '')
    .toLowerCase();
  return element;
};

const getAddressAndCodesElement = function (
  city,
  stateOrProvinceCode,
  countryCode,
  ueiSAM,
  cageCode,
) {
  const address = condensedAddress(city, stateOrProvinceCode, countryCode);
  const whitespace = '&nbsp;&nbsp;&nbsp;&nbsp;';
  const element = document.createElement('div');
  element.className = 'description';
  element.style = 'padding-top: 0.4em;';
  element.innerHTML = address;
  element.innerHTML += whitespace + 'SAM: ' + ueiSAM;
  if (cageCode != null) {
    element.innerHTML += whitespace + 'CAGE: ' + cageCode;
  }
  return element;
};

const condensedAddress = function (city, state, country) {
  let address = city + ',';
  if (state) {
    address += ' ' + state;
  }
  address += ' ' + country;
  return address;
};

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

const renderResult = function (entity) {
  if (entity.samToolsData.isSelectable) {
    const resultsListItem = getSelectableElement(
      entity.entityRegistration.legalBusinessName,
      entity.samToolsData.pdfLinks,
      entity.samToolsData.eightEightNine,
      entity.entityRegistration.registrationExpirationDate,
      entity.entityRegistration.dbaName,
      entity.coreData.entityInformation.entityURL,
      entity.coreData.physicalAddress.city,
      entity.coreData.physicalAddress.stateOrProvinceCode,
      entity.coreData.physicalAddress.countryCode,
      entity.entityRegistration.ueiSAM,
      entity.entityRegistration.cageCode,
    );
    resultsList.appendChild(resultsListItem);
  } else {
    const resultsListItem = getNonSelectableElement(
      entity.entityRegistration.legalBusinessName,
      entity.samToolsData.eightEightNine,
      entity.samToolsData.exclusions,
      entity.entityRegistration.dbaName,
      entity.coreData.entityInformation.entityURL,
      entity.coreData.physicalAddress.city,
      entity.coreData.physicalAddress.stateOrProvinceCode,
      entity.coreData.physicalAddress.countryCode,
      entity.entityRegistration.ueiSAM,
      entity.entityRegistration.cageCode,
    );
    resultsList.appendChild(resultsListItem);
  }
};

const updateShowMore = function (response) {
  const currentResultsLength = resultsList.children.length;
  const numResultsLeft = response.totalRecords - currentResultsLength;
  const nextPageLength = Math.min(DEFAULT_PAGE_SIZE, numResultsLeft);
  const nextPageIndex = Math.floor(currentResultsLength / DEFAULT_PAGE_SIZE);

  showMore.style.display = 'block';
  if (currentResultsLength === 0) {
    showMore.style.display = 'none';
    resultsBox.style.display = 'none';
    showMoreIcon.style.display = 'none';
    noResults.style.display = 'inline-block';
  } else {
    if (numResultsLeft > 0) {
      noResults.style.display = 'none';
      showMoreIcon.style.display = 'inline-block';
      showMoreText.innerHTML =
        'Next ' + nextPageLength + ' results (' + numResultsLeft + ' remaining)';
      showMore.onclick = function (event) {
        getNextPage(nextPageIndex);
      };
    } else {
      showMoreIcon.style.display = 'none';
      showMoreText.innerHTML = '';
      showMore.style.display = 'none';
      showMore.onclick = function (event) {
        event.preventDefault();
      };
    }
  }
};

const searchXhttp = new XMLHttpRequest();
searchXhttp.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    loadingBox.style.display = 'none';
    const response = JSON.parse(this.responseText);
    if (response.success) {
      noResults.style.display = 'none';
      for (const entity of response.entityData) {
        renderResult(entity);
      }
      updateShowMore(response);
    } else {
      noResults.style.display = 'none';
      resultsBox.style.display = 'none';
      errorMessage.style.display = 'inherit';
      errorMessage.innerHTML = response.errors[0];
    }
  } else if (this.readyState === 4 && this.status === 404) {
    noResults.style.display = 'none';
    resultsBox.style.display = 'none';
    errorMessage.style.display = 'inherit';
    errorMessage.innerHTML = this.statusText;
  }
};

const getNextPage = function (pageIndex) {
  loadingBox.style.display = 'inherit';
  // send the request with the request object
  const inputValue = input.value
    .replace(/http:\/\//g, '')
    .replace(/https:\/\//g, '')
    .replace(/[&|{}^\\:]/g, ' ');
  searchXhttp.open(
    'GET',
    '/api/entity-information/v3/entities?samToolsSearch=' +
      inputValue +
      '&includeSections=samToolsData,entityRegistration,coreData&registrationStatus=A&purposeOfRegistrationCode=Z2~Z5&entityEFTIndicator=&page=' +
      pageIndex,
    true,
  );
  searchXhttp.send();
};

// form onsubmit function (making a search request)
form.onsubmit = function (event) {
  event.preventDefault();
  resultsBox.style.display = 'inherit';

  resultsList.innerHTML = '';
  errorMessage.innerHTML = '';
  errorMessage.style.display = 'none';

  showMoreIcon.style.display = 'none';
  // showMore.className = 'ui segment';
  showMoreText.innerHTML = '';
  showMore.style.display = 'none';
  showMore.onclick = function (event) {
    event.preventDefault();
  };

  loadingBox.style.display = 'inherit';

  // send the request with the request object
  const inputValue = input.value
    .replace(/http:\/\//g, '')
    .replace(/https:\/\//g, '')
    .replace(/[&|{}^\\:]/g, ' ');
  searchXhttp.open(
    'GET',
    '/api/entity-information/v3/entities?samToolsSearch=' +
      inputValue +
      '&includeSections=samToolsData,entityRegistration,coreData&registrationStatus=A&purposeOfRegistrationCode=Z2~Z5&entityEFTIndicator=',
    true,
  );
  searchXhttp.send();
};
