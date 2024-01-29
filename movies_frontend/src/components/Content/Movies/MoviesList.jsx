import { useEffect, useState } from "react";
import { axiosInstance } from "../../../axios.js";
import { Poster } from './Poster';
import * as config from '../../../helpers/config.js';

export { MoviesList };

function MoviesList() {
    useEffect(fetchMovies, []);
    
    const [moviesList, setMoviesList] = useState([]);
    const listItemsRenderer = movie => (
        <Poster key={movie.id} imageUrl={movie.poster} movieUrl={`/movie/${movie.id}`} movieTitle={movie.title} />
    );
    const listItems = moviesList.map(listItemsRenderer);

    return <div className='movies-list'>{listItems}</div>;

    function fetchMovies() {
        axiosInstance.get(config.url.moviesList)
            .then(response => response.data)
            .then(setMoviesList);
    }
}