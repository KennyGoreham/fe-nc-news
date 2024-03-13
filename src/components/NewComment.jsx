import { useContext, useState } from 'react';
import { postCommentByArticleId } from '../api.js';
import UserContext from '../contexts/User.jsx';

const NewComment = (props) => {

    const { setComments, article_id } = props;
    const { loggedInUser } = useContext(UserContext);
    const [newComment, setNewComment] = useState("");

    const handleCommentSubmit = (event) => {

        event.preventDefault();

        postCommentByArticleId(article_id, newComment, loggedInUser)
        .then((newlyPostedComment) => {

            alert("Comment Added!")
            setNewComment("");
            setComments((currComments) => {
                return [newlyPostedComment, ...currComments];
            });
        });
    }
    
    return (
        <form className="new-comment-form" onSubmit={handleCommentSubmit}>
            <label id="new-comment-label" htmlFor="new-comment-input">Add comment</label>
            <textarea id="new-comment-input" multiline="true" placeholder="What do you want to say...?" value={newComment} onChange={(event) => setNewComment(event.target.value)}></textarea>
            <button id="post-comment-button" disabled={!newComment}>Post</button>
        </form>
    )
}

export default NewComment;