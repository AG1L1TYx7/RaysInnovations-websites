# SOLUTION: Create Fresh Google Apps Script

## The Problem
Your current script URL is still returning "Page Not Found" even after re-deployment. This means there's a fundamental issue with the existing script project.

## SOLUTION: Create a Brand New Script

### Step 1: Create New Project
1. Go to [script.google.com](https://script.google.com) (logged into bishworupx7@gmail.com)
2. Click **"+ New project"** 
3. Delete all existing code in the editor
4. Copy and paste this COMPLETE code:

```javascript
/**
 * Google Apps Script for Rays Innovations Contact Forms
 * Save form data directly to Google Sheets
 */

function doPost(e) {
  try {
    console.log('Received POST request');
    console.log('Raw data:', e.postData.contents);
    
    // Parse the JSON data
    const data = JSON.parse(e.postData.contents);
    console.log('Parsed data:', data);
    
    // Your Google Sheet ID
    const SHEET_ID = '1dlKksFNspUJUI0OWIwD_9hzzON8CJv6nma7SUvvFOSM';
    
    // Open the Google Sheet
    const sheet = SpreadsheetApp.openById(SHEET_ID);
    
    let targetSheet;
    let rowData = [];
    
    if (data.formType === 'contact') {
      // Get or create Contacts sheet
      targetSheet = sheet.getSheetByName('Contacts');
      if (!targetSheet) {
        targetSheet = sheet.insertSheet('Contacts');
        targetSheet.getRange(1, 1, 1, 8).setValues([[
          'Timestamp', 'First Name', 'Last Name', 'Email', 'Phone', 'Service', 'Message', 'Type'
        ]]);
      }
      
      rowData = [
        data.timestamp || new Date().toLocaleString(),
        data.firstName || '',
        data.lastName || '',
        data.email || '',
        data.phone || '',
        data.service || '',
        data.message || '',
        'Contact Form'
      ];
      
    } else if (data.formType === 'consultation') {
      // Get or create Consultations sheet
      targetSheet = sheet.getSheetByName('Consultations');
      if (!targetSheet) {
        targetSheet = sheet.insertSheet('Consultations');
        targetSheet.getRange(1, 1, 1, 7).setValues([[
          'Timestamp', 'Name', 'Email', 'Phone', 'Service', 'Description', 'Type'
        ]]);
      }
      
      rowData = [
        data.timestamp || new Date().toLocaleString(),
        data.name || '',
        data.email || '',
        data.phone || '',
        data.service || '',
        data.description || '',
        'Consultation Booking'
      ];
    }
    
    // Add data to sheet
    targetSheet.appendRow(rowData);
    console.log('Data added to sheet successfully');
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Data saved to Google Sheets',
        formType: data.formType
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('✅ Rays Innovations Form Handler is running successfully!')
    .setMimeType(ContentService.MimeType.TEXT);
}

// Test function
function testSheetAccess() {
  const SHEET_ID = '1dlKksFNspUJUI0OWIwD_9hzzON8CJv6nma7SUvvFOSM';
  const sheet = SpreadsheetApp.openById(SHEET_ID);
  console.log('Sheet access successful:', sheet.getName());
  return true;
}
```

### Step 2: Save and Test
1. Save the project (Ctrl+S)
2. Name it: **"Rays Innovations Form Handler New"**
3. Click the function dropdown → select **"testSheetAccess"**
4. Click **Run** button
5. Grant permissions when asked
6. Check execution log for "Sheet access successful"

### Step 3: Deploy as Web App
1. Click **"Deploy"** → **"New deployment"**
2. Click gear icon → select **"Web app"**
3. Set these EXACT settings:
   - **Execute as**: "Me (bishworupx7@gmail.com)"
   - **Who has access**: "Anyone"
4. Click **"Deploy"**
5. **COPY THE NEW URL**

### Step 4: Test the New URL
- Visit the new URL in browser
- Should show: "✅ Rays Innovations Form Handler is running successfully!"

### Step 5: Provide New URL
Give me the NEW working URL and I'll update the website immediately.

This fresh script should work perfectly!