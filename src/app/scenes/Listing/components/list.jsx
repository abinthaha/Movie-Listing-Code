import React, { Component } from 'react';

import Heading from '../../../components/Heading';

let posterImages = {};

class ListComponent extends Component {

	constructor(props) {
		super(props);
		this.state = {
			noPosterName: 'noPosterImg.png',
			posterImages: {},
			movieList: []
		}
		this.setMovieList = this.setMovieList.bind(this);
		this.errorImg = this.errorImg.bind(this);
		this.getPosterImages = this.getPosterImages.bind(this);
	}

	componentDidMount() {
		this.setMovieList(this.props)
		this.getPosterImages();
	}

	// To dynamically get the whole folder of poster using require.context
	getPosterImages() {
		posterImages = this.importAll(require.context('../../../../../dist/assets/img/poster', false, /\.(png|jpe?g|svg)$/));
	}

	// To group the imported images to an object
	importAll(r) {
		let images = {};
		r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
	  	return images;;
	}
	
	componentWillReceiveProps(nextProps) {
		this.setMovieList(nextProps);
	}

	// To get movieList and filteredList from the parent component and set it to state for further usages
	setMovieList(props) {
		const { movieList } = props;
		this.setState({
			...this.state,
			movieList
		})
	}

	//The case where an image path is broken, we will need to show a default image in that case. This method handles the same
	errorImg(movie) {
		let { movieList } = this.state;
		movieList = movieList.map( item => {
			if(item.name === movie.name && item["poster-image"] === movie["poster-image"])
				item["poster-image"] = this.state.noPosterName;
			return item;
		})
		this.setState({
			...this.state,
			movieList
		})
	}
	render() {
		console.log(posterImages);

		const itemListing = this.state.movieList.map((item, index) => {
			let imgSrc =  posterImages[item["poster-image"]] ? posterImages[item["poster-image"]] : posterImages["noPosterImg.png"];
			return (
				<li key={index} className='each-movie not-selectable'>
					<span className='movie-poster-wrapper not-selectable'>
						<img src={imgSrc} onError={(e) => this.errorImg(item)} />
					</span>
					<Heading 
						title={item.name}
						className='movie-name not-selectable'
						shouldShowTitle
						type='5' 
					/>
				</li>
			)
		})
		return (
			<section className='movie-list-container container'>
				<ul className='movie-list-wrapper'>
					{itemListing}
				</ul>
			</section>
		)
	}
}

export default ListComponent;
