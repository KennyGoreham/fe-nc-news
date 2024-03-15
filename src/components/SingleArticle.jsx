import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchArticleById, patchArticleById } from '../api.js';
import Loading from './Loading.jsx';
import Comments from './Comments.jsx';
import Error from './Error.jsx';

const SingleArticle = () => {

    const { article_id } = useParams();
    const [article, setArticle] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [errorInfo, setErrorInfo] = useState({});

    useEffect(() => {

        setIsLoading(true);
        fetchArticleById(article_id)
        .then((article) => {

            setArticle(article);
            setIsLoading(false);
        })
        .catch((err) => {
            
            setErrorInfo({
                ...errorInfo,
                status: err.response.status,
                message: err.response.data.msg
            });
        })
    }, [article_id]);

    const voteOnArticle = (article_id, increment) => {
        setArticle((currArticle) => {
            return {
                ...currArticle, votes: article.votes + increment
            };
        })
        patchArticleById(article_id, increment);
    }

    const date = new Date(article.created_at);
    const formattedDate = date.toLocaleString('en-GB');

    if(Object.keys(errorInfo).length !== 0) return <Error status={errorInfo.status} message={errorInfo.message} />

    return isLoading
    ? <Loading />
    : (
        <article className="single-article-page">
            <header>
                <h2 id="single-article-heading">{article.title}</h2>
                <Link to={`/users/${article.author}`} id="single-article-author"><h3>{article.author}</h3></Link>
                <img src={article.article_img_url} id="single-article-image"/>
            </header>
            <div className="single-article">
                <p id="single-article-body">{article.body}</p>
                <div className="single-article-info-container">
                    <h3 id="single-article-topic">{article.topic}</h3>
                    <div className="vote-button-container">
                        <button id="single-article-upvotes-button" onClick={() => {
                            voteOnArticle(article.article_id, 1);
                        }}>△</button>
                        <p id="single-article-votes">{article.votes}</p>
                        <button id="single-article-downvotes-button" onClick={() => {
                            voteOnArticle(article.article_id, -1);
                        }}>▽</button>
                    </div>
                    <p id="single-article-date">{formattedDate}</p>
                </div>
            </div>
            <Comments article_id={article_id}/>
        </article>
    )
}

export default SingleArticle;