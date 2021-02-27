import React,{useContext} from 'react';
import './Exchange.css';
import {RateContext} from '../../context/Context'


export const Exchange = () => {

	const {state} = useContext(RateContext)
	const currency = {...state.currency}

	return(
		<div className= 'exchange'>
			<div className="exchangeContainer">
				<div className = "exchangeContent">
					<div>
					    <p>Базовая валюта:&nbsp;{state.base}&nbsp; Дата: {state.date}</p>
					</div>
					<ul>
						{
							Object.keys(currency).map((item,i) => {
								return(
									<li key ={item}>
										<span><img src={currency[item].flag} alt={item}/></span>
										<span>{`1 ${state.base} = ${currency[item].course} ${item}`}</span>
									</li>
									)
							})

						}
					</ul>
				</div>
			</div>
		</div>
		)
}