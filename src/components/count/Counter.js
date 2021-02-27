import React,{useContext} from 'react'
import './Counter.css'
import {RateContext} from '../../context/Context'
import {Button} from '../button/Button'


export const Counter = () => {

	const {state,inputValueHandler,currencyValueHandler,calculatorHandler} = useContext(RateContext)
	return(
		<div className='calcHead'>
			<div>
				<h4>Я хочу обменять:</h4>
			</div>
			<div className= 'operation'>
				<span>
					<input type="number" 
						   value={state.inputValue}
						   onChange = {inputValueHandler}/>
					&nbsp; RUB
				</span>

				<select name="" id="" onChange = {currencyValueHandler}>
					{Object.keys(state.currency).map((item,i) => {
						return(
							<option value={item} key = {item}>{item}</option>
						)
					})}
				</select>

				<Button text= 'Посчитать' click= {calculatorHandler} arg ={state.currencyValue}/>
			</div>
		</div>
		)
}