import { Poster } from './Poster';
import { Summary } from './Summary';

export { Movie };

function Movie({ movieData }) {
    const discussionUrl = movieData.discussion_url;

    return (
        <div className='movie'>
            <Poster imageUrl={movieData.poster} movieTitle={movieData.title} />
            <h1 className="movie_title">{movieData.title}</h1>
            <div className='movie_info'>
                <div className="movie_description">{movieData.description}</div>
                <Summary movieData={movieData} />
                {discussionUrl && <a href={discussionUrl} className='movie_discussion'>Go to discussion</a>}
            </div>
        </div>
    );
}