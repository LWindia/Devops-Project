/** Direct registration / payment link for the current cohort. */
export const REGISTER_URL = "https://rzp.io/rzp/devops-project-nov";

/** Props for any anchor that sends people to registration (opens in a new tab). */
export const registerLinkProps = {
  href: REGISTER_URL,
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

/** WhatsApp number for course queries (international format, digits only). */
export const WHATSAPP_NUMBER = "919351009002";
export const WHATSAPP_DISPLAY = "+91 93510 09002";
const WHATSAPP_MESSAGE = "Hi! I have a question about the DevOps Project Series.";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

/**
 * Google Apps Script web-app URL that saves popup-form leads to Google Sheets.
 * Paste the deployment URL (ends in /exec) here. Leave empty to disable sending.
 */
export const LEAD_FORM_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbxCWoHl78SstGJPFPrfa1r4xJRqpFO8fHbFT40tyTYDqskvUKMktXRlUmF8Oxvuk9qg/exec";

/** Fire this event anywhere to open the lead popup: window.dispatchEvent(new Event(OPEN_LEAD_FORM)) */
export const OPEN_LEAD_FORM = "open-lead-form";
