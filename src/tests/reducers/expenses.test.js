import moment from 'moment';

import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
	const state = expensesReducer(undefined, { type: '@@INIT' });
	expect(state).toEqual([]);
});

test('should remove expense by id', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: expenses[1].id,
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([expenses[0], expenses[2], expenses[3]]);
});

test('should not remove expense by id', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: -1,
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses);
});

test('should add an expense', () => {
	const expense = {
		id: '10',
		note: 'infinix phone',
		description: 'phone screen',
		amount: 2500,
		createdAt: 0,
	};
	const action = {
		type: 'ADD_EXPENSE',
		expense
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([...expenses, expense]);
});

test('should edit an existing expense', () => {
	const updates = {
		note: 'water',
		description: 'water',
		amount: 1000,
		createdAt: 0,
	};
	const action = {
		type: 'EDIT_EXPENSE',
		id: expenses[0].id,
		updates
	};
	const state = expensesReducer(expenses, action);
	expect(state[0]).toEqual({id: action.id, ...updates});
	expect(state.length).toBe(expenses.length)
});

test('should not edit a nonexistent expense', () => {
	const updates = {
		note: 'water',
		description: 'water',
		amount: 1000,
		createdAt: 0,
	};
	const action = {
		type: 'EDIT_EXPENSE',
		id: '-1',
		updates
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses);
	expect(state.length).toBe(expenses.length)
});