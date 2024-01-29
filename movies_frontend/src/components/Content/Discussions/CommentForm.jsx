import { axiosInstance } from '../../../axios';
import TextField from '@mui/material/TextField';
import * as config  from '../../../helpers/config.js';
import { Discussion } from './Discussion.jsx';

export { CommentForm };

function CommentForm({ discussionId, updateDiscussion }) {
    return (
        <form className='comment-form' onSubmit={commentFormSubmit}>
            <input type='hidden' name='discussion' value={discussionId} />
            <TextField 
                name='text'
                multiline
            />
            <button type='submit' className='comment-form_submit'>Leave your comment</button>
        </form>
    )

    function commentFormSubmit(event) {
        const form = event.target;
        const formData = new FormData(form);

        event.preventDefault()

        axiosInstance.post(config.url.comment, formData)
            .then(response => updateDiscussionData(response.data))
    }

    function updateDiscussionData(newComment) {
        updateDiscussion(discussion => {
            const updatedDiscussion = { ...discussion }
            updatedDiscussion.comments.push(newComment)
            return updatedDiscussion;
        })
    }
}