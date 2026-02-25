import { useReducer, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Flame, FileUp, CheckCircle2, Loader2, AlertCircle, FileText, Image, Calendar } from 'lucide-react';
import type { ClassInput } from '../types';
import { parseAnyFile } from '../services/parsers';
import ManualEntry from './ManualEntry';

interface UploadScheduleProps {
  onAnalyze: (classes: ClassInput[]) => void;
}

type Tab = 'upload' | 'text';
type DropzoneState = 'idle' | 'active' | 'success' | 'error';

interface UploadState {
  activeTab: Tab;
  loading: boolean;
  error: string | null;
  droppedFile: File | null;
  dropState: DropzoneState;
}

type UploadAction =
  | { type: 'SET_TAB'; tab: Tab }
  | { type: 'FILE_START' }
  | { type: 'FILE_SUCCESS' }
  | { type: 'FILE_ERROR'; error: string }
  | { type: 'FILE_DROP'; file: File }
  | { type: 'DRAG_ENTER' }
  | { type: 'DRAG_LEAVE' }
  | { type: 'RESET' };

const initialState: UploadState = {
  activeTab: 'text',
  loading: false,
  error: null,
  droppedFile: null,
  dropState: 'idle',
};

function uploadReducer(state: UploadState, action: UploadAction): UploadState {
  switch (action.type) {
    case 'SET_TAB':
      return { ...state, activeTab: action.tab, error: null, dropState: 'idle', droppedFile: null };
    case 'FILE_DROP':
      return { ...state, droppedFile: action.file };
    case 'FILE_START':
      return { ...state, loading: true, error: null, dropState: 'active' };
    case 'FILE_SUCCESS':
      return { ...state, loading: false, dropState: 'success' };
    case 'FILE_ERROR':
      return { ...state, loading: false, error: action.error, dropState: 'error' };
    case 'DRAG_ENTER':
      return { ...state, dropState: 'active' };
    case 'DRAG_LEAVE':
      return { ...state, dropState: 'idle' };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export default function UploadSchedule({ onAnalyze }: UploadScheduleProps) {
  const [state, dispatch] = useReducer(uploadReducer, initialState);
  const { activeTab, loading, error, droppedFile, dropState } = state;

  const handleFile = useCallback(async (file: File) => {
    dispatch({ type: 'FILE_START' });

    try {
      const classes = await parseAnyFile(file);

      if (classes.length === 0) {
        dispatch({
          type: 'FILE_ERROR',
          error: 'Could not find any classes in the file. The file may not contain schedule information. Please try text entry instead.',
        });
        return;
      }

      dispatch({ type: 'FILE_SUCCESS' });
      // Small delay for success animation
      setTimeout(() => onAnalyze(classes), 400);
    } catch (err) {
      dispatch({
        type: 'FILE_ERROR',
        error: err instanceof Error ? err.message : 'Failed to parse file. Please try text entry instead.',
      });
    }
  }, [onAnalyze]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      dispatch({ type: 'FILE_DROP', file });
      handleFile(file);
    }
  }, [handleFile]);

  const fileDropzone = useDropzone({
    maxFiles: 1,
    onDrop,
    onDragEnter: () => dispatch({ type: 'DRAG_ENTER' }),
    onDragLeave: () => dispatch({ type: 'DRAG_LEAVE' }),
  });

  const dropzoneClass = `
    border-3 border-dashed rounded-2xl p-10 text-center cursor-pointer
    transition-all duration-300 ease-out
    ${fileDropzone.isDragActive || dropState === 'active' ? 'border-cook-red bg-red-50 scale-[1.02] shadow-usc' : ''}
    ${dropState === 'success' ? 'border-emerald-400 bg-emerald-50' : ''}
    ${dropState === 'error' ? 'border-red-400 bg-red-50' : ''}
    ${dropState === 'idle' && !fileDropzone.isDragActive ? 'border-gray-200 hover:border-cook-red hover:bg-red-50/40 hover:shadow-usc' : ''}
  `.trim();

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="card shadow-lg">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-black text-gray-900">Upload Your Schedule</h2>
          <p className="text-gray-500 text-sm mt-1">Get your Cook Scale score in 15-30 seconds</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 p-1 bg-gray-100 rounded-xl">
          {(['text', 'upload'] as Tab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-white text-cook-red shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => dispatch({ type: 'SET_TAB', tab })}
            >
              {tab === 'text' ? (
                <span className="flex items-center justify-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  Type or Paste
                </span>
              ) : (
                <span className="flex items-center justify-center gap-1.5">
                  <FileUp className="w-4 h-4" />
                  Upload File
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 bg-red-50 border-2 border-red-200 text-red-800 px-4 py-3 rounded-xl mb-4">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">Could not parse file</p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Tab Content */}
        {activeTab === 'text' && <ManualEntry onSubmit={onAnalyze} />}

        {activeTab === 'upload' && (
          <div>
            <div {...fileDropzone.getRootProps()} className={dropzoneClass}>
              <input {...fileDropzone.getInputProps()} />

              {loading ? (
                <div className="text-cook-red">
                  <div className="mb-4 flex justify-center">
                    <div className="relative">
                      <Loader2 className="w-14 h-14 animate-spin text-cook-red" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 bg-cook-red/20 rounded-full animate-ping" />
                      </div>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-cook-red">Reading your file...</p>
                  <p className="text-sm text-gray-500 mt-2">Our AI is parsing the schedule</p>
                  {droppedFile && (
                    <p className="text-xs text-gray-400 mt-1">{droppedFile.name}</p>
                  )}
                </div>
              ) : dropState === 'success' ? (
                <div>
                  <div className="mb-4 flex justify-center">
                    <CheckCircle2 className="w-16 h-16 text-emerald-500" />
                  </div>
                  <p className="text-lg font-bold text-emerald-700">File Parsed!</p>
                  <p className="text-sm text-emerald-600 mt-1">Analyzing your schedule now...</p>
                </div>
              ) : (
                <>
                  <div className="mb-4 flex justify-center">
                    {fileDropzone.isDragActive ? (
                      <div className="relative">
                        <Flame className="w-16 h-16 text-cook-red animate-bounce-subtle" />
                      </div>
                    ) : (
                      <div className="relative group">
                        <div className="w-20 h-20 rounded-2xl bg-red-50 border-2 border-red-200 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                          <FileUp className="w-10 h-10 text-cook-red" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-cook-yellow rounded-full flex items-center justify-center text-xs font-black text-gray-900">+</div>
                      </div>
                    )}
                  </div>

                  {fileDropzone.isDragActive ? (
                    <div>
                      <p className="text-xl font-bold text-cook-red">Drop it like it's hot!</p>
                    </div>
                  ) : (
                    <>
                      <p className="text-lg font-bold text-gray-800 mb-1">
                        Drop your schedule here
                      </p>
                      <p className="text-gray-500 text-sm mb-5">or click to browse files</p>

                      <div className="flex flex-wrap justify-center gap-2">
                        {[
                          { icon: <FileText className="w-3.5 h-3.5" />, label: 'PDF', color: 'text-red-700 bg-red-50 border-red-200' },
                          { icon: <Image className="w-3.5 h-3.5" />, label: 'Screenshot', color: 'text-blue-700 bg-blue-50 border-blue-200' },
                          { icon: <Calendar className="w-3.5 h-3.5" />, label: '.ICS Calendar', color: 'text-green-700 bg-green-50 border-green-200' },
                          { icon: <FileText className="w-3.5 h-3.5" />, label: 'Text File', color: 'text-gray-700 bg-gray-50 border-gray-200' },
                        ].map(({ icon, label, color }) => (
                          <span
                            key={label}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-medium ${color}`}
                          >
                            {icon} {label}
                          </span>
                        ))}
                      </div>

                      <p className="text-xs text-cook-red font-semibold mt-4 flex items-center justify-center gap-1">
                        <Flame className="w-3.5 h-3.5" />
                        AI reads any format. Just drop it!
                      </p>
                    </>
                  )}
                </>
              )}
            </div>

            {/* Tips */}
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-xs font-bold text-amber-800 mb-2">Pro tips for best results:</p>
              <ul className="text-xs text-amber-700 space-y-1">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-amber-600" />
                  Screenshot your WeReg schedule (best results)
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-amber-600" />
                  Export your Google Calendar as .ICS file
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-amber-600" />
                  PDF from your registration confirmation email
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
