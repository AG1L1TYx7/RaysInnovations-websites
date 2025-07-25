# Google Apps Script Setup for Google Sheets Integration

## Why Google Apps Script?
The Google Sheets API requires OAuth2 authentication for write operations, which is complex for frontend-only applications. Google Apps Script provides a simple web app endpoint that can write to Google Sheets directly.

## Setup Steps:

### 1. Create Google Apps Script
1. Go to [script.google.com](https://script.google.com)
2. Click "New project"
3. Replace the default code with the script below
4. Save the project (name it "Rays Innovations Form Handler")

### 2. Google Apps Script Code
```javascript
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Open your Google Sheet by ID
    const sheet = SpreadsheetApp.openById('1dlKksFNspUJUI0OWIwD_9hzzON8CJv6nma7SUvvFOSM');
    
    // Determine which sheet to write to based on form type
    let targetSheet;
    if (data.formType === 'contact') {
      targetSheet = sheet.getSheetByName('Contacts') || sheet.getSheetByName('Sheet1');
      
      // Prepare contact form data
      const rowData = [
        data.timestamp || new Date().toLocaleString(),
        data.firstName || '',
        data.lastName || '',
        data.email || '',
        data.phone || '',
        data.service || '',
        data.message || '',
        'Contact Form'
      ];
      
      targetSheet.appendRow(rowData);
      
    } else if (data.formType === 'consultation') {
      targetSheet = sheet.getSheetByName('Consultations') || sheet.getSheetByName('Sheet1');
      
      // Prepare consultation form data
      const rowData = [
        data.timestamp || new Date().toLocaleString(),
        data.name || '',
        data.email || '',
        data.phone || '',
        data.service || '',
        data.description || '',
        'Consultation Booking'
      ];
      
      targetSheet.appendRow(rowData);
    }
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: 'Data saved successfully'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('Rays Innovations Form Handler is running')
    .setMimeType(ContentService.MimeType.TEXT);
}
```

### 3. Deploy as Web App
1. Click "Deploy" → "New deployment"
2. Set type to "Web app"  
3. Set "Execute as" to "Me"
4. Set "Who has access" to "Anyone"
5. Click "Deploy"
6. Copy the web app URL (it will look like: `https://script.google.com/macros/s/AKfycby.../exec`)

### 4. Update Your Website
Replace the `GOOGLE_APPS_SCRIPT_URL` in the code with your web app URL.

### 5. Test the Integration
Submit a form on your website and check your Google Sheet - the data should appear automatically!

## Benefits:
- ✅ No authentication needed from frontend
- ✅ Direct write to Google Sheets
- ✅ Server-side processing
- ✅ Error handling
- ✅ Works with any frontend application

## Backup: Use Google Forms
If you prefer a simpler approach:
1. Create a Google Form with the same fields
2. Get the pre-filled URL
3. Submit form data via POST to the Google Form endpoint