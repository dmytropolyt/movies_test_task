import { useMovie, useMovieDispatch } from '../../../context/MovieProvider.jsx';
import { axiosInstance } from '../../../axios.js';
import { RatingBlock } from "../RatingBlock.jsx";
import TextField from '@mui/material/TextField';
import * as config from '../../../helpers/config.js';

export { ReviewForm };

function ReviewForm({ movieId }) {
    const movieContextData = useMovie();
    const dispatchMovie = useMovieDispatch();
    const reviews = movieContextData.reviews;

    return (
        <form className='review-form review' onSubmit={reviewFormSubmit}>
            <RatingBlock rating={config.defaultRating} />
            <TextField name='comment' multiline required />
            <input type='hidden' name='movie' value={movieId} />
            <button type='submit' className="review-form_submit">Leave a Review</button>
        </form>
    );

    function reviewFormSubmit(event) {
        const form = event.target;
        const formData = new FormData(form);

        event.preventDefault();
        axiosInstance.post(config.url.review, formData).then(updateReviewsList);
    }

    function updateReviewsList(response) {
        const newReview = response.data;
        const updatedReviews = reviews.concat(newReview);

        dispatchMovie({ type: 'SET_REVIEWS', payload: updatedReviews });
    }
}