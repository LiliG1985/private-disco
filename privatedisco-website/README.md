# Private Disco — website

Talent-first event & entertainment experiences across the UAE.
Plain HTML/CSS/JS: no build step, no dependencies.

## Pages
| File | Page |
|---|---|
| `index.html` | Home |
| `services.html` | Talent, production & AV, décor division, event planning, yachts & villas |
| `talent.html` | Local, international and tribute artists with photos + bios |
| `competition.html` | Competition with date calendar + entry form |
| `contact.html` | WhatsApp, email, Instagram + enquiry form |

## 1. Check your details
Open **`js/config.js`** and change:
- `whatsapp` – already set to Alex's number `971589664411` (digits only)
- `email` – already set to `alexs@privatedisco.com`
- `contactName` – name shown on the contact page
- `instagram` – already set to `privatedisco`
- `sheetEndpoint` – Alex's Google Sheet link, see step 2

These are used everywhere on the site (header button, footer, floating WhatsApp button, contact cards).

## 2. Connect the forms to Alex's Google Sheet
1. Alex follows `setup/ALEX-SETUP.md` (5 minutes, in his own Google account) and sends back his Web app URL.
2. Paste it into `sheetEndpoint` in `js/config.js` and upload that file.
Every competition entry and enquiry is then saved to his sheet and emailed to him. Until the link is added, forms open WhatsApp with the details filled in.

## 3. Put it on GitHub
1. Create a new repository on github.com (e.g. `privatedisco-website`).
2. Click **"uploading an existing file"**, drag in everything inside this folder (keep the `assets`, `css` and `js` folders), and commit.

## 4. Deploy on Vercel
1. On vercel.com → **Add New → Project** → import the GitHub repo.
2. Framework preset: **Other**. Leave build command and output directory empty.
3. Deploy. Every future commit to GitHub redeploys automatically.
4. To use your own domain: Project → Settings → Domains.

## Editing tips
- Colours live at the top of `css/style.css` (taken from the Feb 2023 brand guidelines).
- Headings use Cormorant Garamond (a free stand-in for Restora); body text uses Jost.
- Photos live in `assets/` (talent, events, services, design, photos). Swap any file for a new one with the same name to update it.
- The logo in `assets/logo.png` was cut from the brand guidelines PDF. If you have the original vector/PNG from your designer, drop it in with the same name.

## Seeing old versions after an upload?
Browsers keep a saved copy for a few minutes. Press Cmd+Shift+R (Mac) / Ctrl+Shift+R (Windows) to hard-refresh.
Whenever you edit `css/style.css` or a file in `js/`, bump the `?v=` number on its link in each HTML page so visitors get the new file straight away.
- Photos use a "vintage film" grade: soft faded colour, plum shadows, warm highlights, light grain. New photos should be graded the same way to match.
