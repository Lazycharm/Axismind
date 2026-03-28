import React, { useState, useRef } from 'react';
import { backend } from '@/api/backendClient';
import { Button } from "@/components/ui/button";
import { Upload, X } from 'lucide-react';

export default function ImageUpload({ value, onChange, label = "Upload Image", className = "", helperText = "" }) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await backend.integrations.Core.UploadFile({ file });
    onChange(file_url);
    setUploading(false);
    e.target.value = '';
  };

  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>}
      {helperText && (
        <p className="text-xs text-gray-500 mb-2 leading-relaxed">{helperText}</p>
      )}
      <div className="space-y-3">
        {value && (
          <div className="relative w-full h-44 rounded-xl overflow-hidden border border-gray-600 bg-gradient-to-br from-slate-900/80 to-gray-900 flex items-center justify-center p-2">
            <img src={value} alt="Preview" className="max-w-full max-h-full w-auto h-auto object-contain object-center" />
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute top-2 right-2 p-1.5 bg-red-600 rounded-lg hover:bg-red-700 text-white shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <Button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full bg-gray-700 hover:bg-gray-600 text-gray-200 border border-dashed border-gray-500"
          variant="outline"
        >
          {uploading ? (
            <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />Uploading...</>
          ) : (
            <><Upload className="w-4 h-4 mr-2" />{value ? 'Change Image' : 'Upload Image'}</>
          )}
        </Button>
      </div>
    </div>
  );
}