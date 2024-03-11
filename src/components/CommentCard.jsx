const CommentCard = (props) => {

    const { comment } = props;

    return (
        <section>
            <div className="comment-card">
                <p id="comment-author">{comment.author}</p>
                <p id="comment-body">{comment.body}</p>
                <p id="comment-votes">{comment.votes}</p>
                <p id="comment-date">{comment.created_at}</p>
            </div>
        </section>
    )
}

export default CommentCard;