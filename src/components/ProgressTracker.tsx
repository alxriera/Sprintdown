import type { Debt } from '../types';

interface ProgressTrackerProps {
  totalPaid: number;
  totalRemaining: number;
  currentTarget: Debt | null;
}

export default function ProgressTracker({ totalPaid, totalRemaining, currentTarget }: ProgressTrackerProps) {
  const totalOriginal = totalPaid + totalRemaining;
  const progressPercentage = totalOriginal > 0 ? (totalPaid / totalOriginal) * 100 : 0;

  return (
    <div className="progress-tracker">
      <h2>Progress</h2>
      
      <div className="progress-stats">
        <div className="stat">
          <div className="stat-label">Total Paid</div>
          <div className="stat-value paid">${totalPaid.toFixed(2)}</div>
        </div>
        <div className="stat">
          <div className="stat-label">Remaining</div>
          <div className="stat-value remaining">${totalRemaining.toFixed(2)}</div>
        </div>
      </div>

      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${progressPercentage}%` }}
        />
        <div className="progress-bar-text">
          {progressPercentage.toFixed(1)}%
        </div>
      </div>

      {currentTarget && (
        <div className="current-target-info">
          <div className="target-label">Current Target:</div>
          <div className="target-name">{currentTarget.name}</div>
          <div className="target-balance">${currentTarget.balance.toFixed(2)}</div>
        </div>
      )}
    </div>
  );
}
