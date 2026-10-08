/**
 * PRIVATE DISCO — website form receiver
 * Go to script.google.com → New project, paste this whole file, Save,
 * click Run once (choose setup, allow permissions), then
 * Deploy → New deployment → Web app (Execute as: Me, Who has access: Anyone).
 * The script creates its own Google Sheet called "Private Disco – Website Entries" in your Drive.
 * Every competition entry and enquiry is saved as a new row and emailed to NOTIFY_EMAIL.
 */
const NOTIFY_EMAIL = 'alexs@privatedisco.com';
const SHEET_ID = '1690AnFzkhq673RzxxEFcT_lL1bLDwlArkBSrNvtMETg';  // Copy of Private Disco – Website Entries

/** Run this once from the editor: it creates the sheet and asks for permissions. */
function setup() {
  const ss = book_();
  getTab_('competition', TABS.competition);
  getTab_('enquiry', TABS.enquiry);
  const first = ss.getSheetByName('Sheet1'); if (first && ss.getSheets().length > 1) ss.deleteSheet(first);
  Logger.log('Sheet ready: ' + ss.getUrl());
}

function book_() {
  const active = SpreadsheetApp.getActiveSpreadsheet();   // when opened via Extensions → Apps Script
  if (active) return active;
  const props = PropertiesService.getScriptProperties();
  let id = SHEET_ID || props.getProperty('SHEET_ID');
  if (id) { try { return SpreadsheetApp.openById(id); } catch (e) {} }
  const ss = SpreadsheetApp.create('Private Disco – Website Entries');
  props.setProperty('SHEET_ID', ss.getId());
  return ss;
}

const TABS = {
  competition: ['Received', 'Requested date', 'Start time', 'Celebration', 'Venue', 'Guests', 'Location',
                'Why they should win', 'Name', 'Phone / WhatsApp', 'Email', 'Instagram', 'Follows @privatedisco'],
  enquiry:     ['Received', 'Name', 'Phone / WhatsApp', 'Email', 'Event date', 'Venue', 'Guests', 'Services', 'Message']
};
const TAB_NAMES = { competition: 'Competition entries', enquiry: 'Enquiries' };

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || '{}');
    const type = data._type === 'competition' ? 'competition' : 'enquiry';
    const headers = TABS[type];
    const sheet = getTab_(type, headers);
    const row = headers.map(function (h) { return h === 'Received' ? new Date() : (data[h] || ''); });
    sheet.appendRow(row);

    const subject = type === 'competition'
      ? 'New competition entry: ' + (data['Name'] || '') + ' — ' + (data['Celebration'] || '')
      : 'New website enquiry: ' + (data['Name'] || '');
    const body = headers.slice(1).map(function (h) { return h + ': ' + (data[h] || '—'); }).join('\n')
      + '\n\nAll entries: ' + book_().getUrl();
    const replyTo = data['Email'] && /@/.test(data['Email']) ? data['Email'] : NOTIFY_EMAIL;
    MailApp.sendEmail({ to: NOTIFY_EMAIL, subject: subject, body: body, replyTo: replyTo, name: 'Private Disco website' });

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet() { return json_({ ok: true, service: 'Private Disco forms' }); }

function getTab_(type, headers) {
  const ss = book_();
  let sh = ss.getSheetByName(TAB_NAMES[type]);
  if (!sh) {
    sh = ss.insertSheet(TAB_NAMES[type]);
    sh.appendRow(headers);
    sh.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#1c0f22').setFontColor('#ffffff');
    sh.setFrozenRows(1);
    sh.getRange('A:A').setNumberFormat('dd mmm yyyy, hh:mm');
  }
  return sh;
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
