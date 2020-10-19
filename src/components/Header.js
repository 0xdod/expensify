import React from 'react';

//TODO: add proptypes and default props

function Header(props) {
	return (
		<div className="header">
			<div className="container">
				<h1 className="header__title">{props.title}</h1>
				{props.subtitle && (
					<h2 className="header__subtitle">{props.subtitle}</h2>
				)}
			</div>
		</div>
	);
}

export default Header;
