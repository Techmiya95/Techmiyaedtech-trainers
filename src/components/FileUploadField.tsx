import React, { useRef, useState } from 'react';
import { Upload, FileText, Image as ImageIcon, CheckCircle, AlertCircle, X } from 'lucide-react';

interface FileUploadFieldProps {
  label: string;
  accept: string;
  maxSizeMB: number;
  fileType: 'resume' | 'image';
  selectedFiles: FileList | null;
  onFileSelect: (files: FileList | null) => void;
  error?: string;
  uploadProgress?: number;
  uploadedUrl?: string;
}

export const FileUploadField: React.FC<FileUploadFieldProps> = ({
  label,
  accept,
  maxSizeMB,
  fileType,
  selectedFiles,
  onFileSelect,
  error,
  uploadProgress,
  uploadedUrl
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const currentFile = selectedFiles && selectedFiles.length > 0 ? selectedFiles[0] : null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-slate-700">
          {label} <span className="text-rose-500">*</span>
        </label>
        <span className="text-[11px] font-medium text-slate-400">
          Max {maxSizeMB}MB ({accept.replaceAll('.', '').toUpperCase()})
        </span>
      </div>

      <input
        type="file"
        ref={inputRef}
        accept={accept}
        onChange={(e) => onFileSelect(e.target.files)}
        className="hidden"
      />

      {!currentFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-blue-500 bg-blue-50/50 scale-[1.01]'
              : error
              ? 'border-rose-300 bg-rose-50/30 hover:border-rose-400'
              : 'border-slate-300 bg-slate-50/50 hover:border-blue-400 hover:bg-slate-50'
          }`}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="p-3 bg-white shadow-xs rounded-full border border-slate-200">
              {fileType === 'resume' ? (
                <FileText className="w-5 h-5 text-blue-600" />
              ) : (
                <ImageIcon className="w-5 h-5 text-emerald-600" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">
                Click to upload or drag & drop
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {fileType === 'resume'
                  ? 'Supported formats: .PDF, .DOC, .DOCX'
                  : 'Supported formats: .JPG, .JPEG, .PNG'}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="border border-slate-200 bg-white rounded-xl p-3 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className={`p-2.5 rounded-lg ${
                fileType === 'resume' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
              }`}>
                {fileType === 'resume' ? <FileText className="w-5 h-5" /> : <ImageIcon className="w-5 h-5" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-800 truncate">
                  {currentFile.name}
                </p>
                <p className="text-xs text-slate-400">
                  {formatFileSize(currentFile.size)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {uploadedUrl ? (
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <CheckCircle className="w-3.5 h-3.5" /> Uploaded
                </span>
              ) : uploadProgress !== undefined && uploadProgress > 0 && uploadProgress < 100 ? (
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full animate-pulse">
                  {uploadProgress}%
                </span>
              ) : null}

              <button
                type="button"
                onClick={() => {
                  onFileSelect(null);
                  if (inputRef.current) inputRef.current.value = '';
                }}
                className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                title="Remove file"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {uploadProgress !== undefined && uploadProgress > 0 && uploadProgress < 100 && (
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2.5 overflow-hidden">
              <div
                className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="mt-1 text-xs text-rose-500 font-medium flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};
