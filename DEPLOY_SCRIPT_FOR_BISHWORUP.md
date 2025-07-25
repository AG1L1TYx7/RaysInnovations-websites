# Google Apps Script Deployment Guide for bishworupx7@gmail.com

## Current Issue
Your Google Apps Script is returning "401 Unauthorized" which means it's not properly deployed or has lost permissions.

## Step-by-Step Fix

### 1. Login Check
- Make sure you're logged into **bishworupx7@gmail.com** in your browser
- Go to [script.google.com](https://script.google.com)

### 2. Find Your Script
- Look for "Rays Innovations Form Handler" in your projects
- If you don't see it, you'll need to create a new one with the code from `setup-google-sheets.js`

### 3. Re-Deploy the Script
1. Open your script project
2. Click **"Deploy"** → **"Manage deployments"**
3. If you see an existing deployment:
   - Click the pencil icon ✏️ to edit
   - Change to **"New version"**
4. If no deployment exists:
   - Click **"Deploy"** → **"New deployment"**
   - Set type to **"Web app"**
5. Configure these EXACT settings:
   - **Execute as**: "Me (bishworupx7@gmail.com)"
   - **Who has access**: "Anyone"
6. Click **"Deploy"**
7. **IMPORTANT**: Copy the new web app URL

### 4. Test the URL
- Paste the new URL in your browser
- You should see: "✅ Rays Innovations Form Handler is running successfully!"
- If you see a login page or error, something went wrong

### 5. Verify Sheet Access
- Open your Google Sheet: https://docs.google.com/spreadsheets/d/1dlKksFNspUJUI0OWIwD_9hzzON8CJv6nma7SUvvFOSM/edit
- Make sure you can edit it (same Google account)

## What You Need to Give Me
Once the script is working (shows success message when you visit the URL):
1. **The new web app URL** (starts with https://script.google.com/macros/s/...)
2. Confirmation that visiting the URL shows "Form Handler is running successfully"

Then I'll update your website to use the working URL and all form submissions will save properly to your Google Sheet.

## Common Issues
- **Wrong Google account**: Make sure you're using bishworupx7@gmail.com for both the script and sheet
- **Permissions not granted**: Click "Allow" when asked for permissions
- **Old deployment**: Always use "New version" when re-deploying