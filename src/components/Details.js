import React from "react";
import PropTypes from "prop-types";
import Loader from "./Loader";
import queryString from "query-string";
import { apicall } from "../actions/detailsAction";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    movies: state.detailsMovies.movies
  };
};
const mapDispatchToProps = dispatch => {
  return {
    apicall: text => dispatch(apicall(text))
  };
};

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true
    };
  }


  componentDidMount() {
    this.setState(
      {
        loader: true
      },
      () => {
        this.props.apicall(
          `https://api.themoviedb.org/3/movie/${
            queryString.parse(this.props.location.search).id
          }?api_key=4d3775d97a83b11d700345ad71b1e238&language=en-US`
        );
      }
    );
    this.setState({
      loader: false
    });
  }

  render() {
    return (
      <div>
        {this.state.loader ? (
          <Loader />
        ) : (
          <div>
            {this.props.movies && (<div>
              <h1>{this.props.movies.original_title}</h1>
              {this.props.movies.poster_path ? (
                <img
                  alt="movies"
                  src={`https://image.tmdb.org/t/p/w500${
                    this.props.movies.poster_path
                  }`}
                />
              ) : (
                <div />
              )}
              <p>{this.props.movies.overview}</p>
              <p>imdb id:{this.props.movies.imdb_id}</p>
              <p>popularity:{this.props.movies.popularity}</p>
              <p>revenue:{this.props.movies.revenue}</p>
              <p>raitng:{this.props.movies.vote_average}</p>
              <p>users:{this.props.movies.vote_count}</p>
              <p>release date:{this.props.movies.release_date}</p>
            </div>)}
          </div>
        )}
      </div>
    );
  }
}

Details.propTypes = {
  movies: PropTypes.object,
  location: PropTypes.object,
  apicall: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
