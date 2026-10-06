import type { AppData, Debt } from './types';

const STORAGE_KEY = 'sprintdown-data';

const defaultDebts: Debt[] = [
  {
    id: '1',
    rank: 1,
    name: 'Lending Club',
    balance: 3500,
    interestRate: 0,
    isPaid: false
  },
  {
    id: '2',
    rank: 2,
    name: 'Citi',
    balance: 0,
    interestRate: 0,
    isPaid: false
  },
  {
    id: '3',
    rank: 3,
    name: 'BOA',
    balance: 0,
    interestRate: 0,
    isPaid: false
  },
  {
    id: '4',
    rank: 4,
    name: 'Upgrade',
    balance: 0,
    interestRate: 0,
    isPaid: false
  }
];

export function loadData(): AppData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading data:', error);
  }
  
  return {
    debts: defaultDebts,
    payments: []
  };
}

export function saveData(data: AppData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data:', error);
  }
}
