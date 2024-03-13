import { Link } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../contexts/User';
import { deleteCommentByCommentId } from '../api';

const CommentCard = (props) => {

    const { comment, setComments } = props;
    const { loggedInUser } = useContext(UserContext);

    const renderDeleteButton = () => {

        return loggedInUser.username === comment.author
        ? <button id="delete-comment-button" onClick={() => {handleCommentDelete(comment.comment_id)}}>Delete</button>
        : null;
    }

    const handleCommentDelete = (comment_id) => {

        deleteCommentByCommentId(comment_id)
        .then(() => {

            alert("Comment Deleted!");
            setComments((currComments) => {
                return currComments.filter((comment) => {
                    return comment.comment_id !== comment_id;
                });
            });
        })
    
    }

    return (
        <section>
            <div className="comment-card">
                <Link to={`/users/${comment.author}`}><p id="comment-author">{comment.author}</p></Link>
                <p id="comment-body">{comment.body}</p>
                <p id="comment-votes">{comment.votes}</p>
                <p id="comment-date">{comment.created_at}</p>
                {renderDeleteButton()}
            </div>
        </section>
    )
}

export default CommentCard;