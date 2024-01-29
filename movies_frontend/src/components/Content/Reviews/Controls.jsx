import { useState } from 'react';
import { useMovie, useMovieDispatch } from '../../../context/MovieProvider.jsx';
import { axiosInstance } from '../../../axios.js';
import * as utils from '../../../helpers/utils.js';

export { Controls };

function Controls({ review, setReviewEditMode }) {
    const movieContextData = useMovie();
    const dispatchMovie = useMovieDispatch();
    const reviews = movieContextData.reviews;
    const [editMode, setEditMode] = useState(false);

    const editButton = editMode
        ? <div className="review_control cancel fas fa-times" onClick={() => editReview(false)}></div>
        : <div className="review_control edit fas fa-edit" onClick={editReview}></div>;
   
    return (
        <div className="review_controls">
            {editButton}
            <div className="review_control delete fas fa-trash" onClick={deleteReview}></div>
        </div>
    );

    function deleteReview() {
        const deleteUrl = utils.reviewEditUrl(review.id);
        axiosInstance.delete(deleteUrl).then(updateReviewsList);
        
    }

    function editReview(editState = true) {
        setEditMode(editState);
        setReviewEditMode(editState);
    }

    function updateReviewsList() {
        const updatedReviews = reviews.filter(deletableReview => deletableReview.id !== review.id);
        dispatchMovie({ type: 'SET_REVIEWS', payload: updatedReviews });
    }
}