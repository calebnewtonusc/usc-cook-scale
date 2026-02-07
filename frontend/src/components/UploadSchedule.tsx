import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import type { ClassInput } from '../types';
import { parsePDF, parseICS } from '../services/parsers';
import ManualEntry from './ManualEntry';

interface UploadScheduleProps {
  onAnalyze: (classes: ClassInput[]) => void;
}

type Tab = 'pdf' | 'ics' | 'manual';

export default function UploadSchedule({ onAnalyze }: UploadScheduleProps) {
  const [activeTab, setActiveTab] = useState<Tab>('pdf');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File, type: 'pdf' | 'ics') => {
    setLoading(true);
    setError(null);

    try {
      let classes: ClassInput[];

      if (type === 'pdf') {
        classes = await parsePDF(file);
      } else {
        classes = await parseICS(file);
      }

      if (classes.length === 0) {
        setError('No classes found in the file. Please try manual entry.');
        setLoading(false);
        return;
      }

      onAnalyze(classes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse file');
    } finally {
      setLoading(false);
    }
  };

  const pdfDropzone = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        handleFile(acceptedFiles[0], 'pdf');
      }
    }
  });

  const icsDropzone = useDropzone({
    accept: { 'text/calendar': ['.ics'] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        handleFile(acceptedFiles[0], 'ics');
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
              activeTab === 'pdf'
                ? 'border-b-4 border-cook-red text-cook-red'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('pdf')}
          >
            PDF Upload
          </button>
          <button
            type="button"
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'ics'
                ? 'border-b-4 border-cook-red text-cook-red'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('ics')}
          >
            ICS Upload
          </button>
          <button
            type="button"
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'manual'
                ? 'border-b-4 border-cook-red text-cook-red'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('manual')}
          >
            Manual Entry
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Tab Content */}
        {activeTab === 'pdf' && (
          <div
            {...pdfDropzone.getRootProps()}
            className={`border-3 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
              pdfDropzone.isDragActive
                ? 'border-cook-red bg-red-50'
                : 'border-gray-300 hover:border-cook-red'
            }`}
          >
            <input {...pdfDropzone.getInputProps()} />
            {loading ? (
              <div className="text-cook-red">
                <div className="animate-spin text-4xl mb-2">🔥</div>
                <p className="font-medium">Parsing your schedule...</p>
              </div>
            ) : (
              <>
                <div className="text-5xl mb-4">📄</div>
                <p className="text-lg font-medium mb-2">
                  {pdfDropzone.isDragActive
                    ? 'Drop your PDF here!'
                    : 'Drag & drop your schedule PDF'}
                </p>
                <p className="text-gray-600">or click to browse</p>
              </>
            )}
          </div>
        )}

        {activeTab === 'ics' && (
          <div
            {...icsDropzone.getRootProps()}
            className={`border-3 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
              icsDropzone.isDragActive
                ? 'border-cook-red bg-red-50'
                : 'border-gray-300 hover:border-cook-red'
            }`}
          >
            <input {...icsDropzone.getInputProps()} />
            {loading ? (
              <div className="text-cook-red">
                <div className="animate-spin text-4xl mb-2">🔥</div>
                <p className="font-medium">Parsing your schedule...</p>
              </div>
            ) : (
              <>
                <div className="text-5xl mb-4">📅</div>
                <p className="text-lg font-medium mb-2">
                  {icsDropzone.isDragActive
                    ? 'Drop your ICS file here!'
                    : 'Drag & drop your calendar file'}
                </p>
                <p className="text-gray-600">or click to browse</p>
              </>
            )}
          </div>
        )}

        {activeTab === 'manual' && <ManualEntry onSubmit={onAnalyze} />}
      </div>
    </div>
  );
}
