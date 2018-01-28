import moment from 'moment'

import selectExpenses from '../../selectors/expenses'
import expenses from '../fixtures/expenses'

test('should filter by text value', ()=>{
	const filters = {text: 'ot'}
    const result = selectExpenses(expenses, filters)
    expect(result).toEqual([expenses[0], expenses[2]])
})

test('should filter by start date', ()=>{
	const filters = {startDate: moment(0)}
	const result = selectExpenses(expenses, filters)
	expect(result).toEqual([expenses[3], expenses[0], expenses[1]])
})

test('should filter by end date', ()=>{
	const filters = {endDate: moment(0)}
	const result = selectExpenses(expenses, filters)
	expect(result).toEqual([expenses[0], expenses[1], expenses[2]])
})

test('should sort by date', ()=>{
	const result = selectExpenses(expenses, {sortBy : 'date'})
	expect(result).toEqual([expenses[3], expenses[0], expenses[1], expenses[2]])
})

test('should sort by amount', ()=>{
	const result = selectExpenses(expenses, {sortBy:'amount'})
	expect(result).toEqual([expenses[3], expenses[0], expenses[2], expenses[1]])
})