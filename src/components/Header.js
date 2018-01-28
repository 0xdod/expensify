import React from 'react';
import { NavLink } from 'react-router-dom';

const Seperator = () => (<span>&nbsp;|&nbsp;</span>)

const Header = () => (
	<header>
		<h1>Expensify</h1>
		<NavLink to="/" exact={true} activeClassName="is-active">
			Dashboard
		</NavLink>
		<Seperator />
		<NavLink to="/create" activeClassName="is-active">
			Create
		</NavLink>
		<Seperator />
		<NavLink to="/help" activeClassName="is-active">
			Help
		</NavLink>
	</header>
);

export default Header;
