import selectExpensesTotal from '../../selectors/expenses-total.js';
import expenses from '../fixtures/expenses';

test('should return zero if no expenses', () => {
	const total = selectExpensesTotal([]);
	expect(total).toBe(0);
});

test('should add up a single expense correctly', () => {
	const expense = expenses[0];
	const total = selectExpensesTotal([expense]);
	expect(total).toBe(expense.amount);
});

test('should add up a multiple expense correctly', () => {
	const testTotal = expenses
		.map(e => e.amount)
		.reduce((acc, value) => acc + value);
	const total = selectExpensesTotal(expenses);
	expect(total).toBe(testTotal);
});
