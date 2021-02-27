import React from 'react'
import './Calc.css'
import {Counter} from '../../components/count/Counter'
import {CountResult} from '../../components/countResult/CountResult'

export const Calc = () => {
	return(
			<div className= 'calculator'>
				<div className='calcContainer'>
					<Counter/>
					<CountResult/>
				</div>
			</div>
		)
}