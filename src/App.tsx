import { useState, useEffect } from 'react';
import DebtList from './components/DebtList';
import PaymentEntry from './components/PaymentEntry';
import PaymentHistory from './components/PaymentHistory';
import ProgressTracker from './components/ProgressTracker';
import Settings from './components/Settings';
import { loadData, saveData } from './storage';
import { processPayment, createPayment, getTotalDebt, getTotalPaid, getCurrentTarget } from './paymentLogic';
import type { AppData } from './types';
import './App.css';

function App() {
  const [data, setData] = useState<AppData>(() => loadData());
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    saveData(data);
  }, [data]);

  const handlePayment = (amount: number) => {
    const { updatedDebts, allocations } = processPayment(data.debts, amount);
    const payment = createPayment(amount, allocations);
    
    setData({
      debts: updatedDebts,
      payments: [...data.payments, payment]
    });
  };

  const handleUpdateDebts = (updatedDebts: typeof data.debts) => {
    setData(prev => ({ ...prev, debts: updatedDebts }));
  };

  const totalRemaining = getTotalDebt(data.debts);
  const totalPaid = getTotalPaid(data.payments);
  const currentTarget = getCurrentTarget(data.debts);
  const allPaid = totalRemaining === 0;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Sprintdown</h1>
        <button className="settings-button" onClick={() => setShowSettings(true)}>
          ⚙️
        </button>
      </header>

      <main className="app-main">
        <ProgressTracker
          totalPaid={totalPaid}
          totalRemaining={totalRemaining}
          currentTarget={currentTarget}
        />

        <PaymentEntry
          onSubmitPayment={handlePayment}
          disabled={allPaid}
        />

        <DebtList
          debts={data.debts}
          currentTargetId={currentTarget?.id || null}
        />

        <PaymentHistory payments={data.payments} />
      </main>

      {showSettings && (
        <Settings
          debts={data.debts}
          onUpdateDebts={handleUpdateDebts}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}

export default App;
