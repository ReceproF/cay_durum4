import React from 'react';
import { Timer } from 'lucide-react';

interface TimerControlProps {
  minutes: string;
  onChange: (value: string) => void;
  onUpdate: () => void;
  label: string;
}

export const TimerControl: React.FC<TimerControlProps> = ({
  minutes,
  onChange,
  onUpdate,
  label,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Timer className="w-5 h-5 text-gray-600" />
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      </div>
      <div className="flex gap-2">
        <input
          type="number"
          value={minutes}
          onChange={(e) => onChange(e.target.value)}
          className="block w-32 rounded-md border-gray-300 shadow-sm 
                   focus:border-blue-500 focus:ring-blue-500"
          min="1"
        />
        <button
          onClick={onUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded-md 
                   hover:bg-blue-600 transition-colors"
        >
          Güncelle
        </button>
      </div>
    </div>
  );
};