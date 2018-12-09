import React from 'react';
import PropTypes from "prop-types";
import Loader from "./Loader";
import queryString from 'query-string';

class Details extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      movies:[],
      loader:false
    };

  }

 componentDidMount() {
  this.setState({
    loader:true,
  },()=>{fetch(`https://api.themoviedb.org/3/movie/${queryString.parse(this.props.location.search).id}?api_key=4d3775d97a83b11d700345ad71b1e238&language=en-US`)
    .then(res => res.json())
    .then(res => {
      this.setState({
        loader:false,
        movies:res
      });
    })
    .catch(err => {err});});
 }

  render(){
    return (
      <div>
        {this.state.loader ? <Loader /> :
          <div>
          <h1>{this.state.movies.original_title}</h1>
          {this.state.movies.poster_path?<img alt='movies' src={`https://image.tmdb.org/t/p/w500${this.state.movies.poster_path}`} />:<div/>}
            <p>{this.state.movies.overview}</p>
            <p>imdb id:{this.state.movies.imdb_id}</p>
            <p>popularity:{this.state.movies.popularity}</p>
            <p>revenue:{this.state.movies.revenue}</p>
            <p>raitng:{this.state.movies.vote_average}</p>
            <p>users:{this.state.movies.vote_count}</p>
            <p>release date:{this.state.movies.release_date}</p>
        </div>
        }
      </div>
  );
  }

}

Details.propTypes = {
  match: PropTypes.object
};

export default Details;
