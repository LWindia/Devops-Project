/**
 * DevOps Project Series — website lead form → Google Sheets
 *
 * Receives the popup form (name, WhatsApp number, email) from the website
 * and appends one row per submission to this spreadsheet ("Leads" tab, or the first tab).
 *
 * Setup: open your Google Sheet → Extensions → Apps Script → paste this file
 * → Deploy → New deployment → Web app (Execute as: Me, Who has access: Anyone).
 */

// ── Settings ────────────────────────────────────────────────────────────────
// Tab to write to. If no tab has this name, the FIRST tab (e.g. "Sheet1") is used.
const SHEET_NAME = 'Leads';
// Leave '' when this script was opened from the sheet (Extensions → Apps Script).
// If you created the script separately at script.google.com, paste the sheet's ID
// here — the long code in the sheet URL between /d/ and /edit.
const SPREADSHEET_ID = '';
const HEADERS = ['Timestamp', 'Name', 'WhatsApp', 'Email', 'Source page'];
const TIMEZONE = 'Asia/Kolkata';

// Optional: get an email for every new lead. Put your address here, or leave ''.
const NOTIFY_EMAIL = '';

// ── Web app entry points ────────────────────────────────────────────────────

/** The website POSTs here. */
function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000); // avoid two submissions writing the same row

    const p = (e && e.parameter) || {};

    // Honeypot field: real visitors never see it, bots tend to fill it in.
    if (p.company) return json_({ ok: true });

    const name = clean_(p.name, 100);
    const whatsapp = clean_(p.whatsapp, 25);
    const email = clean_(p.email, 150).toLowerCase();
    const page = clean_(p.page, 300);

    if (!name || !whatsapp || !email) return json_({ ok: false, error: 'missing_fields' });
    if (!/^\+?[0-9 ]{8,22}$/.test(whatsapp)) return json_({ ok: false, error: 'invalid_whatsapp' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return json_({ ok: false, error: 'invalid_email' });

    const now = new Date();
    getSheet_().appendRow([
      Utilities.formatDate(now, TIMEZONE, 'yyyy-MM-dd HH:mm:ss'),
      safe_(name),
      "'" + whatsapp, // leading ' keeps "+91 ..." as text, not a formula/number
      safe_(email),
      safe_(page),
    ]);

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail(
        NOTIFY_EMAIL,
        'New DevOps Project Series lead: ' + name,
        'Name: ' + name + '\nWhatsApp: ' + whatsapp + '\nEmail: ' + email + '\nPage: ' + page
      );
    }

    return json_({ ok: true });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: 'server_error' });
  } finally {
    lock.releaseLock();
  }
}

/** Opening the URL in a browser shows this — handy to confirm the deployment works. */
function doGet() {
  return json_({ ok: true, message: 'Lead form endpoint is live.' });
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function getSheet_() {
  const ss = SPREADSHEET_ID ? SpreadsheetApp.openById(SPREADSHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('No spreadsheet: open this script from the sheet, or set SPREADSHEET_ID.');
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#f3f3f3');
    sheet.setFrozenRows(1);
    sheet.setColumnWidths(1, HEADERS.length, 200);
  }
  return sheet;
}

/** Trim, collapse whitespace, cap length. */
function clean_(value, max) {
  return String(value || '').replace(/\s+/g, ' ').trim().slice(0, max);
}

/** Stop spreadsheet formula injection (values starting with = + - @). */
function safe_(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** Run this once from the editor to test writing a row (then delete the test row). */
function testInsert() {
  const res = doPost({
    parameter: { name: 'Test User', whatsapp: '+91 9876543210', email: 'test@example.com', page: 'manual test' },
  });
  Logger.log(res.getContent());
}
