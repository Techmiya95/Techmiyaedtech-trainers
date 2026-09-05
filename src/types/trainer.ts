export interface StateDistrictMap {
  [state: string]: string[];
}

export interface TrainingDomainOption {
  value: string;
  label: string;
  category: string;
}

export interface LocationData {
  state: string;
  district: string;
}

export interface FileUploadResult {
  url: string;
  fileName: string;
  fileSize: number;
  uploadedAt: string;
}

export interface TrainerFormData {
  fullName: string;
  phone: string;
  email: string;
  topicsInterested: string[];
  permanentLocation: LocationData;
  currentLocation: LocationData;
  preferredLocation: LocationData;
  experienceYears: number;
  resumeFile: FileList | null;
  imageFile: FileList | null;
}

export interface FormSubmissionPayload {
  fullName: string;
  phone: string;
  email: string;
  topicsInterested: string; // Comma separated for Google Sheet
  permanentLocation: string; // "District, State"
  currentLocation: string;   // "District, State"
  preferredLocation: string; // "District, State"
  experienceYears: number;
  resumeUrl: string;
  imageUrl: string;
  resumeBase64?: string;
  resumeFileName?: string;
  resumeMimeType?: string;
  imageBase64?: string;
  imageFileName?: string;
  imageMimeType?: string;
  submittedAt: string;
}

export interface SubmissionResponse {
  success: boolean;
  message: string;
  rowNumber?: number;
  data?: FormSubmissionPayload;
}
