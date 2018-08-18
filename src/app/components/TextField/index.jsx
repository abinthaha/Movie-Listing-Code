import React, { Component } from 'react';
import './index.scss';

class TextField extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		}
		this.textChange = this.textChange.bind(this);
		this.setDefaultValues = this.setDefaultValues.bind(this);
	}
	
	componentDidMount() {
		this.setDefaultValues(this.props);
	}
	
	componentWillReceiveProps(nextProps) {
		this.setDefaultValues(nextProps);
	}

	setDefaultValues(props) {
		const { placeholder } = props;
		this.setState({
			...this.state,
			placeholder
		})
	}
	
	textChange(eve) {
		let value = eve.target.value;
		this.setState({
			...this.state,
			value
		},() => {
			this.props.searchMovie(this.state.value)
		})
	}

	render() {
		return (
			<input 
				type='text' 
				placeholder='Search Movie' 
				value={this.state.value} 
				className='input-search'
				onChange={ev => this.textChange(ev)}
				autoFocus
			/>
		)
	}
}
export default TextField;
