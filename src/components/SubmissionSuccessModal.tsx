import React from 'react';
import { CheckCircle2, MapPin, Briefcase, UserCheck, RefreshCw, X, MessageCircle, ExternalLink } from 'lucide-react';
import type { FormSubmissionPayload } from '../types/trainer';

interface SubmissionSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  submissionData: FormSubmissionPayload | null;
  rowNumber?: number;
}

export const SubmissionSuccessModal: React.FC<SubmissionSuccessModalProps> = ({
  isOpen,
  onClose,
  submissionData,
  rowNumber
}) => {
  if (!isOpen || !submissionData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/75 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-emerald-100 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-1 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-xs">
            <CheckCircle2 className="w-9 h-9 text-white" />
          </div>

          <h3 className="text-xl font-bold">Trainer Application Registered!</h3>
          <p className="text-emerald-100 text-xs mt-1">
            Application submitted successfully
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-slate-700 text-xs">
          {/* Join WhatsApp Group Card */}
          <div className="bg-emerald-50/90 rounded-xl p-4 border border-emerald-200 space-y-2 text-center shadow-xs">
            <div className="flex items-center justify-center gap-2 font-bold text-emerald-900 text-sm">
              <MessageCircle className="w-5 h-5 text-emerald-600" />
              <span>Join Techmiya Trainers WhatsApp Group</span>
            </div>
            <p className="text-emerald-700 text-[11px] leading-relaxed">
              Get instant updates on corporate training opportunities and connect directly with the Techmiya network.
            </p>
            <a
              href="https://chat.whatsapp.com/ES52jzTWHQdLIXKtN9aCqD"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full mt-1 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all hover:scale-[1.01]"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Join WhatsApp Group Directly</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Personal Card */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-slate-800 text-sm border-b border-slate-200 pb-2">
              <UserCheck className="w-4 h-4 text-blue-600" />
              <span>Personal Details</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-slate-400 block text-[11px]">Full Name:</span>
                <span className="font-medium text-slate-800 text-sm">{submissionData.fullName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Experience:</span>
                <span className="font-medium text-slate-800 text-sm">{submissionData.experienceYears} Years</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Phone:</span>
                <span className="font-medium text-slate-800">{submissionData.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Email:</span>
                <span className="font-medium text-slate-800 truncate block">{submissionData.email}</span>
              </div>
            </div>
          </div>

          {/* Topics */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-slate-800 text-sm border-b border-slate-200 pb-2">
              <Briefcase className="w-4 h-4 text-purple-600" />
              <span>Topics & Domains</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {submissionData.topicsInterested.split(', ').map((topic, i) => (
                <span key={i} className="bg-purple-50 text-purple-700 border border-purple-200 font-medium text-[11px] px-2.5 py-0.5 rounded-md">
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-slate-800 text-sm border-b border-slate-200 pb-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Location Mapping</span>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Permanent:</span>
                <span className="font-medium text-slate-800">{submissionData.permanentLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Current:</span>
                <span className="font-medium text-slate-800">{submissionData.currentLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Preferred:</span>
                <span className="font-medium text-slate-800">{submissionData.preferredLocation}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-between items-center">
          <p className="text-[11px] text-slate-400">
            Recorded at {new Date(submissionData.submittedAt).toLocaleTimeString()}
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Submit Another Trainer</span>
          </button>
        </div>
      </div>
    </div>
  );
};
