import React from 'react';
import './App.css';
import Layout from './components/layout/Layout'
import {RateContext} from './context/Context'
import axios from 'axios'

import CHF from './image/CHF.png';
import CNY from './image/CNY.png';
import EUR from './image/EUR.png';
import GBP from './image/GBP.png';
import JPY from './image/JPY.png';
import RUB from './image/RUB.png';
import USD from './image/USD.png';
import {Dark} from './components/dark/Dark'
import {Modal} from './components/modal/Modal'
import {Input} from './components/input/Input'

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class App extends React.Component {

	constructor(props){
		super(props)

		this.state = {

			auth:false,
			error:'',

			formControls: {
				email:{
					value:'',
					type:'email',
					label:'Email',
					errorMessage:'Введите корректный email',
					valid:false,
					touched:false,
					validation:{
						required:true,
						email:true
					}
				},
				password:{
					value:'',
					type:'password',
					label:'Password',
					errorMessage:'Введите корректный пароль',
					valid:false,
					touched:false,
					validation:{
						required:true,
						minLength:6
					}
				}
			},

			base: 'USD',
			rate: '',
			date: '',
			currency: {
				USD:{name:'Доллар США', flag: USD, course: ''},
				CNY:{name:'Китайский Юань', flag: CNY, course: ''},
				EUR:{name:'Евро', flag: EUR, course: ''},
				GBP:{name:'Фунт Стерлингов', flag: GBP, course: ''},
				JPY:{name:'Японская Йена', flag: JPY, course: ''},
				RUB:{name:'Российский Рубль', flag: RUB, course: ''},
				CHF:{name:'Швейцарский Франк', flag: CHF, course: ''}
			},

			//calc
			inputValue:100,
			currencyValue:'USD',
			result: null,

			//sample
			sample:{
				base:'USD', base2:'RUB', date: '',course:''
			},
			sampleList:'',

			//modal

			showModal:false,
			formIsValid:false,


		}
	}

	loginHandler = async () => {
		const authDate = {email:this.state.formControls.email.value,
						  password:'this.state.formControls.password.value',
						  returnSecureToken:true}
		
			try {

				const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCHyh1ufLOCXaAhaUKAi0rplBYk8KTI4jo',authDate)
				if(response.data.idToken){
					const formControls = {...this.state.formControls}
					formControls.email.value=''
					formControls.password.value=''
					this.setState({auth:true, 
								   showModal:false,
								   error:'',
								   formControls})
				}

			}catch(e){
				this.setState({error:'Ошибочка вышла'})
			}
	}

	registerHandler = async () => {
		const authDate = {email:this.state.formControls.email.value,
						  password:'this.state.formControls.password.value',
						  returnSecureToken:true}
		
			try{

				const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCHyh1ufLOCXaAhaUKAi0rplBYk8KTI4jo',authDate)
				if(response.data.idToken){
					const formControls = {...this.state.formControls}
					formControls.email.value=''
					formControls.password.value=''
					this.setState({auth:true,
								   showModal:false,
								   error:'',
								   formControls})
				}

			}catch(e){
				this.setState({error:'Ошибочка вышла'})
			}
	}

	modalShowHandler = () => {
		this.setState({showModal:!this.state.showModal}) 
	}


	onChangeHandler = (e,controlName) => {
		const formControls = {...this.state.formControls}
		const control = {...formControls[controlName]}

		control.value = e.target.value
		control.touched = true
		control.valid = this.validateControl(control.value,control.validation)
		formControls[controlName] = control

		let formIsValid = true

		Object.keys(formControls).forEach(name => {
			formIsValid = formControls[name].valid && formIsValid
		})
		this.setState({formControls,formIsValid})

	}

	validateControl = (value,validation) => {
		if(!validation){
			return true
		}

		let isValid = true

		if(validation.required){
			isValid = value.trim() !== '' && isValid
		}

		if(validation.email){
			isValid = validateEmail(value) && isValid
		}
		 if(validation.minLength){
			isValid = value.length >= validation.minLength && isValid
		}

		return isValid
	}

	renderInputs = () => {

		return  Object.keys(this.state.formControls).map((controlName,i)=>{
			const control = this.state.formControls[controlName]

			return(
				<Input key = {controlName + i}
				       type = {control.type}
				       value = {control.value}
				       valid = {control.valid}
				       touched = {control.touched}
				       label = {control.label}
				       errorMessage = {control.errorMessage}
				       shouldValidate = {true}
				       change = {(event) => this.onChangeHandler(event,controlName)}/>
				)
		})
	}

	baseHandler= (e) => {
		this.setState({
			sample:{...this.state.sample,base:e.target.value}
		})
	}

	base2Handler= (e) => {
		this.setState({
			sample:{...this.state.sample,base2:e.target.value}
		})
	}

	sampleDateHandler= (e) => {
		this.setState({
			sample:{...this.state.sample,date:e.target.value}
		})
	}

	dateWrite = async () => {
		await fetch(`https://api.exchangeratesapi.io/${this.state.sample.date}?base=${this.state.sample.base}`)
		.then((response) => {return response.json()})
		.then((response) => {
			this.setState({
				sample:{...this.state.sample,course:response.rates[this.state.sample.base2].toFixed(2)}
			})
		})
		await axios.post('https://rateapp-9d1ec-default-rtdb.firebaseio.com/sample.json',this.state.sample)
		.then((response) => {
			return('')
		})

		await axios('https://rateapp-9d1ec-default-rtdb.firebaseio.com/sample.json')
		.then((response) => {
			this.setState({sampleList:response.data})
		})
	}
	
	sampleRemove = async (id) => {
		await axios.delete(`https://rateapp-9d1ec-default-rtdb.firebaseio.com/sample/${id}.json`)
		let sampleList ={...this.state.sampleList}
		console.log(sampleList[id])
		delete sampleList[id]
		this.setState({sampleList})
		console.log(this.state.sampleList,sampleList)

		
	}

	inputValueHandler = (event) => {
		this.setState({inputValue:event.target.value,result:null})
	}

	currencyValueHandler = (event) => {
		this.setState({currencyValue: event.target.value, result:null})
	}

	calculatorHandler = async (value) => {
		let result

		await fetch(`https://api.exchangeratesapi.io/latest?base=RUB`)
			.then((response) => {return response.json()})
			.then ((response) => {
				result = response.rates[value] * this.state.inputValue;
			})

			this.setState({result})
	}

	componentDidMount(){
		fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
			.then((response) => {return response.json()})
			.then((response) => {
				const rateArr = ['USD','CNY','EUR','GBP','JPY','RUB','CHF']
				const currency = {...this.state.currency}
				for(let i = 0; i < rateArr.length; i++){
					currency[rateArr[i]].course = response.rates[rateArr[i]].toFixed(2)
				}

				this.setState({
					rate:response.rates,
					date:response.date,
					currency
				})
			})

		axios('https://rateapp-9d1ec-default-rtdb.firebaseio.com/sample.json')
		.then((response) => {
			this.setState({sampleList:response.data})
		})
	}

  render(){
    return(
    	<RateContext.Provider value = {{state:this.state,
    						 inputValueHandler: this.inputValueHandler,
    						 currencyValueHandler:this.currencyValueHandler,
    						 calculatorHandler:this.calculatorHandler,
    						 baseHandler:this.baseHandler,
    						 base2Handler:this.base2Handler,
    						 sampleDateHandler:this.sampleDateHandler,
    						 dateWrite:this.dateWrite,
    						 sampleRemove:this.sampleRemove,
    						 renderInputs:this.renderInputs,
    						 modalShowHandler:this.modalShowHandler,
    						 loginHandler:this.loginHandler,
    						 registerHandler:this.registerHandler
    						}}>
    		<Dark showModal = {this.state.showModal} click= {this.modalShowHandler}/>
    		<Modal/>
    		<Layout/>
    	</RateContext.Provider>
        
      )
  }
}

export default App;
