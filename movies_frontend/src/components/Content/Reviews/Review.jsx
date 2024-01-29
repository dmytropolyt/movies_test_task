import { useState } from "react";
import { RatingBlock } from "../RatingBlock.jsx";
import { Controls } from './Controls';
import { ReviewEdit } from './ReviewEdit';

export { Review };

function Review({ review, editable }) {
    const [editMode, setEditMode] = useState(false);
    const reviewView = (
        <div className="review">
            <div className="review_info">
                <div className="review_user">{review.user}</div>
                <div className={`review_heading ${editable ? 'editable' : ''}`}>
                    <RatingBlock rating={review.rating} readonly={true}/>
                    <div className="review_date">Created at: {review.created_at}</div>
                    {editable && <Controls review={review} setReviewEditMode={setEditMode} />}
                </div>
            </div>
            <div className="review_comment">{review.comment}</div>
        </div>
    );

    return editMode ? <ReviewEdit review={review} setReviewEditMode={setEditMode} /> : reviewView;
}