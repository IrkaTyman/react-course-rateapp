import React,{useContext} from 'react'
import './Sample.css'
import {RateContext} from '../../context/Context'
import {Button} from '../../components/button/Button'

export const Sample = () => {
	console.log()
	const {state,
		baseHandler,
		base2Handler,
		sampleDateHandler,
		dateWrite,
		sampleRemove} = useContext(RateContext)
	return(
			<div className='sample'>
				<div className='sampleContainer'>
					<div>
						<h3>
							Получить курс: &nbsp;

							<select onChange = {baseHandler} value = {state.sample.base}>
								{Object.keys(state.currency).map((item,i)=>{
									return(
										<option key={item} value = {item}>{item}</option>
										)
								})}
							</select>
							&nbsp; &nbsp;к &nbsp; &nbsp;
							<select  onChange = {base2Handler}value = {state.sample.base2}>
								{Object.keys(state.currency).map((item,i)=>{
									return(
										<option value={item} key={item}>{item}</option>
										)
								})}
							</select>
						</h3>
					</div>
					<div className='sampleHead'>
						<span >Дата: <input type="date"  onChange = {sampleDateHandler}/></span>
						<Button text='Получить курс' click ={dateWrite} arg = {state.sample}/>
					</div>
					<div className = 'sampleResult'>
						<ul>
							{Object.keys(state.sampleList).map((item,i) =>{
								return(
									<li key= {item}>
									<span><img src={state.currency[state.sampleList[item].base].flag} alt={item}/>&nbsp;{state.sampleList[item].base}</span>
									<span>{state.sampleList[item].date}</span>
									<span>{`${state.sampleList[item].course} ${state.sampleList[item].base2}`}</span>

									<button onClick = {()=>sampleRemove(item)}><i className = 'fa fa-times' /></button>
									</li>
								)
							})}
						</ul>
					</div>
				</div>
			</div>
		)
}