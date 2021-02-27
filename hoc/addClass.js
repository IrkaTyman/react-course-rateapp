import React from 'react';



export const addClass = (Component, className) => {

	return (props) => {
		return(
			<div className = {className}>
				<Component/>
			</div>
		)
	}
}