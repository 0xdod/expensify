import { createStore, combineReducers } from 'redux';
import { v4 as uuid } from 'uuid';

//-- action generators for state's expenses object
const addExpense = ({
	description = '',
	note = '',
	amount = 0,
	createdAt = 0,
} = {}) => ({
	type: 'ADD_EXPENSE',
	expense: {
		id: uuid(),
		description,
		note,
		amount,
		createdAt,
	},
});

const removeExpense = ({ id }) => ({
	type: 'REMOVE_EXPENSE',
	id,
});

const editExpense = (id, updates) => ({
	type: 'EDIT_EXPENSE',
	id,
	updates,
});

//-- action generators for the state's filter object
const setTextFilter = (text = '') => ({
	type: 'SET_TEXT_FILTER',
	text,
});

const sortByAmount = () => ({
	type: 'SORT_BY_AMOUNT',
});

const sortByDate = () => ({
	type: 'SORT_BY_DATE',
});

const setStartDate = (startDate = null) => ({
	type: 'SET_START_DATE',
	startDate,
});

const setEndDate = (endDate = null) => ({
	type: 'SET_END_DATE',
	endDate,
});
//---- setting reducers' state default ---
const expensesReducerDefault = [];

const filterReducerDefault = {
	text: '',
	sortBy: 'date',
	startDate: null,
	endDate: null,
};

//-- Reducers ---
const filterReducer = (state = filterReducerDefault, action) => {
	switch (action.type) {
		case 'SET_TEXT_FILTER':
			return { ...state, text: action.text };
		case 'SORT_BY_DATE':
			return { ...state, sortBy: 'date' };
		case 'SORT_BY_AMOUNT':
			return { ...state, sortBy: 'amount' };
		case 'SET_START_DATE':
			return { ...state, startDate: action.startDate };
		case 'SET_END_DATE':
			return { ...state, endDate: action.endDate };
		default:
			return state;
	}
};

const expensesReducer = (state = expensesReducerDefault, action) => {
	switch (action.type) {
		case 'ADD_EXPENSE':
			return [...state, action.expense];
		case 'REMOVE_EXPENSE':
			return state.filter(({ id }) => id !== action.id);
		case 'EDIT_EXPENSE':
			return state.map(expense =>
				expense.id === action.id
					? { ...expense, ...action.updates }
					: expense
			);
		default:
			return state;
	}
};

const store = createStore(
	combineReducers({
		expenses: expensesReducer,
		filters: filterReducer,
	})
);

const getVisibleExpenses = (expenses, filters) => {
	const { text, sortBy, startDate, endDate } = filters;
	return expenses
		.filter(expense => {
			const startDateMatch =
				typeof startDate !== 'number' || expense.createdAt >= startDate;
			const endDateMatch =
				typeof endDate !== 'number' || expense.createdAt <= endDate;
			const descMatch = expense.description
				.toLowerCase()
				.includes(text.toLowerCase());
			const noteMatch = expense.note
				.toLowerCase()
				.includes(text.toLowerCase());
			let textMatch = descMatch || noteMatch;
			return startDateMatch && endDateMatch && textMatch;
		})
		.sort((a, b) => {
			if (sortBy === 'date') {
				return a.createdAt < b.createdAt ? 1 : -1;
			} else if (sortBy === 'amount') {
				return a.amount < b.amount ? 1 : -1;
			}
		});
};

store.subscribe(() => {
	const state = store.getState();
	const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
	console.log(visibleExpenses);
});

//var expenseOne = store.dispatch(addExpense());
var expenseTwo = store.dispatch(
	addExpense({
		description: 'Bread and beans',
		amount: 10,
		note: 'Beans na life',
		createdAt: 1000,
	})
);
//store.dispatch(removeExpense({ id: expenseOne.expense.id }));
//store.dispatch(editExpense(expenseTwo.expense.id, { amount: 100 }));
store.dispatch(setTextFilter('na'));
store.dispatch(setStartDate(1000));
//store.dispatch(sortByDate());
//store.dispatch(sortByAmount());

// const demoState = {
// 	expenses: [
// 		{
// 			id: 'xjdjfdj',
// 			description: 'Rent',
// 			note: 'Stuff for flex',
// 			amount: 1000,
// 			createdAt: 0,
// 		},
// 	],
// 	filters: {
// 		text: 'flex',
// 		sortBy: 'amount', //date or amount
// 		startDate: null,
// 		endDate: null,
// 	},
// };
