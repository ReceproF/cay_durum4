import React from 'react';
import { Clock } from 'lucide-react';
import { Status } from '../types/status';
import { getTimerMessage } from '../utils/timer';

interface StatusCardProps {
  title: string;
  type: 'tea' | 'water';
  status: Status;
}

const statusMessages = {
  ready: 'Hazır!',
  notReady: 'Hazır Değil!',
  low: 'Azalıyor!',
  empty: 'Bitti!',
};

const statusColors = {
  ready: 'bg-green-100 border-green-500 text-green-700',
  notReady: 'bg-yellow-100 border-yellow-500 text-yellow-700',
  low: 'bg-orange-100 border-orange-500 text-orange-700',
  empty: 'bg-red-100 border-red-500 text-red-700',
};

export const StatusCard: React.FC<StatusCardProps> = ({ title, type, status }) => {
  const timerMessage = getTimerMessage(type, status);

  return (
    <div className={`rounded-lg border-2 p-6 ${statusColors[status.status]}`}>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">
            {statusMessages[status.status]}
          </span>
        </div>
        {timerMessage && (
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4" />
            <span>{timerMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};