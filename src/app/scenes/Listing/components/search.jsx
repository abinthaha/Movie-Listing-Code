import React, { Component } from 'react';

import BackButton from '../../../../../dist/assets/img/icons/Back.png';
import SearchButton from '../../../../../dist/assets/img/icons/search.png';

import TextField from '../../../components/TextField';
import Heading from '../../../components/Heading';

class SearchComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchMode: false,
		}
		this.searchMovie = this.searchMovie.bind(this);
	}

	//To toggle between the search input and the heading of the page
	toggleSearch() {
		this.setState({
			...this.state,
			searchMode: !this.state.searchMode
		})
	}
	
	//Filter the movie list according to the searched input;
	searchMovie(value) {
		this.props.filterMovieList(value);
	}
	
	render() {
		return (
			<header className='page-header container'>
				<span className='back-button'>
					<img src={BackButton} />
				</span>
				<div className={'heading-name-wrapper ' + (this.state.searchMode ? 'search-mode' : '')}>
					<section>
						<TextField 
							placeholder='Search Movie'
							searchMovie={this.searchMovie}
						/>
						<Heading 
							title={this.props.movieGenreName} 
							type='1' 
						/>
					</section>
				</div>
				<span className='search-button' onClick={ev => this.toggleSearch()}>
					<img src={SearchButton} />
				</span>
			</header>
		)
	}
}

export default SearchComponent;
