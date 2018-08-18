import React, { Component } from 'react';
import './index.scss';

class Heading extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: "5",
			title: '',
			className: '',
			shouldShowTitle: ''
		}
		this.getAndSetState = this.getAndSetState.bind(this);
	}

	componentDidMount() {
		this.getAndSetState(this.props)
	}

	componentWillReceiveProps(nextProps) {
		this.getAndSetState(nextProps)
	}

	getAndSetState(props) {
		const { title, type, className, shouldShowTitle } = props;
		this.setState({
			...this.state,
			title,
			type,
			className: className ? className : '', 
			shouldShowTitle: shouldShowTitle ? shouldShowTitle : ''
		})
	}

	switchRender(param, className, shouldShowTitle) {
		switch(param) {
			case '1':
				return (<h1 className={className} title={shouldShowTitle ? this.state.title : ''}>{this.state.title}</h1>);
				break;

			case '5':
				return (<h5 className={className} title={shouldShowTitle ? this.state.title : ''}>{this.state.title}</h5>);
				break;

			default:
      			return (<h6>{this.state.title}</h6>);
		}
	}

	render() {
		const { type, className, shouldShowTitle } = this.state
		return (
			this.switchRender(type, className, shouldShowTitle)
		)
	}
}
export default Heading;
