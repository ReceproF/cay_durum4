import React, { useState, useEffect } from 'react';
import { AdminPanel } from './components/AdminPanel';
import { StatusCard } from './components/StatusCard';
import { TeaPackageInfo } from './components/TeaPackageInfo';
import { TeaSchedule } from './components/TeaSchedule';
import { TeaCost } from './components/TeaCost';
import { SystemStatus } from './types/status';
import { getStoredStatus, updateStoredStatus, defaultSystemStatus } from './utils/storage';
import { checkTimerCompletion } from './utils/timer';
import { Toaster } from 'react-hot-toast';

function App() {
  const [status, setStatus] = useState<SystemStatus>(defaultSystemStatus);
  const [isAdmin, setIsAdmin] = useState(false);
  const [lastCheck, setLastCheck] = useState(Date.now());

  // Load initial status
  useEffect(() => {
    setStatus(getStoredStatus());
  }, []);

  // Timer check effect
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      
      setStatus(current => {
        const teaComplete = checkTimerCompletion('tea', current.tea, lastCheck);
        const waterComplete = checkTimerCompletion('water', current.water, lastCheck);

        if (teaComplete || waterComplete) {
          const newStatus = { ...current };
          if (teaComplete) {
            newStatus.tea = { ...newStatus.tea, status: 'ready', readyTime: null };
          }
          if (waterComplete) {
            newStatus.water = { ...newStatus.water, status: 'ready', readyTime: null };
          }
          updateStoredStatus(newStatus);
          return newStatus;
        }
        return current;
      });

      setLastCheck(now);
    }, 1000);

    return () => clearInterval(interval);
  }, [lastCheck]);

  const handleStatusUpdate = (update: Partial<SystemStatus>) => {
    setStatus(current => {
      const newStatus = {
        ...current,
        ...update,
      };
      updateStoredStatus(newStatus);
      return newStatus;
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Çay ve Su Durumu
          </h1>
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {isAdmin ? 'Kullanıcı Görünümü' : 'Yönetici Görünümü'}
          </button>
        </div>

        {isAdmin ? (
          <AdminPanel status={status} onUpdateStatus={handleStatusUpdate} />
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StatusCard title="Çay Durumu" type="tea" status={status.tea} />
              <StatusCard title="Su Durumu" type="water" status={status.water} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TeaPackageInfo teaPackage={status.teaPackage} />
              <TeaSchedule schedule={status.schedule} />
              <TeaCost cost={status.cost} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;