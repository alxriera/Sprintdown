import type { Debt, Payment, PaymentAllocation } from './types';

export function processPayment(
  debts: Debt[],
  paymentAmount: number
): { updatedDebts: Debt[]; allocations: PaymentAllocation[] } {
  const updatedDebts = [...debts];
  const allocations: PaymentAllocation[] = [];
  
  const sortedDebts = updatedDebts
    .filter(debt => !debt.isPaid && debt.balance > 0)
    .sort((a, b) => a.rank - b.rank);
  
  let remainingAmount = paymentAmount;
  
  for (const debt of sortedDebts) {
    if (remainingAmount <= 0) break;
    
    const amountToApply = Math.min(remainingAmount, debt.balance);
    
    debt.balance = Math.max(0, debt.balance - amountToApply);
    
    if (debt.balance === 0) {
      debt.isPaid = true;
    }
    
    allocations.push({
      debtId: debt.id,
      debtName: debt.name,
      amount: amountToApply
    });
    
    remainingAmount -= amountToApply;
  }
  
  return { updatedDebts, allocations };
}

export function createPayment(
  amount: number,
  allocations: PaymentAllocation[]
): Payment {
  return {
    id: `payment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    amount,
    timestamp: Date.now(),
    allocations
  };
}

export function getTotalDebt(debts: Debt[]): number {
  return debts.reduce((sum, debt) => sum + debt.balance, 0);
}

export function getTotalPaid(payments: Payment[]): number {
  return payments.reduce((sum, payment) => sum + payment.amount, 0);
}

export function getCurrentTarget(debts: Debt[]): Debt | null {
  const unpaidDebts = debts
    .filter(debt => !debt.isPaid && debt.balance > 0)
    .sort((a, b) => a.rank - b.rank);
  
  return unpaidDebts.length > 0 ? unpaidDebts[0] : null;
}
