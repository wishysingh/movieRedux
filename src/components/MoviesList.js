
import React from 'react';
import Movies from './Movies';
import PropTypes from "prop-types";

const MoviesList = ({movies,url}) => {
    const moviecomponent = movies.map((user,i) => {

        return <Movies key={i} movies={movies[i]} url={url}/>
    });
    return (
        <div>
            {moviecomponent}
        </div>
    );
}

export default MoviesList;

MoviesList.propTypes = {
  movies: PropTypes.object,
  url: PropTypes.object
};
