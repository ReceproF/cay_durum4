import React, { useState } from 'react';
import { Status, StatusType, SystemStatus, TeaSchedule } from '../types/status';
import { TimerControl } from './TimerControl';

interface AdminPanelProps {
  status: SystemStatus;
  onUpdateStatus: (update: Partial<SystemStatus>) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ status, onUpdateStatus }) => {
  const [teaMinutes, setTeaMinutes] = useState('5');
  const [waterMinutes, setWaterMinutes] = useState('5');
  const [teaAmount, setTeaAmount] = useState(status.teaPackage.amount.toString());
  const [teaUnit, setTeaUnit] = useState(status.teaPackage.unit);
  const [cost, setCost] = useState(status.cost.amount.toString());
  const [date, setDate] = useState(status.cost.date);
  const [schedules, setSchedules] = useState<TeaSchedule[]>(status.schedule);

  const updateStatus = (type: 'tea' | 'water', newStatus: StatusType, minutes?: string) => {
    const update: Partial<SystemStatus> = {
      [type]: {
        ...status[type],
        status: newStatus,
        lastUpdated: Date.now(),
        readyTime: minutes ? Date.now() + parseInt(minutes) * 60000 : null,
      },
    };
    onUpdateStatus(update);
  };

  const handleTeaTimerUpdate = () => {
    updateStatus('tea', 'notReady', teaMinutes);
  };

  const handleWaterTimerUpdate = () => {
    updateStatus('water', 'notReady', waterMinutes);
  };

  const handleUpdate = () => {
    onUpdateStatus({
      teaPackage: {
        amount: parseFloat(teaAmount),
        unit: teaUnit as 'gram' | 'paket',
      },
      cost: {
        amount: parseFloat(cost),
        date: date,
      },
      schedule: schedules,
    });
  };

  const addSchedule = () => {
    setSchedules([...schedules, { time: '12:00', description: 'Yeni Çay Saati' }]);
  };

  const updateSchedule = (index: number, field: keyof TeaSchedule, value: string) => {
    const newSchedules = [...schedules];
    newSchedules[index] = { ...newSchedules[index], [field]: value };
    setSchedules(newSchedules);
  };

  const removeSchedule = (index: number) => {
    setSchedules(schedules.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Çay Durumu Yönetimi</h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => updateStatus('tea', 'ready')}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Çay Hazır!
              </button>
              <button
                onClick={() => updateStatus('tea', 'notReady', teaMinutes)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Çay Hazır Değil!
              </button>
              <button
                onClick={() => updateStatus('tea', 'low')}
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
              >
                Çay Azalıyor!
              </button>
              <button
                onClick={() => updateStatus('tea', 'empty')}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Çay Bitti!
              </button>
            </div>
            <TimerControl
              minutes={teaMinutes}
              onChange={setTeaMinutes}
              onUpdate={handleTeaTimerUpdate}
              label="Demleme süresi (dakika)"
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Su Durumu Yönetimi</h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => updateStatus('water', 'ready')}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Su Hazır!
              </button>
              <button
                onClick={() => updateStatus('water', 'notReady', waterMinutes)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Su Hazır Değil!
              </button>
              <button
                onClick={() => updateStatus('water', 'empty')}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Su Bitti!
              </button>
            </div>
            <TimerControl
              minutes={waterMinutes}
              onChange={setWaterMinutes}
              onUpdate={handleWaterTimerUpdate}
              label="Kaynama süresi (dakika)"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Çay Paketi Yönetimi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Miktar
              <input
                type="number"
                value={teaAmount}
                onChange={(e) => setTeaAmount(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="0"
                step="0.1"
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Birim
              <select
                value={teaUnit}
                onChange={(e) => setTeaUnit(e.target.value as 'gram' | 'paket')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="paket">Paket</option>
                <option value="gram">Gram</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Çay İçme Saatleri</h2>
        <div className="space-y-4">
          {schedules.map((schedule, index) => (
            <div key={index} className="flex gap-4 items-center">
              <input
                type="time"
                value={schedule.time}
                onChange={(e) => updateSchedule(index, 'time', e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <input
                type="text"
                value={schedule.description}
                onChange={(e) => updateSchedule(index, 'description', e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Açıklama"
              />
              <button
                onClick={() => removeSchedule(index)}
                className="text-red-500 hover:text-red-700"
              >
                Sil
              </button>
            </div>
          ))}
          <button
            onClick={addSchedule}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Yeni Saat Ekle
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Çay Ücreti ve Tarih</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ücret (TL)
              <input
                type="number"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="0"
                step="0.01"
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tarih
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleUpdate}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
        >
          Güncelle
        </button>
      </div>
    </div>
  );
};