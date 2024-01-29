export { Poster };

function Poster({ imageUrl, movieUrl, movieTitle }) {
    const movieImage = <img className='movie-poster_image' src={imageUrl} />;
    
    return (
        movieUrl
            ? <a className='movie-poster' href={movieUrl} title={movieTitle}>{movieImage}</a>
            : <div className='movie-poster' >{movieImage}</div>
    );
}