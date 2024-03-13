import { Link } from 'react-router-dom';

const CommentCard = (props) => {

    const { comment } = props;

    return (
        <section>
            <div className="comment-card">
                <Link to={`/users/${comment.author}`}><p id="comment-author">{comment.author}</p></Link>
                <p id="comment-body">{comment.body}</p>
                <p id="comment-votes">{comment.votes}</p>
                <p id="comment-date">{comment.created_at}</p>
            </div>
        </section>
    )
}

export default CommentCard;