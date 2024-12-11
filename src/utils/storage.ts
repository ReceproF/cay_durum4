import { SystemStatus, Status, TeaPackage, TeaSchedule, TeaCost } from '../types/status';

const STORAGE_KEY = 'tea-water-status';

const defaultStatus: Status = {
  status: 'notReady',
  readyTime: null,
  lastUpdated: Date.now(),
};

const defaultTeaPackage: TeaPackage = {
  amount: 1,
  unit: 'paket',
};

const defaultSchedule: TeaSchedule[] = [
  { time: '09:00', description: 'Sabah Çayı' },
  { time: '12:00', description: 'Öğle Çayı' },
  { time: '15:00', description: 'İkindi Çayı' },
];

const defaultCost: TeaCost = {
  amount: 0,
  date: new Date().toISOString().split('T')[0],
};

export const defaultSystemStatus: SystemStatus = {
  tea: { ...defaultStatus },
  water: { ...defaultStatus },
  teaPackage: defaultTeaPackage,
  schedule: defaultSchedule,
  cost: defaultCost,
};

export const getStoredStatus = (): SystemStatus => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : defaultSystemStatus;
};

export const updateStoredStatus = (status: SystemStatus): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(status));
};