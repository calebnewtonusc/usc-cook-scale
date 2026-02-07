import { useState } from 'react';
import type { ClassInput } from '../types';

interface ManualEntryProps {
  onSubmit: (classes: ClassInput[]) => void;
}

export default function ManualEntry({ onSubmit }: ManualEntryProps) {
  const [classes, setClasses] = useState<ClassInput[]>([
    { courseName: '', professor: '', units: 4 }
  ]);

  const addClass = () => {
    setClasses([...classes, { courseName: '', professor: '', units: 4 }]);
  };

  const removeClass = (index: number) => {
    setClasses(classes.filter((_, i) => i !== index));
  };

  const updateClass = (index: number, field: keyof ClassInput, value: string | number) => {
    const newClasses = [...classes];
    newClasses[index] = { ...newClasses[index], [field]: value };
    setClasses(newClasses);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validClasses = classes.filter(c => c.courseName && c.professor);
    if (validClasses.length === 0) {
      alert('Please add at least one class');
      return;
    }
    onSubmit(validClasses);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {classes.map((cls, index) => (
        <div key={index} className="card space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">Class {index + 1}</h3>
            {classes.length > 1 && (
              <button
                type="button"
                onClick={() => removeClass(index)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Course Name</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g., CSCI 104"
              value={cls.courseName}
              onChange={(e) => updateClass(index, 'courseName', e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Professor Name</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g., John Smith"
              value={cls.professor}
              onChange={(e) => updateClass(index, 'professor', e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Units</label>
            <input
              type="number"
              className="input-field"
              min="1"
              max="8"
              value={cls.units}
              onChange={(e) => updateClass(index, 'units', parseInt(e.target.value) || 4)}
              required
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addClass}
        className="btn-secondary w-full"
      >
        + Add Another Class
      </button>

      <button type="submit" className="btn-primary w-full">
        Calculate Cook Scale
      </button>
    </form>
  );
}
