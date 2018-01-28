import moment from 'moment'

export default (expenses, filters) => {
	const { text = '', sortBy = 'date', startDate = undefined, endDate = undefined } = filters;
	return expenses
		.filter(expense => {
			const createdAtMoment = moment(expense.createdAt)
			const startDateMatch = startDate ? 
			startDate.isSameOrBefore(createdAtMoment, 'day') : true;
			const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment,'day') : true;
			const descMatch = expense.description
				.toLowerCase()
				.includes(text.toLowerCase());
			const noteMatch = expense.note
				.toLowerCase()
				.includes(text.toLowerCase());
			let textMatch = descMatch || noteMatch;
			return startDateMatch && endDateMatch && textMatch;
		})
		.sort((a, b) => {
			if (sortBy === 'date') {
				return a.createdAt < b.createdAt ? 1 : -1;
			} else if (sortBy === 'amount') {
				return a.amount < b.amount ? 1 : -1;
			}
			return 0
		});
};
