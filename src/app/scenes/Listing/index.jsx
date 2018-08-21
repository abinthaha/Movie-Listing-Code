import React, { Component } from 'react';
import { connect } from 'react-redux';

import './styles/index.scss';
import SearchComponent from './components/search';
import ListComponent from './components/list';

import { loadListData } 	from './data/action'

class Listing extends Component {

	constructor(props) {
		super(props); 
		this.state = {
			movieGenreName: '',
			pageNumber: 0,
			scrolling: false,
			searchKeyword: '',
			totalItems: '',
			movieList: [],
			filteredData: []
		}
		this.filterMovieList = this.filterMovieList.bind(this);
	}

	componentDidMount() {
		this.props.loadListData(this.state.pageNumber);

		//Adding event listener for scroll inorder to achieve the infinite scroll;
		this.scrollListener = window.addEventListener('scroll', (e) => {
			this.handleScroll(e)
		})
	}

	handleScroll(e: any) {
		const { totalItems, movieList, scrolling } = this.state;

		if(movieList.length < totalItems && !scrolling) {
			const lastLi = document.querySelector('.movie-list-wrapper > li:last-child') //To find the last element of the list
			const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
			const pageOffset = window.pageYOffset + window.innerHeight; 
			var bottomOffset = window.innerHeight * 0.5; //Number of pixels from bottom of the page which determines when to make the next api call
			if(pageOffset > lastLiOffset - bottomOffset) {
				this.loadMore();
			}
		}
	}

	loadMore() {
		this.setState(prevState => ({
			...this.state,
			scrolling: true,
			pageNumber: prevState.pageNumber + 1
		}),() => {
			this.props.loadListData(this.state.pageNumber); //To call the next JSON with data; 
		}) 
	}


	// To filter the data according to the search value
	filterMovieList(data) {
		let { movieList, totalItems, scrolling } = this.state;
		const filteredData = movieList.filter(movie => {
			return (data === '' || movie.name.toLocaleLowerCase().indexOf(data.toLocaleLowerCase()) > -1)
		});
		
		//If searched items are just few and there are more data to be fetched, then call the load API once again.
		if (filteredData.length === 0 && movieList.length < totalItems && !scrolling) { 
			this.loadMore();
		} else {
			this.setState({
				...this.state,
				filteredData,
				searchKeyword: data,
			})
		}
	}

	componentWillReceiveProps(nextProps) {
		if(!nextProps.isLoading) {
			let { data } = nextProps;
			let { movieList } = this.state;
			if(data && data.page) {
				movieList = [
					...movieList,
					...data.page["content-items"].content
				];				
			}
			this.setState({
				...this.state,
				scrolling: false,
				totalItems: data && data.page && data.page["total-content-items"] ? data.page["total-content-items"] : '', 
				movieGenreName: data && data.page && data.page.title ? data.page.title : '',
				movieList,
			}, () => {
				this.filterMovieList(this.state.searchKeyword);
			})
		}
	}
	render() {
		return (
			<section>
				<SearchComponent 
					movieGenreName={this.state.movieGenreName} 
					filterMovieList={this.filterMovieList}
				/>
				<ListComponent 
					movieList={this.state.filteredData} 
					isListLoading={this.state.scrolling}
				/>
			</section>
		)
	}
}

const mapState = state => ({
	data: state.listingReducer.data,
	isLoading: state.listingReducer.isLoading
});

const mapDispatch = (dispatch, props) => ({
	loadListData: (pageNumber) => dispatch(loadListData(pageNumber))
});

export default connect(mapState, mapDispatch)(Listing);
