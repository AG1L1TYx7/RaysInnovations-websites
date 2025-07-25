// Google Sheets API integration
const GOOGLE_SHEETS_API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
const SPREADSHEET_ID = '1dlKksFNspUJUI0OWIwD_9hzzON8CJv6nma7SUvvFOSM';

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export interface ConsultationFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  description: string;
}

// Function to append data to Google Sheets
async function appendToSheet(sheetName: string, values: string[]): Promise<boolean> {
  if (!GOOGLE_SHEETS_API_KEY) {
    console.error('Google Sheets API key not configured');
    return false;
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${sheetName}:append`;
  
  console.log(`Attempting to write to Google Sheets:`, { sheetName, values, url });
  
  try {
    const response = await fetch(`${url}?valueInputOption=RAW&insertDataOption=INSERT_ROWS&key=${GOOGLE_SHEETS_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [values],
      }),
    });

    console.log('Google Sheets API response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Google Sheets API error:', errorData);
      
      // If permission denied, provide helpful error message
      if (errorData.error?.code === 403) {
        console.error('Permission denied. Please make sure:');
        console.error('1. The Google Sheet is shared publicly (Anyone with the link can edit)');
        console.error('2. Or add the service account email to the sheet with editor permissions');
        console.error('3. The sheet name exists (try "Sheet1" instead of "Contacts")');
      }
      
      return false;
    }

    const responseData = await response.json();
    console.log('Data successfully added to Google Sheets:', responseData);
    return true;
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    return false;
  }
}

// Submit contact form data to Google Sheets
export async function submitContactForm(data: ContactFormData): Promise<boolean> {
  const timestamp = new Date().toLocaleString();
  const values = [
    timestamp,
    data.firstName,
    data.lastName,
    data.email,
    data.phone,
    data.service,
    data.message,
    'Contact Form'
  ];

  console.log('Submitting contact form to Google Sheets:', data);
  
  // Try different sheet names in case the sheet doesn't exist
  const sheetNames = ['Sheet1', 'Contacts', 'RaysInnovation'];
  
  for (const sheetName of sheetNames) {
    console.log(`Trying sheet name: ${sheetName}`);
    const result = await appendToSheet(sheetName, values);
    if (result) {
      console.log(`Successfully wrote to sheet: ${sheetName}`);
      return true;
    }
  }
  
  console.log('Failed to write to any sheet');
  return false;
}

// Submit consultation booking data to Google Sheets
export async function submitConsultationForm(data: ConsultationFormData): Promise<boolean> {
  const timestamp = new Date().toLocaleString();
  const values = [
    timestamp,
    data.name,
    data.email,
    data.phone,
    data.service,
    data.description,
    'Consultation Booking'  
  ];

  console.log('Submitting consultation form to Google Sheets:', data);
  
  // Try different sheet names
  const sheetNames = ['Sheet1', 'Consultations', 'RaysInnovation'];
  
  for (const sheetName of sheetNames) {
    console.log(`Trying sheet name: ${sheetName}`);
    const result = await appendToSheet(sheetName, values);
    if (result) {
      console.log(`Successfully wrote to sheet: ${sheetName}`);
      return true;
    }
  }
  
  console.log('Failed to write to any consultation sheet');
  return false;
}

// Initialize sheets with headers (call this once to set up your sheets)
export async function initializeSheets(): Promise<void> {
  if (!GOOGLE_SHEETS_API_KEY) {
    console.error('Google Sheets API key not configured');
    return;
  }

  // Headers for Contacts sheet
  const contactHeaders = [
    'Timestamp',
    'First Name',
    'Last Name',
    'Email',
    'Phone',
    'Service',
    'Message',
    'Type'
  ];

  // Headers for Consultations sheet
  const consultationHeaders = [
    'Timestamp',
    'Name',
    'Email',
    'Phone',
    'Service',
    'Description',
    'Type'
  ];

  try {
    // Add headers to Contacts sheet
    await appendToSheet('Contacts', contactHeaders);
    
    // Add headers to Consultations sheet
    await appendToSheet('Consultations', consultationHeaders);
    
    console.log('Sheets initialized with headers');
  } catch (error) {
    console.error('Error initializing sheets:', error);
  }
}