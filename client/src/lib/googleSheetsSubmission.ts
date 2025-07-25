// Simple Google Sheets submission utility
// Just add your Google Sheets URL and the forms will save data directly

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface ConsultationFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  description: string;
}

// *** CONFIGURATION ***
// Replace this URL with your Google Sheets URL
const GOOGLE_SHEETS_URL = 'YOUR_GOOGLE_SHEETS_URL_HERE';

export const submitContactForm = async (data: ContactFormData) => {
  try {
    const formData = new FormData();
    formData.append('timestamp', new Date().toLocaleString());
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('service', data.service);
    formData.append('message', data.message);
    formData.append('formType', 'contact');
    
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      body: formData,
    });
    
    if (response.ok) {
      return { success: true, message: 'Contact form submitted successfully' };
    } else {
      throw new Error('Failed to submit form');
    }
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, error: 'Failed to submit contact form' };
  }
};

export const submitConsultationForm = async (data: ConsultationFormData) => {
  try {
    const formData = new FormData();
    formData.append('timestamp', new Date().toLocaleString());
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('service', data.service);
    formData.append('description', data.description);
    formData.append('formType', 'consultation');
    
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      body: formData,
    });
    
    if (response.ok) {
      return { success: true, message: 'Consultation request submitted successfully' };
    } else {
      throw new Error('Failed to submit consultation request');
    }
  } catch (error) {
    console.error('Error submitting consultation form:', error);
    return { success: false, error: 'Failed to submit consultation request' };
  }
};