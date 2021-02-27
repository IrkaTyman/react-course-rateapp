import React from 'react'
import './Dark.css'

export const Dark = (props) => {

	const cls= ['dark']

	props.showModal ? cls.push('showDark') : cls.pop()
	return(
		<div className= {cls.join(' ')} onClick = {props.click}></div>
		)
}