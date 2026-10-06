import type { Debt } from '../types';

interface DebtListProps {
  debts: Debt[];
  currentTargetId: string | null;
}

export default function DebtList({ debts, currentTargetId }: DebtListProps) {
  const sortedDebts = [...debts].sort((a, b) => a.rank - b.rank);

  return (
    <div className="debt-list">
      <h2>Debts</h2>
      {sortedDebts.map(debt => (
        <div 
          key={debt.id} 
          className={`debt-item ${debt.isPaid ? 'paid' : ''} ${debt.id === currentTargetId ? 'current-target' : ''}`}
        >
          <div className="debt-header">
            <span className="debt-rank">#{debt.rank}</span>
            <span className="debt-name">{debt.name}</span>
            {debt.isPaid && <span className="paid-badge">✓ PAID</span>}
            {debt.id === currentTargetId && !debt.isPaid && (
              <span className="target-badge">← CURRENT</span>
            )}
          </div>
          <div className="debt-details">
            <span className="debt-balance">
              ${debt.balance.toFixed(2)}
            </span>
            {debt.interestRate > 0 && (
              <span className="debt-rate">{debt.interestRate}% APR</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
