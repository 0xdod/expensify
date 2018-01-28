import React from 'react';
import { DateRangePicker } from 'react-dates';
import { connect } from 'react-redux';
import {
	setTextFilter,
	sortByDate,
	sortByAmount,
	setStartDate,
	setEndDate,
} from '../actions/filters';

export class ExpenseListFilter extends React.Component {
	state = {
		calendarFocused: null,
	};

	onDatesChange = ({ startDate, endDate }) => {
		this.props.setStartDate(startDate);
		this.props.setEndDate(endDate);
	};

	onFocusChange = calendarFocused => {
		this.setState(() => ({ calendarFocused }));
	};
	onTextChange = e => {
		this.props.setTextFilter(e.target.value);
	};
	onSortChange = e => {
		if (e.target.value === 'date') {
			this.props.sortByDate();
		} else if (e.target.value === 'amount') {
			this.props.sortByAmount();
		} else return false;
	};

	render() {
		return (
			<div>
				<input
					type="text"
					value={this.props.filters.text}
					onChange={this.onTextChange}
				/>
				<select
					value={this.props.filters.sortBy}
					onChange={this.onSortChange}
				>
					{/*<option value="">---</option>*/}
					<option value="date">Date</option>
					<option value="amount">Amount</option>
				</select>
				<DateRangePicker
					startDate={this.props.filters.startDate}
					endDate={this.props.filters.endDate}
					onDatesChange={this.onDatesChange}
					focusedInput={this.state.calendarFocused}
					onFocusChange={this.onFocusChange}
					numberOfMonth={1}
					isOutsideRange={() => false}
					showClearDates={true}
				/>
			</div>
		);
	}
}
const mapStateToProps = state => ({
	filters: state.filters,
});

const mapDispatchToProps = dispatch => ({
	sortByDate: () => dispatch(sortByDate()),
	sortByAmount: () => dispatch(sortByAmount()),
	setStartDate: date => dispatch(setStartDate(date)),
	setEndDate: date => dispatch(setEndDate(date)),
	setTextFilter: value => dispatch(setTextFilter(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilter);
