import { createStore } from 'redux';

export const store = createStore((state = { count: 0 }, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return { count: state.count + action.by };
		case 'DECREMENT':
			return { count: state.count - action.by };
		case 'SET':
			return { count: action.count };
		case 'RESET':
			return { count: 0 };
		default:
			return state;
	}
});

const incrementCount = ({ by = 1 } = {}) => ({
	type: 'INCREMENT',
	by
})

const decrementCount = ({by =1 } = {}) => ({
	type: 'DECREMENT',
	by
});

const setCount = ({count}) => ({
	type: 'SET',
	count
});

const resetCount = () => ({
	type: 'RESET',
});

var unsubscribe =  store.subscribe(() => console.log(store.getState()))
store.dispatch(incrementCount({by:5}));
store.dispatch(decrementCount());
store.dispatch(resetCount());
store.dispatch(setCount({count:10}));
