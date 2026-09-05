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
  FileCheck,
  AlertTriangle,
  XCircle,
  Shirt
} from 'lucide-react';

import { trainerFormSchema } from '../schemas/trainerSchema';
import type { TrainerFormValues } from '../schemas/trainerSchema';
import { DomainSelect } from './DomainSelect';
import { LocationSelector } from './LocationSelector';
import { FileUploadField } from './FileUploadField';
import { fileToBase64 } from '../services/fileUploadService';
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
      imageFile: null,
      agreeCodeOfConduct: false
    }
  });

  const permanentLoc = watch('permanentLocation');
  const currentLoc = watch('currentLocation');
  const preferredLoc = watch('preferredLocation');

  const dosList = [
    "Report to the college at least 30 minutes before the training session.",
    "Wear complete formal attire during all classroom/training hours.",
    "Display your Disciples India ID card at all times on campus.",
    "Follow the training schedule and complete the assigned syllabus.",
    "Maintain accurate attendance and submit daily reports.",
    "Submit the Daily Training Report with attendance, topics covered, and photographs before 8:00 PM.",
    "Maintain professionalism and treat students, faculty, and hostel staff with respect.",
    "Stay only in the hostel room allotted by the college.",
    "Keep your hostel room and training area neat and clean.",
    "Immediately report any issues to the Project Coordinator.",
    "Take care of college and hostel property.",
    "Represent Disciples India with discipline, integrity, and professionalism at all times."
  ];

  const dontsList = [
    "Shorts, sleeveless clothing, or casual lounge wear are strictly prohibited anywhere within the college campus premises, even after college hours.",
    "Do not attend training sessions without complete formal dress.",
    "Not to exchange or collect contact information of students.",
    "Do not miss, delay, or cancel any session without prior approval.",
    "Do not consume alcohol, smoke, or use tobacco during the assignment.",
    "Do not invite friends or visitors to the hostel or campus.",
    "Do not leave the hostel overnight without informing and obtaining approval from the Project Coordinator.",
    "Do not use mobile phones during training except for official purposes.",
    "Do not post photos or videos of students, faculty, or the campus on social media without permission.",
    "Do not collect money, gifts, or personal favours from students.",
    "Do not engage in arguments or use inappropriate language.",
    "Do not disclose confidential project or student information.",
    "Do not damage college or hostel property. Any damage caused due to negligence will be recovered from the trainer.",
    "Do not behave in any manner that could affect the reputation of Disciples India or the institution."
  ];

  const dressCodeList = [
    "👔 Formal dress is compulsory during classroom/training hours.",
    "🚫 Shorts are strictly prohibited anywhere inside the college campus, including the hostel premises, Canteen, even after working hours.",
    "👟 Wear clean, decent footwear and maintain a professional appearance throughout the assignment."
  ];

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

      // 3. Format payload for Google Apps Script
      const payload: FormSubmissionPayload = {
        fullName: data.fullName.trim(),
        phone: data.phone.trim(),
        email: data.email.trim(),
        topicsInterested: data.topicsInterested.join(', '),
        permanentLocation: (data.permanentLocation?.district || data.permanentLocation?.state)
          ? `${data.permanentLocation.district || ''}, ${data.permanentLocation.state || ''}`.replace(/^,\s*|,\s*$/g, '')
          : 'N/A',
        currentLocation: (data.currentLocation?.district || data.currentLocation?.state)
          ? `${data.currentLocation.district || ''}, ${data.currentLocation.state || ''}`.replace(/^,\s*|,\s*$/g, '')
          : 'N/A',
        preferredLocation: (data.preferredLocation?.district || data.preferredLocation?.state)
          ? `${data.preferredLocation.district || ''}, ${data.preferredLocation.state || ''}`.replace(/^,\s*|,\s*$/g, '')
          : 'N/A',
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

        <div className="relative z-10">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Corporate Trainer Registration
          </h1>
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
              <h2 className="text-lg font-bold text-slate-900">3. Location Details (Optional)</h2>
              <p className="text-xs text-slate-500">Select State & District if you wish to specify location preferences</p>
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
              <p className="text-xs text-slate-500">Upload your latest resume and profile image to be stored in Google Drive</p>
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

        {/* Section 5: Mandatory Code of Conduct & Agreement */}
        <div className="space-y-6 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">5. Trainer Code of Conduct & Guidelines</h2>
              <p className="text-xs text-slate-500">Review mandatory rules, dress code, and professional conduct expectations</p>
            </div>
          </div>

          <div className="bg-slate-50/80 rounded-2xl p-4 sm:p-6 border border-slate-200 space-y-6">
            {/* DO's List */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm bg-emerald-100/70 px-3 py-1.5 rounded-lg w-fit">
                <CheckCircle2 className="w-4 h-4" />
                <span>✅ DO's (Mandatory Guidelines)</span>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs text-slate-700 font-medium">
                {dosList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                    <span className="bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded-md text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* DON'Ts List */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-rose-700 font-bold text-sm bg-rose-100/70 px-3 py-1.5 rounded-lg w-fit">
                <XCircle className="w-4 h-4" />
                <span>❌ DON'Ts (Strictly Prohibited)</span>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs text-slate-700 font-medium">
                {dontsList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                    <span className="bg-rose-50 text-rose-700 font-bold px-1.5 py-0.5 rounded-md text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dress Code Section */}
            <div className="space-y-3 bg-amber-50/80 border border-amber-200/80 p-4 rounded-xl">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <Shirt className="w-4 h-4 text-amber-600" />
                <span>👔 Mandatory Dress Code Policy</span>
              </div>
              <ul className="space-y-2 text-xs text-amber-950 font-medium">
                {dressCodeList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Non-compliance Disclaimer Alert */}
            <div className="flex items-start gap-3 bg-slate-900 text-white p-4 rounded-xl border border-slate-800">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed text-slate-200">
                <strong className="text-amber-400 font-semibold">Notice of Liability:</strong> Non-compliance with these guidelines may result in immediate disciplinary action, termination/removal from the project, or recovery of any financial losses incurred.
              </p>
            </div>

            {/* Mandatory Checkbox Agreement */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer p-4 rounded-2xl bg-white border-2 border-indigo-200 hover:border-indigo-500 transition-all shadow-xs">
                <input
                  type="checkbox"
                  {...register('agreeCodeOfConduct')}
                  className="mt-0.5 w-5 h-5 text-indigo-600 rounded-md border-slate-300 focus:ring-indigo-500 cursor-pointer"
                />
                <span className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                  I have read, understood, and agree to strictly abide by Techmiya EdTech's Trainer Guidelines, Code of Conduct, and Mandatory Dress Code Policy. <span className="text-rose-500">*</span>
                </span>
              </label>
              {errors.agreeCodeOfConduct && (
                <p className="mt-2 text-xs text-rose-600 font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{errors.agreeCodeOfConduct.message}</span>
                </p>
              )}
            </div>
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
