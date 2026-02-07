import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import type { ClassInput } from '../types';
import { parseAnyFile } from '../services/parsers';
import ManualEntry from './ManualEntry';

interface UploadScheduleProps {
  onAnalyze: (classes: ClassInput[]) => void;
}

type Tab = 'upload' | 'text';

export default function UploadSchedule({ onAnalyze }: UploadScheduleProps) {
  const [activeTab, setActiveTab] = useState<Tab>('text');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      const classes = await parseAnyFile(file);

      if (classes.length === 0) {
        setError('Could not find any classes in the file. The file may not contain schedule information, or the format is unclear. Please try text entry instead.');
        setLoading(false);
        return;
      }

      onAnalyze(classes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse file. Please try text entry instead.');
    } finally {
      setLoading(false);
    }
  };

  const fileDropzone = useDropzone({
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        handleFile(acceptedFiles[0]);
      }
    }
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="card">
        <h2 className="text-2xl font-bold text-center mb-6">Upload Your Schedule</h2>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6 border-b-2">
          <button
            type="button"
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'text'
                ? 'border-b-4 border-cook-red text-cook-red'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('text')}
          >
            Text Entry
          </button>
          <button
            type="button"
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'upload'
                ? 'border-b-4 border-cook-red text-cook-red'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('upload')}
          >
            Upload File
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Tab Content */}
        {activeTab === 'text' && <ManualEntry onSubmit={onAnalyze} />}

        {activeTab === 'upload' && (
          <div>
            <div
              {...fileDropzone.getRootProps()}
              className={`border-3 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
                fileDropzone.isDragActive
                  ? 'border-cook-red bg-red-50'
                  : 'border-gray-300 hover:border-cook-red'
              }`}
            >
              <input {...fileDropzone.getInputProps()} />
              {loading ? (
                <div className="text-cook-red">
                  <div className="animate-spin text-4xl mb-2">🔥</div>
                  <p className="font-medium">AI is reading your file...</p>
                  <p className="text-sm text-gray-600 mt-2">This may take a moment</p>
                </div>
              ) : (
                <>
                  <div className="text-5xl mb-4">📁</div>
                  <p className="text-lg font-medium mb-2">
                    {fileDropzone.isDragActive
                      ? 'Drop your file here!'
                      : 'Drag & drop ANY file'}
                  </p>
                  <p className="text-gray-600 mb-4">or click to browse</p>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>✅ PDF, Image (PNG/JPG), Text, ICS/Calendar</p>
                    <p className="font-medium text-cook-red">Our AI can read anything! 🔥</p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
