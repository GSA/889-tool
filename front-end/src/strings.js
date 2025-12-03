const OK_TEXT = "Transaction can proceed.";
const WARN_TEXT =
  "This contractor has indicated in SAM.gov that it provides or uses prohibited equipment. Please follow your agency’s procedures.";
const NO_RESULT_MESSAGE = `
    Only entities doing business above the Micro-Purchase Threshold (MPT) are required to register in SAM.gov. Contracts classified as For Official Use Only (FOUO) or contractors who do not wish for their information to be publicly available will not appear in search results.
    <br/><br /><b>Please Note:</b> If an entity representation is not available, cardholders may still be permitted to purchase from a listed entity. However, the cardholder would be responsible for documenting compliance with Section 889 in accordance with any applicable agency requirements.`;
const API_ERROR_MESSAGE =
  "Sorry, we weren't able to connect to SAM.gov. Please try again later.";
const SEARCH_ISSUE_MESSAGE ="We are aware that some users are experiencing issues with search functionality on the 889 tool. The GSA technical team is working to resolve this and ensure accurate search results. We appreciate your patience.";

export { OK_TEXT, WARN_TEXT, NO_RESULT_MESSAGE, API_ERROR_MESSAGE, SEARCH_ISSUE_MESSAGE };