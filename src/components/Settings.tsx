import { useState } from 'react';
import type { Debt } from '../types';

interface SettingsProps {
  debts: Debt[];
  onUpdateDebts: (debts: Debt[]) => void;
  onClose: () => void;
}

export default function Settings({ debts, onUpdateDebts, onClose }: SettingsProps) {
  const [editedDebts, setEditedDebts] = useState<Debt[]>(
    [...debts].sort((a, b) => a.rank - b.rank)
  );

  const handleDebtChange = (id: string, field: keyof Debt, value: string | number) => {
    setEditedDebts(prev =>
      prev.map(debt =>
        debt.id === id ? { ...debt, [field]: value } : debt
      )
    );
  };

  const handleSave = () => {
    onUpdateDebts(editedDebts);
    onClose();
  };

  const handleReset = () => {
    if (confirm('Reset all data? This will clear all payments and reset debts to defaults.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="settings-overlay">
      <div className="settings-panel">
        <div className="settings-header">
          <h2>Settings</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        <div className="settings-content">
          <h3>Edit Debts</h3>
          {editedDebts.map(debt => (
            <div key={debt.id} className="debt-edit-item">
              <div className="edit-row">
                <label>Rank #{debt.rank}</label>
              </div>
              <div className="edit-row">
                <label>Name</label>
                <input
                  type="text"
                  value={debt.name}
                  onChange={(e) => handleDebtChange(debt.id, 'name', e.target.value)}
                />
              </div>
              <div className="edit-row">
                <label>Balance</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={debt.balance}
                  onChange={(e) => handleDebtChange(debt.id, 'balance', parseFloat(e.target.value) || 0)}
                  disabled={debt.isPaid}
                />
              </div>
              <div className="edit-row">
                <label>Interest Rate (%)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={debt.interestRate}
                  onChange={(e) => handleDebtChange(debt.id, 'interestRate', parseFloat(e.target.value) || 0)}
                />
              </div>
              {debt.isPaid && (
                <div className="paid-notice">✓ Marked as paid</div>
              )}
            </div>
          ))}
        </div>

        <div className="settings-actions">
          <button className="save-button" onClick={handleSave}>Save Changes</button>
          <button className="cancel-button" onClick={onClose}>Cancel</button>
          <button className="reset-button" onClick={handleReset}>Reset All Data</button>
        </div>
      </div>
    </div>
  );
}
