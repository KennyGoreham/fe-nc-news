import { useEffect, useState } from 'react';
import Loading from './Loading.jsx';
import CommentCard from './CommentCard.jsx';
import { fetchCommentsByArticleId } from '../api';

const Comments = (props) => {

    const { article_id } = props;
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        setIsLoading(true);
        fetchCommentsByArticleId(article_id)
        .then((comments) => {

            setComments(comments);
            setIsLoading(false);
        })
    }, [article_id]);

    const handleNoComments = (comments) => {
        
        return comments.length !== 0
        ? `Showing ${comments.length} comments`
        : `No comments yet, be the first!`;
    } 

    return isLoading
    ? <Loading />
    : (
        <section className="comment-setion">
        <p>{handleNoComments(comments)}</p>
        {comments.map((comment) => {
            return <CommentCard key={comment.comment_id} comment={comment} />
        })}
        </section>
    )
}

export default Comments;