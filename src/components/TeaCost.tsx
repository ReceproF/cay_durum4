import React from 'react';
import { Wallet, Calendar } from 'lucide-react';
import { TeaCost as TeaCostType } from '../types/status';

interface TeaCostProps {
  cost: TeaCostType;
}

export const TeaCost: React.FC<TeaCostProps> = ({ cost }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Wallet className="w-6 h-6 text-gray-600" />
        <h2 className="text-xl font-bold">Çay Ücreti</h2>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Wallet className="w-5 h-5 text-gray-500" />
          <span className="text-lg">
            <span className="font-semibold">{cost.amount}</span> TL
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-500" />
          <span className="text-lg">{cost.date}</span>
        </div>
      </div>
    </div>
  );
};