import { Status } from '../types/status';
import toast from 'react-hot-toast';

export const getTimerMessage = (type: 'tea' | 'water', status: Status): string | null => {
  if (status.readyTime && status.status === 'notReady') {
    const remainingTime = Math.max(0, Math.ceil((status.readyTime - Date.now()) / 60000));
    
    if (remainingTime > 0) {
      return type === 'tea' 
        ? `Çayın demlenmesine ${remainingTime} dakika kaldı`
        : `Suyun kaynamasına ${remainingTime} dakika kaldı`;
    }
  }
  return null;
};

export const checkTimerCompletion = (
  type: 'tea' | 'water',
  status: Status,
  lastCheck: number
): boolean => {
  if (status.readyTime && status.status === 'notReady') {
    const now = Date.now();
    const isComplete = now >= status.readyTime;
    const wasNotComplete = lastCheck < status.readyTime;
    
    if (isComplete && wasNotComplete) {
      const message = type === 'tea' 
        ? '🫖 Çay Hazır!'
        : '💧 Su Kaynadı!';
      
      toast.success(message, {
        duration: 5000,
        position: 'top-right',
      });
      
      return true;
    }
  }
  return false;
};