import React,{Component} from 'react'
import {Link,Route,BrowserRouter,Switch} from 'react-router-dom'
import App from '../component/App'

import Home from '../component/Home/Home'
import Info from '../component/Info/Info'
import About from '../component/About/About'
class RouterDom extends Component {
	render(){
		return (
			<div>
				<div>
					<ul>
						<li><Link to = '/'>Home</Link></li>
						<li><Link to = '/info'>info</Link></li>
						<li><Link to = '/about'>About</Link></li>
					</ul>
				</div>
				<Switch>
					<Route exact path = '/' component = {Home}></Route>
					<Route path = '/info' component = {Info}></Route>
					<Route path = '/about' component = {About}></Route>
				</Switch>
			</div>
		)
	}
}

export default RouterDom