# Private Disco website: connect the forms to your Google Sheet (5 minutes)

Every competition entry and website enquiry will be saved as a row in your own Google Sheet, and emailed to alexs@privatedisco.com.

1. Go to sheets.google.com (signed in as you) and create a blank sheet. Name it **Private Disco – Website Entries**.
2. In the sheet, click **Extensions → Apps Script**.
3. Delete everything in the code box, then paste in the whole contents of `google-sheet-script.gs` (sent with this guide). Click the **save** icon.
4. Click **Deploy → New deployment**. Click the cog next to "Select type" and choose **Web app**.
   - Description: `Website forms`
   - Execute as: **Me**
   - Who has access: **Anyone**
   Click **Deploy**.
5. Google will ask you to authorise. Click **Authorise access**, choose your account, then **Advanced → Go to (unsafe)** → **Allow**. (It says "unsafe" only because it's your own private script, not a published app.)
6. Copy the **Web app URL** (it ends in `/exec`) and send it to Lili.

That's it. Two tabs, **Competition entries** and **Enquiries**, appear automatically with the first entry.

Columns collected for the competition: date received, requested date, start time, celebration, venue, guests, location, why they should win, name, phone/WhatsApp, email, Instagram, follows @privatedisco.
