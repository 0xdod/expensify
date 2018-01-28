import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';

global.toJSON = toJSON;

Enzyme.configure({
	adapter: new Adapter()
})