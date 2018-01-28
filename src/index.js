import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import { addExpense } from './actions/expenses';
import configureStore from './store/configureStore';
import * as serviceWorker from './serviceWorker';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();
store.dispatch(
	addExpense({
		createdAt: 10000,
		description: 'Water bill',
		amount: 100,
	})
);
store.dispatch(
	addExpense({
		createdAt: 20000,
		description: 'Rent bill',
		amount: 5000,
	})
);
store.dispatch(
	addExpense({
		createdAt: 250000,
		description: 'Gas bill',
		amount: 50,
	})
);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
