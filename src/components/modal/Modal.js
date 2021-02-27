import React,{Fragment,useState,useContext} from 'react'
import './modal.css'
import {Login} from '../login/Login'
import {Register} from '../register/Register'
import {RateContext} from '../../context/Context'

export const Modal = () => {

	const {state,modalShowHandler} = useContext(RateContext)

	const [value,setValue] = useState('login')

	const links = [{name:'Вход', id:'login'},{name:'Регистрация', id:'register'}]

	const windowHandler = (id) => {
		setValue(id)
	}

	let cls = ['modal']

	state.showModal? cls = ['modal','modalShow'] : cls= ['modal']
	return(
		<div className={cls.join(' ')}>
		    <Fragment>
		    <div className="modalHead">
		    	<ul>

		    		{links.map((item,i) => {
		    			return (
		    				<li style={{fontWeight: item.id == value? 'bold': 'normal',cursor:'pointer'}}
		    				key = {item.id} 
		    				onClick = {()=>windowHandler(item.id)}>{item.name}</li>
		    				)
		    		})}
		    	</ul>
		    	<i className="fa fa-times" aria-hidden = 'true' onClick = {modalShowHandler}/>
		    </div>
		    <hr/>
		    </Fragment>
		    <h2 className='error'>{state.error}</h2>
		    {value == 'register' ? <Register/>: <Login/>}
		</div>
		)
}