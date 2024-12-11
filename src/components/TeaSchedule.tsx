import React from 'react';
import { Clock } from 'lucide-react';
import { TeaSchedule as TeaScheduleType } from '../types/status';

interface TeaScheduleProps {
  schedule: TeaScheduleType[];
}

export const TeaSchedule: React.FC<TeaScheduleProps> = ({ schedule }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-6 h-6 text-gray-600" />
        <h2 className="text-xl font-bold">Çay İçme Saatleri</h2>
      </div>
      <ul className="space-y-2">
        {schedule.map((item, index) => (
          <li key={index} className="flex justify-between items-center py-2 border-b last:border-0">
            <span className="font-semibold">{item.time}</span>
            <span className="text-gray-600">{item.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};