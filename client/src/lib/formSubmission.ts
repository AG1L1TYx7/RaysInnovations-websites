// Alternative form submission methods
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

// Method 1: Google Apps Script Web App (Recommended)
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/{SCRIPT_ID}/exec';

async function submitToGoogleAppsScript(data: any, formType: string): Promise<boolean> {
  try {
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Required for Google Apps Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        formType,
        timestamp: new Date().toISOString(),
      }),
    });

    // no-cors mode doesn't give us response status, assume success
    console.log('Submitted to Google Apps Script');
    return true;
  } catch (error) {
    console.error('Error submitting to Google Apps Script:', error);
    return false;
  }
}

// Method 2: Formspree.io integration (Backup option)
async function submitToFormspree(data: any, formType: string): Promise<boolean> {
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/{YOUR_FORM_ID}';
  
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        _subject: `New ${formType} from Rays Innovations Website`,
        _replyto: data.email,
      }),
    });

    if (response.ok) {
      console.log('Submitted to Formspree');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error submitting to Formspree:', error);
    return false;
  }
}

// Method 3: Simple POST to a Google Form (Simplest option)
async function submitToGoogleForm(data: ContactFormData | ConsultationFormData, formType: string): Promise<boolean> {
  // This would require a Google Form URL and field IDs
  // For now, we'll use a simple approach with URLSearchParams for the pre-filled form
  
  const baseUrl = 'https://docs.google.com/forms/d/e/{FORM_ID}/viewform';
  const params = new URLSearchParams();
  
  // Map form data to Google Form entry IDs (you'd get these from inspecting the form)
  if (formType === 'contact') {
    const contactData = data as ContactFormData;
    params.set('entry.{ID1}', `${contactData.firstName} ${contactData.lastName}`);
    params.set('entry.{ID2}', contactData.email);
    params.set('entry.{ID3}', contactData.phone);
    params.set('entry.{ID4}', contactData.service);
    params.set('entry.{ID5}', contactData.message);
  } else {
    const consultData = data as ConsultationFormData;
    params.set('entry.{ID1}', consultData.name);
    params.set('entry.{ID2}', consultData.email);
    params.set('entry.{ID3}', consultData.phone);
    params.set('entry.{ID4}', consultData.service);
    params.set('entry.{ID5}', consultData.description);
  }
  
  // For now, just log what would be submitted
  console.log('Would submit to Google Form:', { data, formType });
  return false; // Not implemented yet
}

// Main submission function with fallback chain
export async function submitContactForm(data: ContactFormData): Promise<boolean> {
  console.log('Attempting to submit contact form:', data);
  
  // Try Google Apps Script first
  try {
    const result = await submitToGoogleAppsScript(data, 'contact');
    if (result) return true;
  } catch (error) {
    console.log('Google Apps Script failed, trying next method');
  }
  
  // Try Formspree as backup
  try {
    const result = await submitToFormspree(data, 'contact');
    if (result) return true;
  } catch (error) {
    console.log('Formspree failed, trying next method');
  }
  
  // All methods failed
  return false;
}

export async function submitConsultationForm(data: ConsultationFormData): Promise<boolean> {
  console.log('Attempting to submit consultation form:', data);
  
  // Try Google Apps Script first
  try {
    const result = await submitToGoogleAppsScript(data, 'consultation');
    if (result) return true;
  } catch (error) {
    console.log('Google Apps Script failed, trying next method');
  }
  
  // Try Formspree as backup
  try {
    const result = await submitToFormspree(data, 'consultation');
    if (result) return true;
  } catch (error) {
    console.log('Formspree failed');
  }
  
  // All methods failed
  return false;
}