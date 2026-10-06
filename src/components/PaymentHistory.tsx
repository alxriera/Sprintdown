import type { Payment } from '../types';

interface PaymentHistoryProps {
  payments: Payment[];
}

export default function PaymentHistory({ payments }: PaymentHistoryProps) {
  const sortedPayments = [...payments].sort((a, b) => b.timestamp - a.timestamp);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <div className="payment-history">
      <h2>Payment History</h2>
      {sortedPayments.length === 0 ? (
        <p className="empty-state">No payments yet</p>
      ) : (
        <div className="history-list">
          {sortedPayments.map(payment => (
            <div key={payment.id} className="history-item">
              <div className="history-header">
                <span className="history-amount">${payment.amount.toFixed(2)}</span>
                <span className="history-date">{formatDate(payment.timestamp)}</span>
              </div>
              <div className="history-allocations">
                {payment.allocations.map((alloc, idx) => (
                  <div key={idx} className="allocation">
                    <span className="allocation-name">{alloc.debtName}</span>
                    <span className="allocation-amount">${alloc.amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
