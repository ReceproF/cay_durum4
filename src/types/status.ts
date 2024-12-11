export type StatusType = 'ready' | 'notReady' | 'low' | 'empty';

export interface Status {
  status: StatusType;
  readyTime: number | null;
  lastUpdated: number;
}

export interface TeaPackage {
  amount: number;
  unit: 'gram' | 'paket';
}

export interface TeaSchedule {
  time: string;
  description: string;
}

export interface TeaCost {
  amount: number;
  date: string;
}

export interface SystemStatus {
  tea: Status;
  water: Status;
  teaPackage: TeaPackage;
  schedule: TeaSchedule[];
  cost: TeaCost;
}