import React from 'react';
import {shallow} from 'enzyme';

import ExpenseDashboardPage from '../../components/ExpenseDashboardPage';

test('should test ExpenseDashboardPage', () => {
	const wrapper = shallow(<ExpenseDashboardPage />)
	expect(toJSON(wrapper)).toMatchSnapshot()
}) 