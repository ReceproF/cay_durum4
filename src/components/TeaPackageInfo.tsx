import React from 'react';
import { Package } from 'lucide-react';
import { TeaPackage } from '../types/status';

interface TeaPackageInfoProps {
  teaPackage: TeaPackage;
}

export const TeaPackageInfo: React.FC<TeaPackageInfoProps> = ({ teaPackage }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Package className="w-6 h-6 text-gray-600" />
        <h2 className="text-xl font-bold">Çay Paketi Durumu</h2>
      </div>
      <div className="text-lg">
        <span className="font-semibold">{teaPackage.amount}</span>{' '}
        {teaPackage.unit === 'paket' ? 'Paket' : 'Gram'} Çay Mevcut
      </div>
    </div>
  );
};