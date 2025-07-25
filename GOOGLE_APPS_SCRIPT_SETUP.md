# Complete Google Apps Script Setup Guide

## Step-by-Step Instructions to Fix Google Sheets Integration

### Step 1: Create New Google Apps Script
1. Go to [script.google.com](https://script.google.com)
2. Click "New project"
3. Delete all existing code
4. Copy and paste the ENTIRE code from `setup-google-sheets.js`
5. Save the project (Ctrl+S) and name it "Rays Innovations Form Handler"

### Step 2: Test the Script (IMPORTANT)
1. In the script editor, find the function dropdown (shows "doPost")
2. Change it to "testSheetAccess" 
3. Click the "Run" button (▶️)
4. If prompted, click "Review permissions" → "Allow"
5. Check the execution log - you should see "✅ Sheet access successful"

### Step 3: Deploy as Web App
1. Click "Deploy" → "New deployment"
2. Click the gear icon ⚙️ next to "Type"
3. Select "Web app"
4. Set these EXACT settings:
   - **Description**: "Form Handler v1"
   - **Execute as**: "Me (your-email@gmail.com)"
   - **Who has access**: "Anyone"
5. Click "Deploy"
6. Click "Authorize access" if prompted
7. **COPY THE WEB APP URL** - it should look like:
   `https://script.google.com/macros/s/AKfycby.../exec`

### Step 4: Test the Deployment
1. Open the web app URL in a new browser tab
2. You should see: "✅ Rays Innovations Form Handler is running successfully!"
3. If you see an error, the deployment failed - repeat steps 2-3

### Step 5: Update Website
Once you have the working URL, provide it to me and I'll update the website code.

## Common Issues and Fixes:

**"Page Not Found" Error**:
- Script deployment failed
- Try deploying as a new version
- Check permissions are set correctly

**"Permission Denied" Error**:
- Script doesn't have access to the Google Sheet
- Make sure you own both the script and the sheet
- Re-run the authorization process

**"Function not found" Error**:
- Code wasn't pasted correctly
- Make sure the entire script code is copied

## What This Script Does:
1. Receives form data from your website
2. Creates "Contacts" and "Consultations" sheets automatically
3. Adds proper headers to each sheet
4. Appends new form submissions as rows
5. Returns success/error messages

The script is designed to handle both contact forms and consultation bookings, saving them to separate sheets in your Google Sheets document.