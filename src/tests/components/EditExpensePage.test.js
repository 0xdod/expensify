import React from 'react';
import { shallow } from 'enzyme';

import { EditExpensePage } from '../../components/EditExpensePage'
import expenses from '../fixtures/expenses';


let editExpense, removeExpense, history, wrapper;

beforeEach(() => {
	editExpense = jest.fn();
	removeExpense = jest.fn();
	history = { push: jest.fn() }
	wrapper = shallow(< EditExpensePage
		editExpense={editExpense}
		removeExpense={removeExpense}
		history={history}
		expense={expenses[0]} />)
})

test('should render edit expense page', () => {
	expect(wrapper).toMatchSnapshot();
})

test('should handle editExpense action', () => {
	wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1])
	expect(history.push).toHaveBeenLastCalledWith('/')
	expect(editExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[1])
})

test('should handle removeExpense action', () => {
	wrapper.find('button').simulate('click')
	expect(history.push).toHaveBeenLastCalledWith('/')
	expect(removeExpense).toHaveBeenLastCalledWith(expenses[0].id)
}) 