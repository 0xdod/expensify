import React from 'react';
import moment from 'moment'
import {Link} from 'react-router-dom'

const ExpenseListItem = ({ id, description, amount, createdAt }) => (
	<div>
		<Link to={`/edit/${id}`}>
		   <h3>{description}</h3>
		</Link>
		<p>
			amount: {amount}<br />
			date: {moment(createdAt).format("MMM Do, YYYY")}
		</p>
	</div>
);

export default ExpenseListItem;
