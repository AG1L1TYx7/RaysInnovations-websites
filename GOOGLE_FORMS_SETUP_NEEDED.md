# Google Forms Setup Required

## Issue with Direct Google Sheets Submission

Google Sheets doesn't accept direct POST requests from websites. You need to create a Google Form first, then the form submissions will automatically populate your Google Sheet.

## How to Set This Up

### Step 1: Create a Google Form
1. Go to [forms.google.com](https://forms.google.com)
2. Click "Blank" to create a new form
3. Title: "Rays Innovations Contact & Consultation Requests"

### Step 2: Add Form Fields

**For Contact Form, add these fields:**
- Text field: "First Name" 
- Text field: "Last Name"
- Text field: "Email"
- Text field: "Phone"
- Dropdown: "Service" (add your services as options)
- Paragraph text: "Message"
- Text field: "Form Type" (hidden, we'll auto-populate this)

**For Consultation Form, add these fields:**
- Text field: "Name"
- Text field: "Email" 
- Text field: "Phone"
- Text field: "Service"
- Paragraph text: "Description"
- Text field: "Form Type" (hidden, we'll auto-populate this)

### Step 3: Link to Google Sheets
1. In your Google Form, click "Responses" tab
2. Click the Google Sheets icon
3. Choose "Create a new spreadsheet" or "Select existing spreadsheet"
4. If existing, select your sheet: `1dlKksFNspUJUI0OWIwD_9hzzON8CJv6nma7SUvvFOSM`

### Step 4: Get Form Submission URL
1. In your Google Form, click "Send"
2. Click the link icon (<>)
3. Copy the form URL - it looks like: `https://docs.google.com/forms/d/e/FORM_ID/viewform`
4. Change `viewform` to `formResponse` for submissions

### Step 5: Update Code
Give me the Google Form ID (the long string in the URL) and I'll update the website code.

## Alternative: Simple Contact Form
If this is too complex, I can create a simple mailto: link approach or use a third-party service like Formspree.

**Which approach would you prefer?**
1. Set up Google Forms (most reliable)
2. Use mailto: links (opens user's email client)
3. Use a form service like Formspree