import React,{Fragment,useContext} from 'react'
import './Login.css'
import {Button} from '../button/Button'
import {RateContext} from '../../context/Context'

export const Login = () => {

	const {renderInputs,state,loginHandler} = useContext(RateContext)
	return(
		<Fragment>
			<div className='modalForm'>
				{renderInputs()}
			</div>
			<div className='modalBtn'>
				<Button text = 'Войти' disabled={!state.formIsValid} click = {loginHandler}/>
			</div>
		</Fragment>
		)
}