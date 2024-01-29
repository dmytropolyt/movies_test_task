import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../axios";
import { useEffect, useState } from "react";
import { CommentForm } from "./CommentForm.jsx";
import { useApp } from "../../../context/AppContext.jsx";
import * as config from '../../../helpers/config.js';

export { Discussion };

function Discussion() {
    const appData = useApp();
    const isLogin = appData.isLogin;

    const { discussionId } = useParams();

    const [discussionData, setDiscussionData] = useState(null);

    useEffect(getDiscussion, []);

    if (!discussionData) return null;

    const comments = discussionData.comments.map((comment, index) => (
        <div key={index} className='comment'>
            <div className="comment_info">
                <div className="comment_user">{comment.user}</div>
                <div className="comment_date-dedication">
                    <div className="comment_dedication">Dedication: {comment.user_comment_count}</div>
                    <div className="comment_date">{comment.created_at}</div>
                </div>
            </div>
            <div className="comment_text">{comment.text}</div>
        </div>
    ));

    return (
        <div className="discussion">
            <h2 className="discussion_title">{discussionData.title}</h2>
            {isLogin && (
                <CommentForm discussionId={discussionId} updateDiscussion={setDiscussionData}/>
            )}
            {comments}
        </div>
    )

    function getDiscussion() {
        axiosInstance.get(config.url.discussion + discussionId)
            .then(response => setDiscussionData(response.data));
    }
}