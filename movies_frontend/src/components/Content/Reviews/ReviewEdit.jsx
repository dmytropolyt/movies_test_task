import { useMovie, useMovieDispatch } from '../../../context/MovieProvider.jsx';
import { axiosInstance } from '../../../axios.js';
import { RatingBlock } from "../RatingBlock.jsx";
import TextField from '@mui/material/TextField';
import * as utils from '../../../helpers/utils.js';

export { ReviewEdit };

function ReviewEdit({ review, setReviewEditMode }) {
    const movieContextData = useMovie();
    const dispatchMovie = useMovieDispatch();
    const reviews = movieContextData.reviews;

    return (
        <form className="review-form review edit" onSubmit={reviewEditSubmit}>
            <RatingBlock rating={review.rating} />
            <TextField name='comment' multiline required defaultValue={review.comment} />
            <input type='hidden' name='movie' value={review.movie} />
            <div className="review-form_buttons">
                <button type='submit' className="review_control edit fas fa-check"></button>
                <div className="review_control cancel fas fa-times" onClick={() => setReviewEditMode(false)}></div>
            </div>
        </form>
    );

    function reviewEditSubmit(event) {
        const form = event.target;
        const formData = new FormData(form);
        const patchUrl = utils.reviewEditUrl(review.id, 'patch');

        event.preventDefault();
        axiosInstance.patch(patchUrl, formData).then(updateReviewsList);
    }

    function updateReviewsList(response) {
        const updatedReview = response.data;
        const updatableReviewIndex = reviews.indexOf(review);
        const updatedReviews = reviews.toSpliced(updatableReviewIndex, 1, updatedReview);

        dispatchMovie({ type: 'SET_REVIEWS', payload: updatedReviews });
        setReviewEditMode(false);
    }
}