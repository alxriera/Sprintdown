import { processPayment } from '../src/paymentLogic';
import type { Debt } from '../src/types';

const testDebts: Debt[] = [
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
    balance: 2000,
    interestRate: 0,
    isPaid: false
  },
  {
    id: '3',
    rank: 3,
    name: 'BOA',
    balance: 1500,
    interestRate: 0,
    isPaid: false
  },
  {
    id: '4',
    rank: 4,
    name: 'Upgrade',
    balance: 1000,
    interestRate: 0,
    isPaid: false
  }
];

console.log('=== SPRINTDOWN PAYMENT LOGIC TEST ===\n');

console.log('Initial debts:');
testDebts.forEach(d => console.log(`  #${d.rank} ${d.name}: $${d.balance}`));
console.log('');

console.log('Test 1: Payment exactly matches first debt');
let debts1 = JSON.parse(JSON.stringify(testDebts));
let result1 = processPayment(debts1, 3500);
console.log('Payment: $3500');
console.log('Allocations:', result1.allocations);
console.log('Updated debts:');
result1.updatedDebts.forEach(d => console.log(`  #${d.rank} ${d.name}: $${d.balance} ${d.isPaid ? '✓ PAID' : ''}`));
console.log('');

console.log('Test 2: Payment exceeds first debt (overflow to second)');
let debts2 = JSON.parse(JSON.stringify(testDebts));
let result2 = processPayment(debts2, 4000);
console.log('Payment: $4000');
console.log('Allocations:', result2.allocations);
console.log('Updated debts:');
result2.updatedDebts.forEach(d => console.log(`  #${d.rank} ${d.name}: $${d.balance} ${d.isPaid ? '✓ PAID' : ''}`));
console.log('');

console.log('Test 3: Payment covers multiple debts (overflow chain)');
let debts3 = JSON.parse(JSON.stringify(testDebts));
let result3 = processPayment(debts3, 6000);
console.log('Payment: $6000');
console.log('Allocations:', result3.allocations);
console.log('Updated debts:');
result3.updatedDebts.forEach(d => console.log(`  #${d.rank} ${d.name}: $${d.balance} ${d.isPaid ? '✓ PAID' : ''}`));
console.log('');

console.log('Test 4: Partial payment to first debt');
let debts4 = JSON.parse(JSON.stringify(testDebts));
let result4 = processPayment(debts4, 1000);
console.log('Payment: $1000');
console.log('Allocations:', result4.allocations);
console.log('Updated debts:');
result4.updatedDebts.forEach(d => console.log(`  #${d.rank} ${d.name}: $${d.balance} ${d.isPaid ? '✓ PAID' : ''}`));
console.log('');

console.log('Test 5: Payment exceeds all debts');
let debts5 = JSON.parse(JSON.stringify(testDebts));
let result5 = processPayment(debts5, 10000);
console.log('Payment: $10000');
console.log('Allocations:', result5.allocations);
console.log('Total allocated:', result5.allocations.reduce((sum, a) => sum + a.amount, 0));
console.log('Updated debts:');
result5.updatedDebts.forEach(d => console.log(`  #${d.rank} ${d.name}: $${d.balance} ${d.isPaid ? '✓ PAID' : ''}`));
console.log('');

console.log('Test 6: Sequential payments (realistic workflow)');
let debts6 = JSON.parse(JSON.stringify(testDebts));
console.log('Initial state:');
debts6.forEach(d => console.log(`  #${d.rank} ${d.name}: $${d.balance}`));

let result6a = processPayment(debts6, 2000);
debts6 = result6a.updatedDebts;
console.log('\nAfter $2000 payment:');
result6a.allocations.forEach(a => console.log(`  → ${a.debtName}: $${a.amount}`));
debts6.forEach(d => console.log(`  #${d.rank} ${d.name}: $${d.balance} ${d.isPaid ? '✓ PAID' : ''}`));

let result6b = processPayment(debts6, 2000);
debts6 = result6b.updatedDebts;
console.log('\nAfter another $2000 payment:');
result6b.allocations.forEach(a => console.log(`  → ${a.debtName}: $${a.amount}`));
debts6.forEach(d => console.log(`  #${d.rank} ${d.name}: $${d.balance} ${d.isPaid ? '✓ PAID' : ''}`));

let result6c = processPayment(debts6, 3000);
debts6 = result6c.updatedDebts;
console.log('\nAfter $3000 payment:');
result6c.allocations.forEach(a => console.log(`  → ${a.debtName}: $${a.amount}`));
debts6.forEach(d => console.log(`  #${d.rank} ${d.name}: $${d.balance} ${d.isPaid ? '✓ PAID' : ''}`));

console.log('\n=== ALL TESTS COMPLETE ===');
