// One-time sheet initialization script
import { initializeSheets } from './googleSheets';

// Run this once to set up your Google Sheets with proper headers
export async function setupGoogleSheets() {
  try {
    console.log('Setting up Google Sheets...');
    await initializeSheets();
    console.log('Google Sheets setup complete!');
  } catch (error) {
    console.error('Error setting up Google Sheets:', error);
  }
}

// Auto-run on import (only in development)
if (import.meta.env.DEV) {
  setupGoogleSheets();
}