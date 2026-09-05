import type { FileUploadResult } from '../types/trainer';

/**
 * Simulates uploading files to Cloud Storage (Cloudinary / AWS S3 / Firebase)
 * Returns public hosted URLs for inclusion in Google Sheet payload.
 */
export async function uploadFileToCloud(
  file: File,
  folder: 'resumes' | 'images',
  onProgress?: (progress: number) => void
): Promise<FileUploadResult> {
  // Simulate cloud upload latency with realistic progress steps
  const totalSteps = 5;
  for (let i = 1; i <= totalSteps; i++) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    if (onProgress) {
      onProgress(Math.min(100, Math.round((i / totalSteps) * 100)));
    }
  }

  // Generate clean unique filename identifier
  const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const timestamp = Date.now();
  const fileExtension = file.name.split('.').pop() || 'file';

  // Construct realistic cloud CDN URLs (Cloudinary / Firebase format)
  // Also encode base64 data for fallback inspection if needed
  const mockCloudUrl = `https://storage.techmiyaedtech.com/uploads/${folder}/${timestamp}_${cleanName}`;

  return {
    url: mockCloudUrl,
    fileName: file.name,
    fileSize: file.size,
    uploadedAt: new Date().toISOString()
  };
}

/**
 * Converts a File object to base64 format for direct upload into Google Drive via Google Apps Script.
 */
export async function fileToBase64(file: File): Promise<{ base64: string; fileName: string; mimeType: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      resolve({
        base64,
        fileName: file.name,
        mimeType: file.type || 'application/octet-stream'
      });
    };
    reader.onerror = (error) => reject(error);
  });
}
