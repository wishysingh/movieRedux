
import React from 'react';
import Movies from './Movies';

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
