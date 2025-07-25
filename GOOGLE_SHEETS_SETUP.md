# Google Sheets Setup Guide for Contact Forms

## Option 1: Create a New Google Sheet (Recommended)

### Step 1: Create the Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Click "Blank" to create a new spreadsheet
3. Name it "Rays Innovations - Contact Forms"

### Step 2: Set Up Two Sheets
1. **Rename the first sheet to "Contacts"**
   - Right-click on "Sheet1" tab at bottom
   - Select "Rename" 
   - Change to "Contacts"

2. **Create a second sheet called "Consultations"**
   - Click the "+" button next to the sheet tabs
   - Right-click the new sheet and rename to "Consultations"

### Step 3: Add Headers
**In the "Contacts" sheet, add these headers in row 1:**
- A1: Timestamp
- B1: First Name  
- C1: Last Name
- D1: Email
- E1: Phone
- F1: Service
- G1: Message
- H1: Type

**In the "Consultations" sheet, add these headers in row 1:**
- A1: Timestamp
- B1: Name
- C1: Email
- D1: Phone
- E1: Service
- F1: Description
- G1: Type

### Step 4: Make it Public (For Testing)
1. Click "Share" button (top right)
2. Click "Change to anyone with the link"
3. Set permission to "Editor"
4. Click "Done"
5. Copy the sharing URL

### Step 5: Get the Spreadsheet ID
From your Google Sheets URL like:
`https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit`

Copy the long ID between `/d/` and `/edit`

## Option 2: Use Service Account (More Secure)

### Step 1: Create Service Account
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project or select existing
3. Enable Google Sheets API
4. Go to "Credentials" → "Create Credentials" → "Service Account"
5. Download the JSON key file

### Step 2: Share Sheet with Service Account
1. Open the JSON file and find the "client_email"
2. In your Google Sheet, click "Share"
3. Add the service account email with "Editor" permissions

## Your Current Sheet
I see you have: `https://docs.google.com/spreadsheets/d/1dlKksFNspUJUI0OWIwD_9hzzON8CJv6nma7SUvvFOSM/edit?usp=sharing`

This sheet needs to be made public or shared with the API service account to work with our integration.

## Quick Fix for Your Existing Sheet
1. Open your sheet: https://docs.google.com/spreadsheets/d/1dlKksFNspUJUI0OWIwD_9hzzON8CJv6nma7SUvvFOSM/edit?usp=sharing
2. Click "Share" (top right)
3. Change "Restricted" to "Anyone with the link"
4. Set permission to "Editor"
5. Save

Then your contact forms will work immediately!