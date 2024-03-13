import { useContext, useState } from 'react';
import { postCommentByArticleId } from '../api.js';
import UserContext from '../contexts/User.jsx';

const NewComment = (props) => {

    const { setComments, article_id } = props;
    const { loggedInUser } = useContext(UserContext);
    const [newComment, setNewComment] = useState("");
    const [isClicked, setIsClicked] = useState(false);
    const [error, setError] = useState("");

    const handleCommentSubmit = (event) => {

        event.preventDefault();
        setError("");
        setIsClicked(true);
        postCommentByArticleId(article_id, newComment, loggedInUser)
        .then((newlyPostedComment) => {

            setNewComment("");
            setComments((currComments) => {
                return [newlyPostedComment, ...currComments];
            });
            setIsClicked(false);
            
        })
        .catch((err) => {

            setError(err.message);
            setIsClicked(false);
        });
    }
    
    return (
        <>
            {error ? <p id="post-error-message">Failed to post comment - {error}</p> : null}
            {isClicked ? <p id="post-confirmation-message">Comment posted!</p> : null}
            <form className="new-comment-form" onSubmit={handleCommentSubmit}>
                <label id="new-comment-label" htmlFor="new-comment-input">Add comment</label>
                <textarea id="new-comment-input" multiline="true" placeholder="What do you want to say...?" value={newComment} onChange={(event) => setNewComment(event.target.value)}></textarea>
                <button id="post-comment-button" disabled={!newComment || isClicked}>Post</button>
            </form>
        </>
    )
}

export default NewComment;