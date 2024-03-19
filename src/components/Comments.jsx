import { useEffect, useState } from 'react';
import Loading from './Loading.jsx';
import CommentCard from './CommentCard.jsx';
import NewComment from './NewComment.jsx';
import { fetchCommentsByArticleId } from '../api';

const Comments = (props) => {

    const { article_id } = props;

    const [currentPage, setCurrentPage] = useState(1);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {

        setIsLoading(true);
        fetchCommentsByArticleId(article_id, currentPage)
        .then(({ comments, totalPages }) => {


            setComments(comments);
            setTotalPages(totalPages);
            setIsLoading(false);
        })
    }, [article_id, currentPage]);

    const handleNoComments = (comments) => {
        
        return comments.length !== 0
        ? `Showing ${comments.length || 0} of ${comments[0].total_count || 0} comments`
        : `No comments yet, be the first!`;
    }

    const handleCommentKey = (comment, index) => {

        return comment.comment_id
        ? comment.comment_id
        : -index;
    }

    const handlePageChange = (pageIncrement) => {
        setCurrentPage(currentPage + pageIncrement);
    }

    return isLoading
    ? <Loading />
    : (
        <section className="comment-section">
            <p id="comments-heading">{handleNoComments(comments)}</p>
            <NewComment setComments={setComments} article_id={article_id}/>
            <div className="comment-page-options-container">
                <button id="left-page-button" disabled={currentPage === 1} onClick={() => {
                    handlePageChange(-1);
                }}>←</button>
                <p id="page-text">Page {currentPage} / {totalPages}</p>
                <button id="right-page-button" disabled={currentPage === totalPages} onClick={() => {
                    handlePageChange(1);
                }}>→</button>
            </div>
            {comments.map((comment, index) => {
                return <CommentCard key={handleCommentKey(comment, index)} comment={comment} setComments={setComments}/>
            })}
            <div className="comment-page-options-container">
                <button id="left-page-button" disabled={currentPage === 1} onClick={() => {
                    handlePageChange(-1);
                }}>←</button>
                <p id="page-text">Page {currentPage} / {totalPages}</p>
                <button id="right-page-button" disabled={currentPage === totalPages} onClick={() => {
                    handlePageChange(1);
                }}>→</button>
            </div>
        </section>
    )
}

export default Comments;