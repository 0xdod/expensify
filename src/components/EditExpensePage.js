import React from 'react';
import { connect } from 'react-redux';

import ExpenseForm from './ExpenseForm';
import { removeExpense, editExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
	onSubmit = expense => {
		this.props.editExpense(this.props.expense.id, expense);
		this.props.history.push('/');
	};

	onRemove = id => {
		this.props.removeExpense(id);
		this.props.history.push('/');
	};
	render() {
		return (
			<div>
				<ExpenseForm
					expense={this.props.expense}
					onSubmit={expense => this.onSubmit(expense)}
				/>
				<button onClick={ () => this.onRemove(this.props.expense.id)}>
					Remove
				</button>
			</div>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		expense: state.expenses.find(
			expense => expense.id == props.match.params.id
		),
	};
};

const mapDispatchToProps = dispatch => {
	return {
		editExpense: (id, expense) => dispatch(editExpense(id, expense)),
		removeExpense: id => dispatch(removeExpense(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
