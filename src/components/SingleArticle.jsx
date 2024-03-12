import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleById, patchArticleById } from '../api.js';
import Loading from './Loading.jsx';
import Comments from './Comments.jsx';

const SingleArticle = () => {

    const { article_id } = useParams();
    const [article, setArticle] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        setIsLoading(true);
        fetchArticleById(article_id)
        .then((article) => {

            setArticle(article);
            setIsLoading(false);
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

    return isLoading
    ? <Loading />
    : (
        <article className="single-article-page">
            <header>
                <h2 id="article-heading">{article.title}</h2>
                <h3 id="article-author">{article.author}</h3>
                <img src={article.article_img_url} id="single-article-image"/>
            </header>
            <div className="single-article">
                <p id="article-body">{article.body}</p>
                <div className="article-info-container">
                    <h3 id="article-topic">Topic: {article.topic}</h3>
                    <div className="vote-button-container">
                        <button id="article-upvotes-button" onClick={() => {
                            voteOnArticle(article.article_id, 1);
                        }}>△</button>
                        <p id="article-votes">{article.votes}</p>
                        <button id="article-downvotes-button" onClick={() => {
                            voteOnArticle(article.article_id, -1);
                        }}>▽</button>
                    </div>
                    <p id="article-date">{article.created_at}</p>
                </div>
            </div>
            <Comments article_id={article_id}/>
        </article>
    )
}

export default SingleArticle;