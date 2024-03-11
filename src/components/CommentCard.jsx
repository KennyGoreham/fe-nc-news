const CommentCard = (props) => {

    const { comment } = props;

    return (
        <div className="comment-card">
            <p id="comment-author">{comment.author}</p>
            <p id="comment-body">{comment.body}</p>
            <p id="comment-votes">{comment.votes}</p>
            <p id="comment-date">{comment.created_at}</p>
        </div>
    )
}

export default CommentCard;