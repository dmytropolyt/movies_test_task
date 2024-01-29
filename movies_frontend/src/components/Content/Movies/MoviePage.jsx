import { useEffect, useState } from "react";
import { useMovie, useMovieDispatch } from '../../../context/MovieProvider.jsx';
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../axios.js";
import { Movie } from './Movie';
import { Reviews } from '../Reviews/Reviews.jsx';
import * as config from '../../../helpers/config.js';

export { MoviePage };

function MoviePage() {
    const { movieId } = useParams();
    const [movieData, setMovieData] = useState(null);
    const movieContextData = useMovie();
    const dispatchMovie = useMovieDispatch()
    const reviews = movieContextData?.reviews;

    useEffect(fetchMovieData, []);

    if (!movieData) return null;
   
    return (
        <div className="movie-page">
            <Movie movieData={movieData} />
            { reviews && <Reviews reviews={movieContextData.reviews} movieId={movieData.id} />}
        </div>
    );

    function fetchMovieData() {
        const movieUrl = `${config.url.moviesList}${movieId}`;
        axiosInstance.get(movieUrl).then(processMovieData);
    };

    function processMovieData(response) {
        const movieData = response.data;

        setMovieData(movieData);
        dispatchMovie({ type: 'SET_REVIEWS', payload: movieData.reviews })
    }
}