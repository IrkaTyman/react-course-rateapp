import React,{Fragment,useContext} from 'react'
import '../login/Login.css'
import {Button} from '../button/Button'
import {RateContext} from '../../context/Context'

export const Register =  () => {

	const {renderInputs,state,registerHandler} = useContext(RateContext)

	return(
		<Fragment>
			<div className='modalForm'>
				{renderInputs()}
			</div>
			<div className='modalBtn'>
				<Button text = 'Зарегистрироваться' disabled={!state.formIsValid} click= {registerHandler}/>
			</div>
		</Fragment>
		)
}