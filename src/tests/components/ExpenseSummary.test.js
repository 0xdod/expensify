import React from 'react';
import { shallow } from 'enzyme';

import { ExpenseSummary } from '../../components/ExpenseSummary'
import expenses from '../fixtures/expenses';

test('should render ExpenseSummary correctly with multiple count', () => {
	const wrapper = shallow(<ExpenseSummary count={5} total={1000} />)
	expect(toJSON(wrapper)).toMatchSnapshot()
})

test('should render ExpenseSummary correctly with a single count', () => {
	const wrapper = shallow(<ExpenseSummary count={1} total={100} />)
	expect(toJSON(wrapper)).toMatchSnapshot()
})