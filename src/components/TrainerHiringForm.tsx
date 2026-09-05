import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import {
  User,
  Phone,
  Mail,
  Award,
  Upload,
  Send,
  Loader2,
  CheckCircle2,
  Briefcase,
  MapPin,
  Sparkles,
  ShieldCheck,
  FileCheck
} from 'lucide-react';

import { trainerFormSchema } from '../schemas/trainerSchema';
import type { TrainerFormValues } from '../schemas/trainerSchema';
import { DomainSelect } from './DomainSelect';
import { LocationSelector } from './LocationSelector';
import { FileUploadField } from './FileUploadField';
import { uploadFileToCloud, fileToBase64 } from '../services/fileUploadService';
import { getStoredAppsScriptUrl, submitToGoogleSheets } from '../services/googleSheetsService';
import type { FormSubmissionPayload } from '../types/trainer';
import { SubmissionSuccessModal } from './SubmissionSuccessModal';

interface TrainerHiringFormProps {
  appsScriptUrl?: string;
}

export const TrainerHiringForm: React.FC<TrainerHiringFormProps> = ({ appsScriptUrl }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeProgress, setResumeProgress] = useState<number>(0);
  const [imageProgress, setImageProgress] = useState<number>(0);
  const [uploadedResumeUrl, setUploadedResumeUrl] = useState<string>('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');

  const [modalOpen, setModalOpen] = useState(false);
  const [submissionData, setSubmissionData] = useState<FormSubmissionPayload | null>(null);
  const [sheetRowNumber, setSheetRowNumber] = useState<number | undefined>(undefined);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<TrainerFormValues>({
    resolver: zodResolver(trainerFormSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      topicsInterested: [],
      permanentLocation: { state: '', district: '' },
      currentLocation: { state: '', district: '' },
      preferredLocation: { state: '', district: '' },
      experienceYears: '' as any,
      resumeFile: null,
      imageFile: null
    }
  });

  const permanentLoc = watch('permanentLocation');
  const currentLoc = watch('currentLocation');
  const preferredLoc = watch('preferredLocation');

  const onSubmit = async (data: TrainerFormValues) => {
    const activeUrl = appsScriptUrl || getStoredAppsScriptUrl();

    setIsSubmitting(true);
    const toastId = toast.loading('Submitting application...');

    try {
      // 1. Convert Resume file to base64
      let resumeBase64Data: { base64: string; fileName: string; mimeType: string } | undefined;
      if (data.resumeFile && data.resumeFile.length > 0) {
        const file = data.resumeFile[0];
        setResumeProgress(50);
        resumeBase64Data = await fileToBase64(file);
        setResumeProgress(100);
      }

      // 2. Convert Photo file to base64
      let imageBase64Data: { base64: string; fileName: string; mimeType: string } | undefined;
      if (data.imageFile && data.imageFile.length > 0) {
        const file = data.imageFile[0];
        setImageProgress(50);
        imageBase64Data = await fileToBase64(file);
        setImageProgress(100);
      }

      // 3. Format payload for Google Apps Script (sending base64 files for Google Drive upload)
      const payload: FormSubmissionPayload = {
        fullName: data.fullName.trim(),
        phone: data.phone.trim(),
        email: data.email.trim(),
        topicsInterested: data.topicsInterested.join(', '),
        permanentLocation: `${data.permanentLocation.district}, ${data.permanentLocation.state}`,
        currentLocation: `${data.currentLocation.district}, ${data.currentLocation.state}`,
        preferredLocation: `${data.preferredLocation.district}, ${data.preferredLocation.state}`,
        experienceYears: Number(data.experienceYears),
        resumeUrl: '',
        imageUrl: '',
        resumeBase64: resumeBase64Data?.base64,
        resumeFileName: resumeBase64Data?.fileName,
        resumeMimeType: resumeBase64Data?.mimeType,
        imageBase64: imageBase64Data?.base64,
        imageFileName: imageBase64Data?.fileName,
        imageMimeType: imageBase64Data?.mimeType,
        submittedAt: new Date().toISOString()
      };

      // 4. Submit to Google Apps Script Web App
      const res = await submitToGoogleSheets(payload, activeUrl);

      if (res.success) {
        toast.success(res.message, { id: toastId, duration: 5000 });
        setSubmissionData(payload);
        setSheetRowNumber(res.rowNumber);
        setModalOpen(true);
        reset();
        setUploadedResumeUrl('');
        setUploadedImageUrl('');
        setResumeProgress(0);
        setImageProgress(0);
      } else {
        toast.error(res.message || 'Failed to submit data to Google Sheet.', {
          id: toastId,
          duration: 7000
        });
      }
    } catch (err: any) {
      console.error('[TrainerHiringForm] Submission exception:', err);
      toast.error(`Error: ${err.message || 'An unexpected error occurred during submission.'}`, {
        id: toastId
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 text-xs font-semibold border border-cyan-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Join Techmiya Trainer Network</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Corporate Trainer Registration
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Partner with Techmiya EdTech to train next-generation developers and professionals across India. Complete the application below to get onboarded.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-slate-300">
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Verified Corporate Network</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-xs">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Encrypted Data Encryption</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-xs">
              <FileCheck className="w-4 h-4 text-purple-400" />
              <span>Direct HR Evaluation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form Container */}
      <form
        id="registration-form"
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50 p-6 sm:p-10 space-y-8"
      >
        {/* Section 1: Basic Information */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">1. Personal & Contact Info</h2>
              <p className="text-xs text-slate-500">Provide your full legal name and active contact channels</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  {...register('fullName')}
                  className={`w-full pl-9 pr-4 py-2.5 text-sm bg-white border rounded-xl focus:outline-hidden focus:ring-2 transition-all ${
                    errors.fullName
                      ? 'border-rose-400 focus:ring-rose-100 text-rose-900'
                      : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-600 text-slate-900'
                  }`}
                />
              </div>
              {errors.fullName && (
                <p className="mt-1.5 text-xs text-rose-500 font-medium">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Phone Number (10 Digits) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  maxLength={10}
                  placeholder="e.g. 9876543210"
                  {...register('phone')}
                  className={`w-full pl-9 pr-4 py-2.5 text-sm bg-white border rounded-xl focus:outline-hidden focus:ring-2 transition-all ${
                    errors.phone
                      ? 'border-rose-400 focus:ring-rose-100 text-rose-900'
                      : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-600 text-slate-900'
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="mt-1.5 text-xs text-rose-500 font-medium">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  placeholder="e.g. rahul.sharma@example.com"
                  {...register('email')}
                  className={`w-full pl-9 pr-4 py-2.5 text-sm bg-white border rounded-xl focus:outline-hidden focus:ring-2 transition-all ${
                    errors.email
                      ? 'border-rose-400 focus:ring-rose-100 text-rose-900'
                      : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-600 text-slate-900'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-rose-500 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Total Experience (in Years) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Award className="w-4 h-4" />
                </div>
                <input
                  type="number"
                  min={0}
                  max={50}
                  step={1}
                  placeholder="e.g. 5"
                  {...register('experienceYears')}
                  className={`w-full pl-9 pr-4 py-2.5 text-sm bg-white border rounded-xl focus:outline-hidden focus:ring-2 transition-all ${
                    errors.experienceYears
                      ? 'border-rose-400 focus:ring-rose-100 text-rose-900'
                      : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-600 text-slate-900'
                  }`}
                />
              </div>
              {errors.experienceYears && (
                <p className="mt-1.5 text-xs text-rose-500 font-medium">
                  {errors.experienceYears.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Professional Expertise */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">2. Training Expertise & Domains</h2>
              <p className="text-xs text-slate-500">Select all technical & corporate fields you can deliver training in</p>
            </div>
          </div>

          <Controller
            name="topicsInterested"
            control={control}
            render={({ field }) => (
              <DomainSelect
                value={field.value || []}
                onChange={field.onChange}
                error={errors.topicsInterested?.message}
              />
            )}
          />
        </div>

        {/* Section 3: Cascading Location Selectors */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">3. Location Details (Cascading State & District)</h2>
              <p className="text-xs text-slate-500">Select State first to dynamically populate District options for each field</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* Permanent Location */}
            <LocationSelector
              title="Permanent Location"
              type="permanent"
              selectedState={permanentLoc?.state || ''}
              selectedDistrict={permanentLoc?.district || ''}
              onStateChange={(st) => setValue('permanentLocation.state', st, { shouldValidate: true })}
              onDistrictChange={(dt) => setValue('permanentLocation.district', dt, { shouldValidate: true })}
              stateError={errors.permanentLocation?.state?.message}
              districtError={errors.permanentLocation?.district?.message}
            />

            {/* Current Location */}
            <LocationSelector
              title="Current Location"
              type="current"
              selectedState={currentLoc?.state || ''}
              selectedDistrict={currentLoc?.district || ''}
              onStateChange={(st) => setValue('currentLocation.state', st, { shouldValidate: true })}
              onDistrictChange={(dt) => setValue('currentLocation.district', dt, { shouldValidate: true })}
              stateError={errors.currentLocation?.state?.message}
              districtError={errors.currentLocation?.district?.message}
            />

            {/* Preferred Location */}
            <LocationSelector
              title="Preferred Training Location"
              type="preferred"
              selectedState={preferredLoc?.state || ''}
              selectedDistrict={preferredLoc?.district || ''}
              onStateChange={(st) => setValue('preferredLocation.state', st, { shouldValidate: true })}
              onDistrictChange={(dt) => setValue('preferredLocation.district', dt, { shouldValidate: true })}
              stateError={errors.preferredLocation?.state?.message}
              districtError={errors.preferredLocation?.district?.message}
            />
          </div>
        </div>

        {/* Section 4: Document Uploads */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">4. Document & Media Attachments</h2>
              <p className="text-xs text-slate-500">Upload your latest resume and profile image to be stored as CDN URLs in Google Sheet</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Resume Upload */}
            <Controller
              name="resumeFile"
              control={control}
              render={({ field }) => (
                <FileUploadField
                  label="Upload Resume"
                  accept=".pdf,.doc,.docx"
                  maxSizeMB={5}
                  fileType="resume"
                  selectedFiles={field.value}
                  onFileSelect={(files) => field.onChange(files)}
                  error={errors.resumeFile?.message}
                  uploadProgress={resumeProgress}
                  uploadedUrl={uploadedResumeUrl}
                />
              )}
            />

            {/* Image Upload */}
            <Controller
              name="imageFile"
              control={control}
              render={({ field }) => (
                <FileUploadField
                  label="Upload Profile Photo"
                  accept=".jpg,.jpeg,.png"
                  maxSizeMB={2}
                  fileType="image"
                  selectedFiles={field.value}
                  onFileSelect={(files) => field.onChange(files)}
                  error={errors.imageFile?.message}
                  uploadProgress={imageProgress}
                  uploadedUrl={uploadedImageUrl}
                />
              )}
            />
          </div>
        </div>

        {/* Form Submission Button */}
        <div className="pt-4 border-t border-slate-100">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 px-6 rounded-2xl font-bold text-base text-white shadow-lg transition-all duration-200 flex items-center justify-center gap-2 ${
              isSubmitting
                ? 'bg-slate-400 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-700 hover:via-indigo-700 hover:to-cyan-700 shadow-blue-500/25 active:scale-[0.99]'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Submitting Trainer Profile...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Submit Trainer Application</span>
              </>
            )}
          </button>
          <p className="text-center text-xs text-slate-400 mt-2">
            By submitting, you confirm that all entered details and documents are authentic.
          </p>
        </div>
      </form>

      {/* Success Modal */}
      <SubmissionSuccessModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        submissionData={submissionData}
        rowNumber={sheetRowNumber}
      />
    </div>
  );
};
