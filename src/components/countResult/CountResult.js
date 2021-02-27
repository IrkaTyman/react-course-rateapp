import React,{useContext} from 'react'
import './CountResult.css'
import {RateContext} from '../../context/Context'

export const CountResult = () => {

	const {state} = useContext(RateContext)

	return(
		<div className ='calcResult'>
			<ul>

			{state.result ? <li>
					<p>
						<span>{state.inputValue}&nbsp;RUB</span>
						=
						<span>{state.result}&nbsp;{state.currencyValue}</span>
					</p>
				</li> : null}
				
			</ul>
		</div>
	)

}