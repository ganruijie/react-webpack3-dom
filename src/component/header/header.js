import React from 'react';
import {render} from 'react-dom';

export class Header extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			count:0,
			comeFromSon:'son'
		}
	}
	componentWillMount(){
	}
	sendSword(){
		this.setState({count:this.state.count+1});
		this.props.getSwordCount();
	}
	render(){
		return (
			<div>
				<p onClick={this.sendSword.bind(this)}>try to click me {this.props.buttonName}</p>
			</div>
		)
	}
}
