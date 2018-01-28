import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should setup remove expense action object', () => {
	const action = removeExpense('123');
	expect(action).toEqual({ type: 'REMOVE_EXPENSE', id: '123' });
});

test('should setup edit expense action object', () => {
	const updates = { notes: 'a note' };
	const action = editExpense('123', updates);
	expect(action).toEqual({
		type: 'EDIT_EXPENSE',
		id: '123',
		updates,
	});
});

test('should setup add expense action object with provided values', () => {
	const expenseData = { note: 'a note', description:'a description',amount: 5000, createdAt: 1000 };
	const action = addExpense(expenseData);
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense : {
			...expenseData,
			id: expect.any(String)
		}
	});
});


test('should setup add expense action object with default values', () => {
	const expenseData = { note: '', description:'',amount:0, createdAt: 0 };
	const action = addExpense();
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			...expenseData,
			id: expect.any(String),
		}
	});
});
