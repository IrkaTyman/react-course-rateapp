import React from 'react';
import './Navbar.css';
import {NavLink} from 'react-router-dom'


export const Navbar = () => {

	return(
		<nav>
			<ul>
				<li><NavLink to="/">Главная</NavLink></li>
				<li><NavLink to="/calc">Калькулятор</NavLink></li>
				<li><NavLink to="/sample">Выборки</NavLink></li>
				<li><NavLink to="/info">Инфа</NavLink></li>
			</ul>
		</nav>
		)
}