import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral'

import selectExpenseTotal from '../selectors/expenses-total';
import selectExpenses from '../selectors/expenses';

function pluralize(len) {
	if (len > 1)
		return 's'
	return ''
}

export const ExpenseSummary = ({expenseCount, expenseTotal}) => (
	<div>
        <p>
           Viewing {expenseCount} {'expense'+pluralize(expenseCount)} totalling {numeral(expenseTotal / 100).format('$0,0.00')}
        </p>
	</div>
);

const mapStateToProps = (state) => {
	const visibleExpenses = selectExpenses(state.expenses, state.filters)
	return {
		expenseTotal: selectExpenseTotal(visibleExpenses),
		expenseCount: visibleExpenses.length, 
	}
}

export default connect(mapStateToProps)(ExpenseSummary);