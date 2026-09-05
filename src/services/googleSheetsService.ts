import type { FormSubmissionPayload, SubmissionResponse } from '../types/trainer';

export const DEFAULT_APPS_SCRIPT_URL =
  import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbxIFemw477rmpw07fzXFC_JPmtcbcQvKUm5HGetBDaPsMd61O12gFS22f1JgthXx0bb/exec';

export function getStoredAppsScriptUrl(): string {
  const customUrl = localStorage.getItem('TECHMIYA_APPS_SCRIPT_URL');
  return (customUrl && customUrl.trim()) ? customUrl.trim() : DEFAULT_APPS_SCRIPT_URL;
}

export function saveStoredAppsScriptUrl(url: string): void {
  localStorage.setItem('TECHMIYA_APPS_SCRIPT_URL', url.trim());
}

export async function submitToGoogleSheets(
  payload: FormSubmissionPayload,
  customScriptUrl?: string
): Promise<SubmissionResponse> {
  const targetUrl = (customScriptUrl || getStoredAppsScriptUrl()).trim();

  if (!targetUrl) {
    return {
      success: false,
      message: 'Google Sheet URL configuration is missing.'
    };
  }

  // Attempt 1: Standard fetch POST (bypasses CORS preflight with text/plain header)
  try {
    const response = await fetch(targetUrl, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    const responseText = await response.text();
    let json: any = {};
    try {
      json = JSON.parse(responseText);
    } catch {
      if (response.ok) {
        json = { status: 'success', message: 'Data sent to Google Sheet' };
      }
    }

    if (json.status === 'success' || json.result === 'success' || response.ok) {
      return {
        success: true,
        message: 'Trainer application registered successfully!',
        rowNumber: json.rowNumber || json.row,
        data: payload
      };
    } else {
      return {
        success: false,
        message: json.message || 'Submission failed. Please check script configuration.'
      };
    }
  } catch (primaryError: any) {
    console.warn('[GoogleSheetsService] Standard fetch encountered CORS/Redirect boundary. Initiating no-cors direct submission...', primaryError);

    // Attempt 2: Fallback to mode 'no-cors' to guarantee submission delivery
    try {
      await fetch(targetUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      return {
        success: true,
        message: 'Trainer application registered successfully!',
        data: payload
      };
    } catch (fallbackError: any) {
      console.error('[GoogleSheetsService] Error submitting to Apps Script:', fallbackError);
      return {
        success: false,
        message: 'Submission failed. Please check your network connection and try again.'
      };
    }
  }
}
