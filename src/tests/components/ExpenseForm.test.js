import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment'

import ExpenseForm from '../../components/ExpenseForm'
import expenses from '../fixtures/expenses';

test('should render ExpenseForm correctly', ()=>{
	const wrapper = shallow(<ExpenseForm />);
	expect(toJSON(wrapper)).toMatchSnapshot();
})

test('should render correctly ExpenseForm with expense data', ()=>{
	const wrapper = shallow(<ExpenseForm expense={expenses[3]}/>);
	expect(toJSON(wrapper)).toMatchSnapshot();
})

test('should render error for invalid data ExpenseForm', ()=>{
	const wrapper = shallow(<ExpenseForm />);
	expect(wrapper).toMatchSnapshot();
	wrapper.find('form').simulate('submit', { preventDefault: () => {} })
	expect(wrapper.state('error').length).toBeGreaterThan(0);
	expect(wrapper).toMatchSnapshot();
})

test('should set description on input change for ExpenseForm', ()=>{
	const value = "new description"
	const wrapper = shallow(<ExpenseForm />);
	expect(wrapper).toMatchSnapshot();
	wrapper.find('input').at(0).simulate('change', {
		target: { value }
	})
	expect(wrapper.state('description')).toBe(value);
	expect(wrapper).toMatchSnapshot();
})

test('should set note on textarea change for ExpenseForm', ()=>{
	const value = "new note"
	const wrapper = shallow(<ExpenseForm />);
	expect(wrapper).toMatchSnapshot();
	wrapper.find('textarea').simulate('change', {
		target: { value }
	})
	expect(wrapper.state('note')).toBe(value);
	expect(wrapper).toMatchSnapshot();
})

test('should set amount on valid input', ()=>{
	const value = "12.33"
	const wrapper = shallow(<ExpenseForm />);
	expect(wrapper).toMatchSnapshot();
	wrapper.find('input').at(1).simulate('change', {
		target: { value }
	})
	expect(wrapper.state('amount')).toBe(value);
	expect(wrapper).toMatchSnapshot();
})

test('should not set amount on invalid input', ()=>{
	const value = "12.331ab"
	const wrapper = shallow(<ExpenseForm />);
	expect(wrapper).toMatchSnapshot();
	wrapper.find('input').at(1).simulate('change', {
		target: { value }
	})
	expect(wrapper.state('amount')).toBe('');
	expect(wrapper).toMatchSnapshot();
})

test('should call onSubmit for valid form sunmission', ()=>{
	const onSubmitSpy = jest.fn();
	const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);
	wrapper.find('form').simulate('submit', { preventDefault: () => {} })
	expect(wrapper.state('error')).toBe('');
	expect(onSubmitSpy).toHaveBeenLastCalledWith({
		description: expenses[0].description,
		amount: expenses[0].amount,
		note: expenses[0].note,
		createdAt: expenses[0].createdAt
	});
})

// test('should set new date on date change', ()=>{
// 	const now = moment()
// 	const wrapper = shallow(<ExpenseForm />)
// 	wrapper.find('SingleDatePicker').prop('onDateChange')(now)
// 	expect(wrapper.state('createdAt')).toEqual(now)
// })

// test('should set new date on date change', () => {
// 	const focused = true
// 	const wrapper = shallow(<ExpenseForm />)
// 	wrapper.find('SingleDatePicker').prop('onFocusChange')({focused})
// 	expect(wrapper.state('calendarFocused')).toBe(focused)
// })