import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import UserContext from '../contexts/User';
import { deleteCommentByCommentId, patchCommentByCommentId } from '../api';

const CommentCard = (props) => {

    const { comment, setComments } = props;
    const { loggedInUser } = useContext(UserContext);
    const [isClicked, setIsClicked] = useState(false);
    const [error, setError] = useState("");

    const renderDeleteButton = () => {

        return loggedInUser.username === comment.author
        ? <button id="delete-comment-button" disabled={isClicked} onClick={() => {handleCommentDelete(comment.comment_id)}}>Delete</button>
        : null;
    }

    const handleCommentDelete = (comment_id) => {

        setError("");
        setIsClicked(true);
        deleteCommentByCommentId(comment_id)
        .then(() => {

            setComments((currComments) => {
                return currComments.filter((comment) => {
                    return comment.comment_id !== comment_id;
                });
            });
            setIsClicked(false);
        })
        .catch((err) => {

            setError(err.message);
            setIsClicked(false);
        });
    }

    const voteOnComment = (comment_id, increment) => {

        setComments((currComments) => {
            return currComments.map((comment) => {

                if(comment_id === comment.comment_id) {
                    comment.votes = comment.votes + increment;
                }   

                return comment;
            })
        })
        patchCommentByCommentId(comment_id, increment);
    }

    const date = new Date(comment.created_at);
    const formattedDate = date.toLocaleString('en-GB');

    return (
        <section>
            {error ? <p id="delete-error-message">Failed to delete comment - {error}</p> : null}
            {isClicked ? <p id="delete-confirmation-message">Comment deleted!</p> : null}
            <div className="comment-card">
                {/* <img src={} /> */}
                <Link to={`/users/${comment.author}`} id="comment-author-link"><p id="comment-author">{comment.author}</p></Link>
                <p id="comment-body">{comment.body}</p>
                <div className="comment-vote-button-container">
                        <button id="comment-upvotes-button" onClick={() => {
                            voteOnComment(comment.comment_id, 1);
                        }}>△</button>
                        <p id="comment-votes">{comment.votes}</p>
                        <button id="comment-downvotes-button" onClick={() => {
                            voteOnComment(comment.comment_id, -1);
                        }}>▽</button>
                    </div>
                <p id="comment-date">{formattedDate}</p>
                {renderDeleteButton()}
            </div>
        </section>
    )
}

export default CommentCard;