import moment from 'moment'

import filterReducer from '../../reducers/filters'

test('should setup default filter values', ()=>{
	const state = filterReducer(undefined, {type:'@@INIT'})
	expect(state).toEqual({
		text:'',
		sortBy: 'date',
		startDate: moment().startOf('month'),
		endDate: moment().endOf('month')
	})
})

test('should set sortBy to amount', ()=>{
	const state = filterReducer(undefined, {type: 'SORT_BY_AMOUNT'})
	expect(state.sortBy).toBe('amount');
})

test('should set sortBy to date', ()=>{
	const currentState = {
		text:'',
		sortBy:'amount',
		endDate: undefined,
		startDate: undefined,
	}
	const action = {type:'SORT_BY_DATE'}
	const state = filterReducer(currentState, action)
	expect(state.sortBy).toBe('date')
})

test('should set text filter', ()=>{
	const text = 'my text'
	const state = filterReducer(undefined, {type: 'SET_TEXT_FILTER', text})
	expect(state.text).toBe(text);
})

test('should set start date', ()=>{
	const startDate = moment().add(4, 'months').startOf('month')
	const state = filterReducer(undefined, {type:'SET_START_DATE', startDate})
	expect(state.startDate).toEqual(startDate)
})

test('should set end date', ()=>{
	const endDate = moment().subtract(4, 'months').endOf('month')
	const state = filterReducer(undefined, {type:'SET_END_DATE', endDate})
	expect(state.endDate).toEqual(endDate)
})
