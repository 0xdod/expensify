import React from 'react';
import {shallow} from 'enzyme';

import NotFoundPage from '../../components/NotFoundPage';

test('should test NotFoundPage', () => {
	const wrapper = shallow(<NotFoundPage />)
	expect(toJSON(wrapper)).toMatchSnapshot()
}) 