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
  
  try {
    const response = await fetch(`${url}?valueInputOption=RAW&key=${GOOGLE_SHEETS_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [values],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Google Sheets API error:', errorData);
      
      // If permission denied, provide helpful error message
      if (errorData.error?.code === 403) {
        console.error('Permission denied. Please make sure:');
        console.error('1. The Google Sheet is shared publicly (Anyone with the link can edit)');
        console.error('2. Or add the service account email to the sheet with editor permissions');
      }
      
      return false;
    }

    console.log('Data successfully added to Google Sheets');
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

  return await appendToSheet('Contacts', values);
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

  return await appendToSheet('Consultations', values);
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