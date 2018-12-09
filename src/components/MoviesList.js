
import React from 'react';
import Movies from './Movies';

const MoviesList = ({movies,url}) => {
    console.log(movies,url,"wishy");
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
