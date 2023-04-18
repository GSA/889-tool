const OK_TEXT = "Transaction can proceed."
const WARN_TEXT = "The contractor has represented in SAM that it does provide and/or does use covered (i.e., prohibited) telecommunication equipment. Please follow applicable agency procedures."
const NO_RESULT_MESSAGE = `
    Only entities doing business above the Micro-Purchase Threshold (MPT) are required to register in SAM.gov. Contracts that are classified/FOUO or contractors that do not wish for their information to be publicly available will not show up in search results.
    <br/><br /><b>Please Note:</b> If an entity representation is not available, cardholders may still be permitted to purchase from a listed entity. However, the cardholder would be responsible for documenting compliance with Section 889 in accordance with any applicable agency requirements.`
const API_ERROR_MESSAGE = "Sorry, we weren't able to connect to SAM.gov. Please try again later."


export {
    OK_TEXT,
    WARN_TEXT,
    NO_RESULT_MESSAGE,
    API_ERROR_MESSAGE
}