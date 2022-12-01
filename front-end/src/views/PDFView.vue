<script setup>
    import {computed} from 'vue';

    const props = defineProps(['entityData'])
    
    console.log("props:", props.entityData)
    const date_generated = computed(() => new Date().toLocaleDateString('en-us', { year:"numeric", month:"long", day:"numeric"}) )
    const host_url = "the GSA 889 tool" // todo get correct value

    const address = computed(() => {
        const address = props.entityData.coreData.physicalAddress
        const zip = address.zipCodePlus4
        ? `${address.zipCode}+${address.zipCodePlus4}`
        :  address.zipCode 

        const city_state = address.stateOrProvinceCode 
        ? `${address.city}, ${address.stateOrProvinceCode} ${zip}`
        : `${address.city}, ${zip}`

        const data = [
            address.addressLine1,
            address.addressLine2,
            city_state,
            address.countryCode
        ]
        
        return data.filter(Boolean).join('<br \>')
    })
</script>

<template>


<div class="main_div">
    <h1>Summary of SAM Data</h1>
    <p>
        Generated on {{ date_generated }} by {{ host_url }} from sam.gov data using the openGSA SAM Entity Management API.<br />
    </p>
    <br />

    <hr>

    <h2 style='text-align: center;'>Entity Registration Summary</h2>
    <p style='margin-bottom: 0;'>Summary for:</p>
    <h2 style='margin-top: 0;margin-bottom: 0;'>{{ entityData['entityRegistration']['legalBusinessName'] }}</h2>
    <p style='margin-top: 0;'>
        <span v-if="entityData['entityRegistration']['dbaName']">
            ({{ entityData['entityRegistration']['dbaName'] }})<br /> 
        </span>
        <span v-if="entityData['coreData']['entityInformation']['entityURL']">
            {{ entityData['coreData']['entityInformation']['entityURL'] }}<br /> 
        </span>
        SAM: <b>{{ entityData['entityRegistration']['ueiSAM'] }}</b> <br /> 
        CAGE: <b>{{ entityData['entityRegistration']['cageCode'] }}</b>
    </p>
    
    <p v-html="address"></p>
     
    <p>
        Registration Status: <b>{{ entityData['samToolsData']['registration']['statusText'] }}</b><br/>
        <span id='highlight'>Has Active Exclusion? <b>{{ entityData['samToolsData']['exclusions']['statusText'] }}</b></span><br/>
        Activation Date: <b>{{ entityData['entityRegistration']['activationDate'] }}</b><br/>
        <span id='highlight'>Expiration Date: <b>{{ entityData['entityRegistration']['registrationExpirationDate'] }}</b></span><br/>
    </p>
    <h3 style='text-align: center;'>(End of Entity Registration Summary)</h3>

    <hr>

    <h2 style='text-align: center;'>889 Compliance Section</h2>
    <p>
        <span id='highlight'>889 Compliance Summary:<b>
            {{ entityData['samToolsData']['eightEightNine']['elaboratedStatusText'] }}
        </b></span>
    </p> 
    <p><b>The contractor has represented as follows in 
    FAR 52.204-26 (c)
    <span v-if="entityData['samToolsData']['eightEightNine']['farProvisionDate'] ">
        ({{entityData['samToolsData']['eightEightNine']['farProvisionDate']}})
    </span>
    , Covered Telecommunications Equipment or Services-Representation:
    </b></p>
    

    <p v-if="entityData['samToolsData']['eightEightNine']['farText']['52.204-26.c.1']">
        {{ entityData['samToolsData']['eightEightNine']['farText']['52.204-26.c.1'] }}
    </p>
    <p v-if="entityData['samToolsData']['eightEightNine']['farText']['52.204-26.c.2']">
        {{ entityData['samToolsData']['eightEightNine']['farText']['52.204-26.c.2'] }}
    </p>
    
    <h3 style='text-align: center;'>(End of 889 Compliance Section)</h3>

    <hr>
    
    <br />
    <p>
        The full vendor record can be viewed at: <br /> 
        <a  href="https://sam.gov/entity/{{entityData['entityRegistration']['ueiSAM']}}/repsAndCerts?status=active">
            https://sam.gov/entity/{{entityData['entityRegistration']['ueiSAM']}}/repsAndCerts?status=active
        </a> 
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
    h1  {font-size: 30px;}
    h2  {font-size: 22px;}
    h3  {font-size: 14px;}
    p   {font-size: 14px;}
    #highlight {background-color: #d2e2fc; padding:0.1em 0.2em;}
</style>