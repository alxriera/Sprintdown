import { useState } from 'react';

interface PaymentEntryProps {
  onSubmitPayment: (amount: number) => void;
  disabled: boolean;
}

export default function PaymentEntry({ onSubmitPayment, disabled }: PaymentEntryProps) {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const paymentAmount = parseFloat(amount);
    
    if (isNaN(paymentAmount) || paymentAmount <= 0) {
      alert('Please enter a valid payment amount');
      return;
    }
    
    onSubmitPayment(paymentAmount);
    setAmount('');
  };

  return (
    <div className="payment-entry">
      <h2>Make Payment</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <span className="currency-symbol">$</span>
          <input
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            disabled={disabled}
            inputMode="decimal"
          />
        </div>
        <button type="submit" disabled={disabled || !amount}>
          Apply Payment
        </button>
      </form>
      {disabled && (
        <p className="info-text">All debts are paid! 🎉</p>
      )}
    </div>
  );
}
