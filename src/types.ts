export interface Debt {
  id: string;
  rank: number;
  name: string;
  balance: number;
  interestRate: number;
  isPaid: boolean;
}

export interface Payment {
  id: string;
  amount: number;
  timestamp: number;
  allocations: PaymentAllocation[];
}

export interface PaymentAllocation {
  debtId: string;
  debtName: string;
  amount: number;
}

export interface AppData {
  debts: Debt[];
  payments: Payment[];
}
