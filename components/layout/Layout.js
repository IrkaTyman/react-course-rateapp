import React, {Fragment, useContext} from 'react';
import './Layout.css'
import {addClass} from '../../hoc/addClass'
import {Header} from '../header/Header'
import {Home} from '../../pages/home/Home'
import {Sidebar} from '../sidebar/Sidebar'
import {Route, Switch} from 'react-router-dom'
import {Calc} from '../../pages/calc/Calc'
import {Sample} from '../../pages/sample/Sample'
import {Info} from '../../pages/info/Info'
import {RateContext} from '../../context/Context'


const Layout =() => {

	const {state} = useContext(RateContext)

	return(
		<Fragment>
			<Header/>

			<div className="content">
				<div className="routes">

				{state.auth ? <Switch>
					<Route path= '/' exact component={Home}/>
					<Route path= '/calc' render= {() => {
						return <Calc/>
					}}/>
					<Route path= '/sample' render= {() => {
						return <Sample/>
					}}/>
					<Route path= '/info' render= {() => {
						return <Info/>
					}}/>
				</Switch> : 
				<Route path= '/' component={Home}/>}
				
				</div>
				<Sidebar/>
			</div>
		</Fragment>
		)
}

export default addClass(Layout,'layout')