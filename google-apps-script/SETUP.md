# Lead form → Google Sheets: setup

The website popup collects **Name**, **WhatsApp number** and **Email** and sends them to a
Google Apps Script web app, which adds one row per submission to a Google Sheet.

Takes about 5 minutes. You need a Google account.

---

## 1. Create the Google Sheet

1. Go to <https://sheets.google.com> and create a **blank spreadsheet**.
2. Name it, for example **"DevOps Project Series – Leads"**.

You don't need to add any columns. The script creates a **Leads** tab with these headers
automatically: `Timestamp | Name | WhatsApp | Email | Source page`.

## 2. Add the Apps Script

1. In the sheet, open **Extensions → Apps Script**.
2. Delete everything in the default `Code.gs` file.
3. Paste the full contents of [`Code.gs`](./Code.gs) from this folder.
4. *(Optional)* To get an email for every new lead, set `NOTIFY_EMAIL` near the top,
   e.g. `const NOTIFY_EMAIL = 'you@yourcompany.com';`
5. Click **Save** (disk icon), then rename the project to something like "Lead form".

## 3. Test it once from the editor (recommended)

1. In the function dropdown at the top, choose **`testInsert`** and click **Run**.
2. Google asks for permission the first time:
   **Review permissions → choose your account → Advanced → Go to "Lead form" (unsafe) → Allow.**
   ("unsafe" only means Google hasn't reviewed your own script. It's yours, so it's fine.)
3. Switch back to the sheet. A **Leads** tab should appear with a "Test User" row.
   Delete that test row.

## 4. Deploy as a web app

1. In Apps Script, click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in:
   - **Description:** `Website lead form`
   - **Execute as:** **Me** (your account)
   - **Who has access:** **Anyone**
4. Click **Deploy** (authorize again if asked).
5. Copy the **Web app URL**. It looks like:
   `https://script.google.com/macros/s/AKfycb.../exec`

**Check:** open that URL in a browser. You should see
`{"ok":true,"message":"Lead form endpoint is live."}`

## 5. Connect the website

Paste the URL into `src/content/links.ts`:

```ts
export const LEAD_FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycb.../exec";
```

Rebuild or redeploy the website. Then submit the popup once and confirm the row appears
in the sheet.

---

## Updating the script later

If you edit `Code.gs`, the live URL keeps running the **old** version until you redeploy:

**Deploy → Manage deployments → ✏️ Edit → Version: "New version" → Deploy.**

Editing the existing deployment keeps the **same URL**. Choosing "New deployment" instead
creates a different URL, which you would then have to update on the website.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| No rows appear | Make sure "Who has access" is **Anyone** (not "Anyone with Google account"), and the website uses the URL ending in `/exec`, not `/dev`. |
| Rows stopped after editing the script | Redeploy as a **new version** (see above). |
| Popup says "Something went wrong" | `LEAD_FORM_ENDPOINT` is empty or wrong, or the visitor is offline. Open the URL in a browser to check it's live. |
| See errors | Apps Script → **Executions** (left sidebar) lists every request and any errors. |

## How the popup behaves

- It opens automatically once per visitor, **15 seconds** after landing or at **40%** scroll,
  whichever comes first.
- If a visitor closes it, it won't open again automatically for **3 days**. After they submit,
  it never opens automatically again (stored in their browser).
- Anyone can open it any time with the **"Request a callback"** link in the footer.
- WhatsApp numbers are saved as `+<country code> <number>`, e.g. `+91 9876543210`.
- A hidden "honeypot" field filters out most spam bots.

Timings are at the top of `src/components/LeadForm/LeadForm.tsx`:
`AUTO_OPEN_MS`, `AUTO_OPEN_SCROLL`, `SNOOZE_DAYS`.
