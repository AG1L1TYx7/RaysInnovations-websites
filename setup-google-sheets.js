// Google Apps Script code to paste at script.google.com
// This script will receive form data and write it to your Google Sheet

function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    console.log('Received data:', data);
    
    // Your Google Sheet ID (from the URL)
    const SHEET_ID = '1dlKksFNspUJUI0OWIwD_9hzzON8CJv6nma7SUvvFOSM';
    
    // Open the Google Sheet
    const sheet = SpreadsheetApp.openById(SHEET_ID);
    
    // Get or create the appropriate sheet tab
    let targetSheet;
    
    if (data.formType === 'contact') {
      // Try to get the 'Contacts' sheet, create if it doesn't exist
      targetSheet = sheet.getSheetByName('Contacts');
      if (!targetSheet) {
        targetSheet = sheet.insertSheet('Contacts');
        // Add headers
        targetSheet.getRange(1, 1, 1, 8).setValues([[
          'Timestamp', 'First Name', 'Last Name', 'Email', 'Phone', 'Service', 'Message', 'Type'
        ]]);
      }
      
      // Prepare contact form data for the sheet
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
      
      // Add the data to the sheet
      targetSheet.appendRow(rowData);
      
    } else if (data.formType === 'consultation') {
      // Try to get the 'Consultations' sheet, create if it doesn't exist
      targetSheet = sheet.getSheetByName('Consultations');
      if (!targetSheet) {
        targetSheet = sheet.insertSheet('Consultations');
        // Add headers
        targetSheet.getRange(1, 1, 1, 7).setValues([[
          'Timestamp', 'Name', 'Email', 'Phone', 'Service', 'Description', 'Type'
        ]]);
      }
      
      // Prepare consultation form data for the sheet
      const rowData = [
        data.timestamp || new Date().toLocaleString(),
        data.name || '',
        data.email || '',
        data.phone || '',
        data.service || '',
        data.description || '',
        'Consultation Booking'
      ];
      
      // Add the data to the sheet
      targetSheet.appendRow(rowData);
    }
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true, 
        message: 'Data successfully saved to Google Sheets',
        formType: data.formType
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing form data:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false, 
        error: error.toString(),
        message: 'Failed to save data to Google Sheets'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (for testing)
function doGet(e) {
  return ContentService
    .createTextOutput('Rays Innovations Form Handler is running. Use POST to submit form data.')
    .setMimeType(ContentService.MimeType.TEXT);
}

// Test function to verify sheet access
function testSheetAccess() {
  try {
    const SHEET_ID = '1dlKksFNspUJUI0OWIwD_9hzzON8CJv6nma7SUvvFOSM';
    const sheet = SpreadsheetApp.openById(SHEET_ID);
    console.log('Sheet name:', sheet.getName());
    console.log('Sheet access successful');
    return true;
  } catch (error) {
    console.error('Sheet access failed:', error);
    return false;
  }
}