import React from 'react'
import { render } from 'react-dom'

import './static/css/common.less'
import {Header} from './component/header/header'
import {Link,Route,BrowserRouter,Switch} from 'react-router-dom'
import App from './component/App'
import ReactDom from './router/routerMap'

import './static/css/base.css'

import { Button } from 'element-react';

import 'element-theme-default';
class Hello extends React.Component {
	constructor(props){
		super(props)
		this.state = {
		}
	}
	componentWillMount(){
		
	}
    render() {
        return (
        	<div>
	        	<div>
	        		<BrowserRouter>
		        		<ReactDom>
								
						</ReactDom>
						
					</BrowserRouter>
	        	</div>
	        	<Button type="primary">Hello</Button>
        	</div>
        )
    }
}

render(
    <Hello/>,
    document.getElementById('root')
)
				