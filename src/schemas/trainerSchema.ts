import { z } from 'zod';

const ALLOWED_RESUME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png'
];

const MAX_RESUME_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_IMAGE_SIZE = 2 * 1024 * 1024;  // 2MB

export const locationSchema = z.object({
  state: z.string().optional().default(''),
  district: z.string().optional().default('')
});

export const trainerFormSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces (no numbers or special characters)'),

  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^[6-9]\d{9}$/, 'Phone number must be a valid 10-digit Indian mobile number starting with 6-9'),

  email: z
    .string()
    .min(1, 'Email address is required')
    .email('Please enter a valid email address (e.g. name@example.com)'),

  topicsInterested: z
    .array(z.string())
    .min(1, 'Please select at least one domain topic of interest'),

  permanentLocation: locationSchema,
  currentLocation: locationSchema,
  preferredLocation: locationSchema,

  experienceYears: z
    .coerce
    .number({ invalid_type_error: 'Experience must be a valid number' })
    .min(0, 'Experience cannot be negative')
    .max(50, 'Experience must be 50 years or less'),

  resumeFile: z
    .custom<FileList>((val) => val instanceof FileList && val.length > 0, {
      message: 'Resume file is required'
    })
    .refine((files) => files && files.length > 0, 'Resume file is required')
    .refine((files) => {
      if (!files || files.length === 0) return false;
      const file = files[0];
      return ALLOWED_RESUME_TYPES.includes(file.type) || 
             /\.(pdf|doc|docx)$/i.test(file.name);
    }, 'Resume must be a .pdf, .doc, or .docx file')
    .refine((files) => {
      if (!files || files.length === 0) return false;
      return files[0].size <= MAX_RESUME_SIZE;
    }, 'Resume file size must not exceed 5MB'),

  imageFile: z
    .custom<FileList>((val) => val instanceof FileList && val.length > 0, {
      message: 'Profile photo is required'
    })
    .refine((files) => files && files.length > 0, 'Profile photo is required')
    .refine((files) => {
      if (!files || files.length === 0) return false;
      const file = files[0];
      return ALLOWED_IMAGE_TYPES.includes(file.type) || 
             /\.(jpg|jpeg|png)$/i.test(file.name);
    }, 'Image must be a .jpeg, .jpg, or .png file')
    .refine((files) => {
      if (!files || files.length === 0) return false;
      return files[0].size <= MAX_IMAGE_SIZE;
    }, 'Image file size must not exceed 2MB'),

  agreeCodeOfConduct: z
    .boolean()
    .refine((val) => val === true, 'You must read and agree to the Trainer Code of Conduct before registering.')
});

export type TrainerFormValues = z.infer<typeof trainerFormSchema>;
