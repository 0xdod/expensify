import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment'

import { ExpenseListFilter } from '../../components/ExpenseListFilter'
import expenses from '../fixtures/expenses';
import {filters, altFilters} from '../fixtures/filters';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
	setTextFilter = jest.fn()
	sortByDate = jest.fn()
	sortByAmount = jest.fn()
	setEndDate = jest.fn()
	setStartDate = jest.fn()
	wrapper = shallow(<ExpenseListFilter 
		filters={filters}
		setTextFilter={setTextFilter}
		sortByDate={sortByDate}
		sortByAmount={sortByAmount}
		setStartDate={setStartDate}
		setEndDate={setEndDate}
		/>)
})

test('should render ExpenseListFilter correctly', () => {
	expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseListFilter with alt data correctly', () => {
	wrapper.setProps({filters: altFilters})
	expect(wrapper).toMatchSnapshot()
})

test('should handle text change', () => {
	const value = 'water'
	wrapper.find('input').simulate('change', { target: {value}})
	expect(setTextFilter).toHaveBeenLastCalledWith(value)
})

test('should sort by date', () => {
	const value = 'date'
	wrapper.setProps({
		filters:altFilters
	})
	wrapper.find('select').simulate('change', { target: {value}})
	expect(sortByDate).toHaveBeenCalled()
})

test('should sort by amount', () => {
	const value = 'amount'
	wrapper.find('select').simulate('change', { target: {value}})
	expect(sortByAmount).toHaveBeenCalled()
})

test('should handle dates change', () => {
	const dates = {
		startDate: moment(),
		endDate: moment().add(2, 'month')
	}
	wrapper.find('DateRangePicker').prop('onDatesChange')(dates)
	expect(setStartDate).toHaveBeenLastCalledWith(dates.startDate)
	expect(setEndDate).toHaveBeenLastCalledWith(dates.endDate)
})

test('should handle on focus change', () => {
	const calendarFocused = 'endDate';
	wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused)
	expect(wrapper.state('calendarFocused')).toBe(calendarFocused)
})