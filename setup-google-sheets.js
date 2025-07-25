/**
 * Google Apps Script for Rays Innovations Contact Forms
 * This script receives form data and writes it directly to Google Sheets
 * 
 * DEPLOYMENT INSTRUCTIONS:
 * 1. Copy this entire code
 * 2. Go to script.google.com
 * 3. Create new project, paste this code
 * 4. Save project as "Rays Innovations Form Handler"
 * 5. Deploy as Web App:
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the web app URL and update the website
 */

function doPost(e) {
  try {
    // Log all received data for debugging
    console.log('Received POST request');
    console.log('Content Type:', e.postData.type);
    console.log('Raw data:', e.postData.contents);
    
    // Parse the incoming JSON data
    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'Invalid JSON data',
          received: e.postData.contents
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    console.log('Parsed data:', data);
    
    // Your Google Sheet ID
    const SHEET_ID = '1dlKksFNspUJUI0OWIwD_9hzzON8CJv6nma7SUvvFOSM';
    
    // Open the Google Sheet
    let sheet;
    try {
      sheet = SpreadsheetApp.openById(SHEET_ID);
    } catch (sheetError) {
      console.error('Sheet access error:', sheetError);
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'Cannot access Google Sheet',
          sheetId: SHEET_ID
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    let targetSheet;
    let rowData = [];
    
    if (data.formType === 'contact') {
      console.log('Processing contact form');
      
      // Get or create Contacts sheet
      targetSheet = sheet.getSheetByName('Contacts');
      if (!targetSheet) {
        targetSheet = sheet.insertSheet('Contacts');
        // Add headers
        targetSheet.getRange(1, 1, 1, 8).setValues([[
          'Timestamp', 'First Name', 'Last Name', 'Email', 'Phone', 'Service', 'Message', 'Type'
        ]]);
      }
      
      // Prepare contact form data
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
      console.log('Processing consultation form');
      
      // Get or create Consultations sheet
      targetSheet = sheet.getSheetByName('Consultations');
      if (!targetSheet) {
        targetSheet = sheet.insertSheet('Consultations');
        // Add headers
        targetSheet.getRange(1, 1, 1, 7).setValues([[
          'Timestamp', 'Name', 'Email', 'Phone', 'Service', 'Description', 'Type'
        ]]);
      }
      
      // Prepare consultation form data
      rowData = [
        data.timestamp || new Date().toLocaleString(),
        data.name || '',
        data.email || '',
        data.phone || '',
        data.service || '',
        data.description || '',
        'Consultation Booking'
      ];
      
    } else {
      console.error('Unknown form type:', data.formType);
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'Unknown form type: ' + data.formType
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Add the data to the sheet
    console.log('Adding data to sheet:', rowData);
    targetSheet.appendRow(rowData);
    
    console.log('Data successfully added to Google Sheets');
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Data successfully saved to Google Sheets',
        formType: data.formType,
        rowsAdded: 1
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Unexpected error:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString(),
        message: 'Failed to save data to Google Sheets'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (for testing the deployment)
function doGet(e) {
  console.log('GET request received');
  return ContentService
    .createTextOutput('✅ Rays Innovations Form Handler is running successfully! Ready to receive form data.')
    .setMimeType(ContentService.MimeType.TEXT);
}

// Test function you can run manually to verify everything works
function testSheetAccess() {
  try {
    const SHEET_ID = '1dlKksFNspUJUI0OWIwD_9hzzON8CJv6nma7SUvvFOSM';
    const sheet = SpreadsheetApp.openById(SHEET_ID);
    console.log('✅ Sheet name:', sheet.getName());
    console.log('✅ Sheet access successful');
    
    // Test adding sample data
    const testData = {
      formType: 'contact',
      timestamp: new Date().toLocaleString(),
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '1234567890',
      service: 'Test Service',
      message: 'Test message from script'
    };
    
    // Simulate the doPost function
    const mockEvent = {
      postData: {
        contents: JSON.stringify(testData),
        type: 'application/json'
      }
    };
    
    const result = doPost(mockEvent);
    console.log('✅ Test result:', result.getContent());
    
    return true;
  } catch (error) {
    console.error('❌ Sheet access failed:', error);
    return false;
  }
}