const selectable_entity_prop = {
    "coreData": {
        "entityInformation": {
            "entityDivisionName": null,
            "entityDivisionNumber": null,
            "entityStartDate": "2021-09-23",
            "entityURL": null,
            "fiscalYearEndCloseDate": "12/31",
            "submissionDate": "2022-03-16"
        }, 
        "physicalAddress": {
            "addressLine1": "1110 W 8TH Ave",
            "addressLine2": null,
            "city": "Boston",
            "countryCode": "USA",
            "stateOrProvinceCode": "MA",
            "zipCode": "123456",
            "zipCodePlus4": "3350"
        }
    },
    "entityRegistration": {
            "cageCode": "99DFW",
            "dbaName": null,
            "legalBusinessName": "The Enfield Tennis Academy",
            "registrationExpirationDate": "2023-04-15",
            "ueiSAM": "DFWNCR8KW3Q3"
        },
    "samToolsData": {
        "eightEightNine": {
            "isCompliant": true,
            "statusText": "COMPLIANT"
        },
        "isSelectable": true,
        "pdfLinks": {
            "entityPDF": "http://localhost:8000/api/file-download/summary?ueiSAM=YNPNCR8KW3Q3&entityEFTIndicator="
        }
    }
}
const non_selectable_entity_prop = {
    "coreData": {
        "entityInformation": {
            "entityDivisionName": null,
            "entityDivisionNumber": null,
            "entityStartDate": "2021-09-23",
            "entityURL": null,
            "fiscalYearEndCloseDate": "12/31",
            "submissionDate": "2022-03-16"
        }, 
        "physicalAddress": {
            "addressLine1": "PSC 769 Box 700",
            "addressLine2": "APO AP 96599-9998",
            "city": "McMurdo Station",
            "countryCode": "ATA",
            "zipCode": "123456",
            "zipCodePlus4": "3350"
        }
    },
    "entityRegistration": {
            "cageCode": "99DFW",
            "dbaName": null,
            "legalBusinessName": "The Enfield Tennis Academy",
            "registrationExpirationDate": "2023-01-15",
            "ueiSAM": "DFWNCR8KW3Q3"
        },
    "samToolsData": {
        "eightEightNine": {
            "isCompliant": true,
            "statusText": "PROVIDES AND USES COVERED TELECOMMUNICATIONS"
        },
        "isSelectable": false,
        "pdfLinks": {
            "entityPDF": "http://localhost:8000/api/file-download/summary?ueiSAM=YNPNCR8KW3Q3&entityEFTIndicator="
        }
    }
}
      
export {selectable_entity_prop, non_selectable_entity_prop}