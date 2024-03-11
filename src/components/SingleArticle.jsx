import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleById, fetchCommentsByArticleId } from '../api.js';
import Loading from './Loading.jsx';
import CommentCard from './CommentCard.jsx';

const SingleArticle = () => {

    const { article_id } = useParams();
    const [article, setArticle] = useState({});
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        setIsLoading(true);
        fetchArticleById(article_id)
        .then((article) => {

            setArticle(article);
            return fetchCommentsByArticleId(article_id)
        })
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
        <article className="single-article-page">
            <header>
                <h2 id="article-heading">{article.title}</h2>
                <h3 id="article-topic">{article.topic}</h3>
                <img src={article.article_img_url} id="single-article-image"/>
            </header>
            <div className="single-article">
                <h3 id="article-author">{article.author}</h3>
                <p id="article-body">{article.body}</p>
                <section className="single-article-info">
                    <p id="article-date">{article.created_at}</p>
                    <p id="article-votes">Votes: {article.votes}</p>
                </section>
            </div>
            <section className="comment-setion">
                <p>{handleNoComments(comments)}</p>
                {comments.map((comment) => {
                    return <CommentCard key={comment.comment_id} comment={comment} />
                })}
            </section>
        </article>
    )
}

export default SingleArticle;